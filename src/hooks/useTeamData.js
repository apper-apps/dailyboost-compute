import { useState, useEffect } from 'react';
import { teamService } from '@/services/api/teamService';

export const useTeamData = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeamData = async () => {
    try {
      setError(null);
      const members = await teamService.getTeamMembers();
      setTeamMembers(members);
    } catch (err) {
      setError(err.message || 'Failed to fetch team data');
    } finally {
      setLoading(false);
    }
  };

  const addTeamMember = async (email) => {
    try {
      const newMember = await teamService.addTeamMember(email);
      setTeamMembers(prev => [...prev, newMember]);
      return newMember;
    } catch (err) {
      throw new Error(err.message || 'Failed to add team member');
    }
  };

  const removeTeamMember = async (memberId) => {
    try {
      await teamService.removeTeamMember(memberId);
      setTeamMembers(prev => prev.filter(member => member.Id !== memberId));
    } catch (err) {
      throw new Error(err.message || 'Failed to remove team member');
    }
  };

  const refreshTeamData = async () => {
    setLoading(true);
    await fetchTeamData();
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  return {
    teamMembers,
    loading,
    error,
    addTeamMember,
    removeTeamMember,
    refreshTeamData
  };
};