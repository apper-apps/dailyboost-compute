export const quoteService = {
  async getTodaysQuote() {
    try {
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
        throw new Error(response.message)
      }

      const quotes = response.data || []
      if (quotes.length > 0) {
        return quotes[0]
      }
      
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
        return fallbackResponse.data[0]
      }
      
      return null
    } catch (err) {
      console.error('Error fetching today\'s quote:', err)
      throw new Error(err.message || 'Failed to fetch today\'s quote')
    }
  },

  async getQuoteHistory() {
    try {
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
        throw new Error(response.message)
      }

      return response.data || []
    } catch (err) {
      console.error('Error fetching quote history:', err)
      throw new Error(err.message || 'Failed to fetch quote history')
    }
  },

  async getQuoteById(quoteId) {
    try {
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
        ]
      }

      const response = await apperClient.getRecordById('quote', quoteId, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      if (!response.data) {
        throw new Error('Quote not found')
      }

      return response.data
    } catch (err) {
      console.error('Error fetching quote by ID:', err)
      throw new Error(err.message || 'Failed to fetch quote')
    }
  },

  async getQuotesByCategory(category) {
    try {
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
        where: [
          {
            FieldName: "category",
            Operator: "EqualTo",
            Values: [category]
          }
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
        throw new Error(response.message)
      }

      return response.data || []
    } catch (err) {
      console.error('Error fetching quotes by category:', err)
      throw new Error(err.message || 'Failed to fetch quotes by category')
    }
  },

  async searchQuotes(searchTerm) {
    try {
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
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "text",
                    operator: "Contains",
                    values: [searchTerm]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "author",
                    operator: "Contains",
                    values: [searchTerm]
                  }
                ]
              }
            ]
          }
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
        throw new Error(response.message)
      }

      return response.data || []
    } catch (err) {
      console.error('Error searching quotes:', err)
      throw new Error(err.message || 'Failed to search quotes')
    }
  }
}