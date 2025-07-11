import { toast } from 'react-toastify'

export const subscriptionService = {
  async getCurrentSubscription() {
    try {
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
        throw new Error(response.message)
      }

      const subscriptions = response.data || []
      return subscriptions.length > 0 ? subscriptions[0] : null
    } catch (err) {
      console.error('Error fetching subscription:', err)
      throw new Error(err.message || 'Failed to fetch subscription')
    }
  },

  async upgradePlan(newTier) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const tierConfig = {
        basic: { price: 5, team_member_limit: 10 },
        pro: { price: 15, team_member_limit: 999 }
      }
      
      const config = tierConfig[newTier]
      if (!config) {
        throw new Error('Invalid plan tier')
      }

      // Get current subscription
      const current = await this.getCurrentSubscription()
      
      if (current) {
        // Update existing subscription
        const params = {
          records: [{
            Id: current.Id,
            tier: newTier,
            status: 'active',
            team_member_limit: config.team_member_limit,
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }]
        }

        const response = await apperClient.updateRecord('app_subscription', params)
        
        if (!response.success) {
          console.error(response.message)
          throw new Error(response.message)
        }

        if (response.results) {
          const failedUpdates = response.results.filter(result => !result.success)
          
          if (failedUpdates.length > 0) {
            console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
            
            failedUpdates.forEach(record => {
              record.errors?.forEach(error => {
                toast.error(`${error.fieldLabel}: ${error.message}`)
              })
              if (record.message) toast.error(record.message)
            })
            throw new Error('Failed to upgrade plan')
          }
          
          const updatedSubscription = response.results[0].data
          toast.success(`Successfully upgraded to ${newTier} plan!`)
          return updatedSubscription
        }
      } else {
        // Create new subscription
        const params = {
          records: [{
            Name: `${newTier} subscription`,
            tier: newTier,
            status: 'active',
            team_member_limit: config.team_member_limit,
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }]
        }

        const response = await apperClient.createRecord('app_subscription', params)
        
        if (!response.success) {
          console.error(response.message)
          throw new Error(response.message)
        }

        if (response.results) {
          const successfulRecords = response.results.filter(result => result.success)
          const failedRecords = response.results.filter(result => !result.success)
          
          if (failedRecords.length > 0) {
            console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
            
            failedRecords.forEach(record => {
              record.errors?.forEach(error => {
                toast.error(`${error.fieldLabel}: ${error.message}`)
              })
              if (record.message) toast.error(record.message)
            })
          }
          
          if (successfulRecords.length > 0) {
            const newSubscription = successfulRecords[0].data
            toast.success(`Successfully created ${newTier} plan!`)
            return newSubscription
          }
        }
        
        throw new Error('Failed to create subscription')
      }
    } catch (err) {
      console.error('Error upgrading plan:', err)
      throw new Error(err.message || 'Failed to upgrade plan')
    }
  },

  async cancelSubscription() {
    try {
      const current = await this.getCurrentSubscription()
      
      if (!current) {
        throw new Error('No active subscription found')
      }

      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        records: [{
          Id: current.Id,
          status: 'cancelled'
        }]
      }

      const response = await apperClient.updateRecord('app_subscription', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
          throw new Error('Failed to cancel subscription')
        }
        
        const cancelledSubscription = response.results[0].data
        toast.success('Subscription cancelled successfully')
        return cancelledSubscription
      }
    } catch (err) {
      console.error('Error cancelling subscription:', err)
      throw new Error(err.message || 'Failed to cancel subscription')
    }
  },

  async getSubscriptionHistory() {
    try {
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
        ]
      }

      const response = await apperClient.fetchRecords('app_subscription', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      return response.data || []
    } catch (err) {
      console.error('Error fetching subscription history:', err)
      throw new Error(err.message || 'Failed to fetch subscription history')
    }
  }
}