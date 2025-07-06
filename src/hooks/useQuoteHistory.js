import { useState, useEffect } from 'react';
import { quoteService } from '@/services/api/quoteService';

export const useQuoteHistory = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuoteHistory = async () => {
    try {
      setError(null);
      const history = await quoteService.getQuoteHistory();
      setQuotes(history);
    } catch (err) {
      setError(err.message || 'Failed to fetch quote history');
    } finally {
      setLoading(false);
    }
  };

  const refreshHistory = async () => {
    setLoading(true);
    await fetchQuoteHistory();
  };

  useEffect(() => {
    fetchQuoteHistory();
  }, []);

  return {
    quotes,
    loading,
    error,
    refreshHistory
  };
};