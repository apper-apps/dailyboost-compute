import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import PlanBadge from '@/components/molecules/PlanBadge';
import ApperIcon from '@/components/ApperIcon';
import { format, differenceInDays } from 'date-fns';

const SubscriptionStatus = ({ subscription, teamCount, onUpgrade }) => {
  const getDaysRemaining = () => {
    if (subscription.tier === 'free' && subscription.trialEndDate) {
      const daysLeft = differenceInDays(new Date(subscription.trialEndDate), new Date());
      return Math.max(0, daysLeft);
    }
    return null;
  };

  const getTeamLimit = () => {
    const limits = {
      free: 0,
      basic: 10,
      pro: 999
    };
    return limits[subscription.tier] || 0;
  };

  const daysRemaining = getDaysRemaining();
  const teamLimit = getTeamLimit();
  const isTrialEnding = daysRemaining !== null && daysRemaining <= 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card variant="gradient" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Crown" className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">
              Subscription Status
            </h3>
          </div>
          <PlanBadge plan={subscription.tier} />
        </div>

        <div className="space-y-4">
          {/* Trial Status */}
          {subscription.tier === 'free' && (
            <div className={`p-4 rounded-lg ${isTrialEnding ? 'bg-warning/10 border border-warning/30' : 'bg-gray-50'}`}>
              <div className="flex items-center space-x-2">
                <ApperIcon 
                  name={isTrialEnding ? "AlertTriangle" : "Clock"} 
                  className={`w-5 h-5 ${isTrialEnding ? 'text-warning' : 'text-gray-600'}`} 
                />
                <p className="font-medium text-gray-900">
                  {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Trial expired'}
                </p>
              </div>
              {subscription.trialEndDate && (
                <p className="text-sm text-gray-600 mt-1">
                  Trial ends {format(new Date(subscription.trialEndDate), 'MMM d, yyyy')}
                </p>
              )}
            </div>
          )}

          {/* Team Usage */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <ApperIcon name="Users" className="w-5 h-5 text-secondary" />
              <div>
                <p className="font-medium text-gray-900">Team Members</p>
                <p className="text-sm text-gray-600">
                  {teamCount} of {teamLimit === 999 ? 'unlimited' : teamLimit} used
                </p>
              </div>
            </div>
            
            {teamLimit !== 999 && (
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-300"
                  style={{ width: `${Math.min((teamCount / teamLimit) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>

          {/* Upgrade CTA */}
          {subscription.tier !== 'pro' && (
            <div className="pt-2">
              <Button
                variant="gradient"
                size="medium"
                onClick={onUpgrade}
                className="w-full flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Zap" className="w-4 h-4" />
                <span>
                  {subscription.tier === 'free' ? 'Start Your Journey' : 'Upgrade to Pro'}
                </span>
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default SubscriptionStatus;