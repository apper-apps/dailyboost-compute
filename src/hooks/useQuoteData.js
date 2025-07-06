import { useState, useEffect } from 'react';
import { quoteService } from '@/services/api/quoteService';

export const useQuoteData = () => {
  const [todaysQuote, setTodaysQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodaysQuote = async () => {
    try {
      setError(null);
      const quote = await quoteService.getTodaysQuote();
      setTodaysQuote(quote);
    } catch (err) {
      setError(err.message || 'Failed to fetch today\'s quote');
    } finally {
      setLoading(false);
    }
  };

  const refreshQuote = async () => {
    setLoading(true);
    await fetchTodaysQuote();
  };

  useEffect(() => {
    fetchTodaysQuote();
  }, []);

  return {
    todaysQuote,
    loading,
    error,
    refreshQuote
  };
};