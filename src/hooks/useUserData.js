import { useState, useEffect } from 'react';
import { userService } from '@/services/api/userService';
import { subscriptionService } from '@/services/api/subscriptionService';

export const useUserData = () => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      setError(null);
      const [userData, subscriptionData] = await Promise.all([
        userService.getCurrentUser(),
        subscriptionService.getCurrentSubscription()
      ]);
      
      setUser(userData);
      setSubscription(subscriptionData);
    } catch (err) {
      setError(err.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    user,
    subscription,
    loading,
    error,
    refreshData
  };
};