import { motion } from 'framer-motion';
import QuoteCard from '@/components/molecules/QuoteCard';
import SubscriptionStatus from '@/components/molecules/SubscriptionStatus';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { useQuoteData } from '@/hooks/useQuoteData';
import { useUserData } from '@/hooks/useUserData';
import { useTeamData } from '@/hooks/useTeamData';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { todaysQuote, loading: quoteLoading, error: quoteError, refreshQuote } = useQuoteData();
  const { subscription, loading: userLoading, error: userError, refreshData } = useUserData();
  const { teamMembers, loading: teamLoading } = useTeamData();

  const handleUpgrade = () => {
    navigate('/subscription');
  };

  if (quoteLoading || userLoading || teamLoading) {
    return <Loading />;
  }

  if (quoteError || userError) {
    return <Error error={quoteError || userError} onRetry={refreshQuote || refreshData} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Welcome Section */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Your Daily Boost
                </h1>
                <p className="text-lg text-gray-600">
                  Start your day with inspiration and motivation
                </p>
              </div>

              {/* Today's Quote */}
              {todaysQuote && (
                <QuoteCard quote={todaysQuote} isDaily={true} />
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {subscription && (
                <SubscriptionStatus
                  subscription={subscription}
                  teamCount={teamMembers.length}
                  onUpgrade={handleUpgrade}
                />
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {teamMembers.length}
                  </div>
                  <div className="text-sm text-gray-600">Team Members</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {subscription?.tier === 'free' ? '3' : '∞'}
                  </div>
                  <div className="text-sm text-gray-600">Days Access</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;