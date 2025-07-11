import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const useTeamData = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTeamData = async () => {
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
          { field: { Name: "email" } },
          { field: { Name: "invited_by" } },
          { field: { Name: "joined_date" } },
          { field: { Name: "last_viewed_quote" } }
        ]
      }

      const response = await apperClient.fetchRecords('team_member', params)
      
      if (!response.success) {
        console.error(response.message)
        setError(response.message)
        return
      }

      setTeamMembers(response.data || [])
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch team data'
      setError(errorMessage)
      console.error('Error fetching team data:', err)
    } finally {
      setLoading(false)
    }
  }

  const addTeamMember = async (email) => {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

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
          const newMember = successfulRecords[0].data
          setTeamMembers(prev => [...prev, newMember])
          toast.success('Team member added successfully!')
          return newMember
        }
      }
      
      throw new Error('Failed to add team member')
    } catch (err) {
      console.error('Error adding team member:', err)
      throw new Error(err.message || 'Failed to add team member')
    }
  }

  const removeTeamMember = async (memberId) => {
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
        
        setTeamMembers(prev => prev.filter(member => member.Id !== memberId))
        toast.success('Team member removed successfully!')
      }
    } catch (err) {
      console.error('Error removing team member:', err)
      throw new Error(err.message || 'Failed to remove team member')
    }
  }

  const refreshTeamData = async () => {
    await fetchTeamData()
  }

  useEffect(() => {
    fetchTeamData()
  }, [])

  return {
    teamMembers,
    loading,
    error,
    addTeamMember,
    removeTeamMember,
    refreshTeamData
  }
}