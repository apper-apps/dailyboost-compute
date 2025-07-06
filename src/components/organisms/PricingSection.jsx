import { useState } from 'react';
import { motion } from 'framer-motion';
import PricingCard from '@/components/molecules/PricingCard';
import { useUserData } from '@/hooks/useUserData';
import { subscriptionService } from '@/services/api/subscriptionService';
import { toast } from 'react-toastify';

const PricingSection = () => {
  const { subscription, refreshData } = useUserData();
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: 0,
      period: null,
      features: [
        '3-day free trial',
        'Daily motivational quotes',
        'Quote sharing & copying',
        'No team members',
        'Basic quote history'
      ]
    },
    {
      name: 'Basic',
      price: 5,
      period: 'month',
      features: [
        'Unlimited daily quotes',
        'Add up to 10 team members',
        'Team quote delivery',
        'Full quote history',
        'Priority support',
        'Advanced sharing options'
      ],
      isPopular: true
    },
    {
      name: 'Pro',
      price: 15,
      period: 'month',
      features: [
        'Everything in Basic',
        'Unlimited team members',
        'Custom quote categories',
        'Team analytics & insights',
        'Priority quote scheduling',
        'White-label options',
        'Dedicated account manager'
      ]
    }
  ];

  const handleSelectPlan = async (planName) => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      if (planName.toLowerCase() === 'free') {
        toast.info('You are already on the free plan!');
        return;
      }

      // Simulate Stripe checkout
      await subscriptionService.upgradePlan(planName.toLowerCase());
      await refreshData();
      
      toast.success(`Successfully upgraded to ${planName} plan!`);
    } catch (error) {
      toast.error(`Failed to upgrade to ${planName} plan. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Start with our free trial, then upgrade to unlock team features and unlimited motivation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PricingCard
              plan={plan.name}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              isPopular={plan.isPopular}
              isCurrentPlan={subscription?.tier === plan.name.toLowerCase()}
              onSelect={() => handleSelectPlan(plan.name)}
              buttonText={
                subscription?.tier === plan.name.toLowerCase() 
                  ? 'Current Plan' 
                  : plan.name === 'Free' 
                    ? 'Start Free Trial' 
                    : `Choose ${plan.name}`
              }
            />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">
          All plans include secure payment processing and can be cancelled anytime.
        </p>
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <span>✓ 30-day money-back guarantee</span>
          <span>✓ No setup fees</span>
          <span>✓ Cancel anytime</span>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;