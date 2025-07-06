import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { subscriptionService } from '@/services/api/subscriptionService';

export const useUserData = () => {
  const { user, isAuthenticated } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubscriptionData = async () => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const subscriptionData = await subscriptionService.getCurrentSubscription();
      setSubscription(subscriptionData);
    } catch (err) {
      setError(err.message || 'Failed to fetch subscription data');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await fetchSubscriptionData();
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, [isAuthenticated, user]);

  return {
    user,
    subscription,
    loading,
    error,
    refreshData
  };
};