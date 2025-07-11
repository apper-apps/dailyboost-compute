import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const useUserData = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user)
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSubscriptionData = async () => {
    if (!isAuthenticated || !user) {
      setLoading(false)
      return
    }

    try {
      setError(null)
      setLoading(true)
      
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "user_id" } },
          { field: { Name: "tier" } },
          { field: { Name: "status" } },
          { field: { Name: "current_period_end" } },
          { field: { Name: "team_member_limit" } },
          { field: { Name: "trial_end_date" } }
        ],
        orderBy: [
          {
            fieldName: "CreatedOn",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 1,
          offset: 0
        }
      }

      const response = await apperClient.fetchRecords('app_subscription', params)
      
      if (!response.success) {
        console.error(response.message)
        setError(response.message)
        return
      }

      const subscriptions = response.data || []
      if (subscriptions.length > 0) {
        setSubscription(subscriptions[0])
      } else {
        // Create default subscription if none exists
        const defaultSubscription = {
          tier: 'free',
          status: 'trial',
          team_member_limit: 0,
          trial_end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
        }
        setSubscription(defaultSubscription)
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch subscription data'
      setError(errorMessage)
      console.error('Error fetching subscription data:', err)
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    await fetchSubscriptionData()
  }

  useEffect(() => {
    fetchSubscriptionData()
  }, [isAuthenticated, user])

  return {
    user,
    subscription,
    loading,
    error,
    refreshData
  }
}