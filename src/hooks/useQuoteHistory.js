import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const useQuoteHistory = () => {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchQuoteHistory = async () => {
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
          { field: { Name: "text" } },
          { field: { Name: "author" } },
          { field: { Name: "category" } },
          { field: { Name: "display_date" } }
        ],
        orderBy: [
          {
            fieldName: "display_date",
            sorttype: "DESC"
          }
        ]
      }

      const response = await apperClient.fetchRecords('quote', params)
      
      if (!response.success) {
        console.error(response.message)
        setError(response.message)
        return
      }

      setQuotes(response.data || [])
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch quote history'
      setError(errorMessage)
      console.error('Error fetching quote history:', err)
    } finally {
      setLoading(false)
    }
  }

  const refreshHistory = async () => {
    await fetchQuoteHistory()
  }

  useEffect(() => {
    fetchQuoteHistory()
  }, [])

  return {
    quotes,
    loading,
    error,
    refreshHistory
  }
}