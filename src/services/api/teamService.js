import { toast } from 'react-toastify'

export const teamService = {
  async getTeamMembers() {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "email" } },
          { field: { Name: "invited_by" } },
          { field: { Name: "joined_date" } },
          { field: { Name: "last_viewed_quote" } }
        ]
      }

      const response = await apperClient.fetchRecords('team_member', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      return response.data || []
    } catch (err) {
      console.error('Error fetching team members:', err)
      throw new Error(err.message || 'Failed to fetch team members')
    }
  },

  async addTeamMember(email) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      // Check if member already exists
      const existingParams = {
        fields: [
          { field: { Name: "email" } }
        ],
        where: [
          {
            FieldName: "email",
            Operator: "EqualTo",
            Values: [email.toLowerCase()]
          }
        ]
      }

      const existingResponse = await apperClient.fetchRecords('team_member', existingParams)
      
      if (existingResponse.success && existingResponse.data?.length > 0) {
        throw new Error('Team member already exists')
      }

      const params = {
        records: [{
          Name: email.split('@')[0],
          email: email,
          invited_by: "current-user",
          joined_date: new Date().toISOString()
        }]
      }

      const response = await apperClient.createRecord('team_member', params)
      
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
          return successfulRecords[0].data
        }
      }
      
      throw new Error('Failed to add team member')
    } catch (err) {
      console.error('Error adding team member:', err)
      throw new Error(err.message || 'Failed to add team member')
    }
  },

  async removeTeamMember(memberId) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        RecordIds: [memberId]
      }

      const response = await apperClient.deleteRecord('team_member', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          throw new Error('Failed to remove team member')
        }
        
        return true
      }
    } catch (err) {
      console.error('Error removing team member:', err)
      throw new Error(err.message || 'Failed to remove team member')
    }
  },

  async updateTeamMember(memberId, updates) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        records: [{
          Id: memberId,
          ...updates
        }]
      }

      const response = await apperClient.updateRecord('team_member', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data
        }
      }
      
      throw new Error('Failed to update team member')
    } catch (err) {
      console.error('Error updating team member:', err)
      throw new Error(err.message || 'Failed to update team member')
    }
  }
}