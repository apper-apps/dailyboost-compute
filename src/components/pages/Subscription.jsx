import { motion } from 'framer-motion';
import PricingSection from '@/components/organisms/PricingSection';
import SubscriptionStatus from '@/components/molecules/SubscriptionStatus';
import { useUserData } from '@/hooks/useUserData';
import { useTeamData } from '@/hooks/useTeamData';

const Subscription = () => {
  const { subscription } = useUserData();
  const { teamMembers } = useTeamData();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Subscription & Billing
            </h1>
            <p className="text-lg text-gray-600">
              Manage your plan and unlock more features
            </p>
          </div>

          {/* Current Status */}
          {subscription && (
            <div className="max-w-md mx-auto mb-12">
              <SubscriptionStatus
                subscription={subscription}
                teamCount={teamMembers.length}
                onUpgrade={() => {
                  // Scroll to pricing section
                  document.getElementById('pricing-section')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              />
            </div>
          )}

          {/* Pricing Section */}
          <div id="pricing-section">
            <PricingSection />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;