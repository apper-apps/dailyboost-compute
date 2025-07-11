import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const useQuoteData = () => {
  const [todaysQuote, setTodaysQuote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTodaysQuote = async () => {
    try {
      setError(null)
      setLoading(true)
      
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const today = new Date().toISOString().split('T')[0]
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "text" } },
          { field: { Name: "author" } },
          { field: { Name: "category" } },
          { field: { Name: "display_date" } }
        ],
        where: [
          {
            FieldName: "display_date",
            Operator: "StartsWith",
            Values: [today]
          }
        ],
        orderBy: [
          {
            fieldName: "display_date",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 1,
          offset: 0
        }
      }

      const response = await apperClient.fetchRecords('quote', params)
      
      if (!response.success) {
        console.error(response.message)
        setError(response.message)
        return
      }

      const quotes = response.data || []
      if (quotes.length > 0) {
        setTodaysQuote(quotes[0])
      } else {
        // Fallback to latest quote if no quote for today
        const fallbackParams = {
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
          ],
          pagingInfo: {
            limit: 1,
            offset: 0
          }
        }
        
        const fallbackResponse = await apperClient.fetchRecords('quote', fallbackParams)
        
        if (fallbackResponse.success && fallbackResponse.data?.length > 0) {
          setTodaysQuote(fallbackResponse.data[0])
        } else {
          setTodaysQuote(null)
        }
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch today\'s quote'
      setError(errorMessage)
      console.error('Error fetching today\'s quote:', err)
    } finally {
      setLoading(false)
    }
  }

  const refreshQuote = async () => {
    await fetchTodaysQuote()
  }

  useEffect(() => {
    fetchTodaysQuote()
  }, [])

  return {
    todaysQuote,
    loading,
    error,
    refreshQuote
  }
}