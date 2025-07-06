import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = 'No items found',
  description = 'Get started by adding your first item.',
  actionText = 'Get Started',
  onAction,
  icon = 'Package',
  variant = 'default'
}) => {
  const getEmptyConfig = () => {
    const configs = {
      team: {
        icon: 'Users',
        title: 'No team members yet',
        description: 'Start building your team by inviting colleagues to receive daily motivation together.',
        actionText: 'Add First Member'
      },
      quotes: {
        icon: 'Quote',
        title: 'No quotes yet',
        description: 'Your daily motivational quotes will appear here once you start your journey.',
        actionText: 'View Today\'s Quote'
      },
      history: {
        icon: 'History',
        title: 'No quote history',
        description: 'As you view daily quotes, they\'ll be saved here for you to revisit anytime.',
        actionText: 'View Today\'s Quote'
      },
      default: {
        icon: icon,
        title: title,
        description: description,
        actionText: actionText
      }
    };
    
    return configs[variant] || configs.default;
  };

  const config = getEmptyConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto"
    >
      <Card className="p-8 text-center">
        <div className="space-y-6">
          {/* Empty Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
              <ApperIcon name={config.icon} className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Empty Content */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              {config.title}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {config.description}
            </p>
          </div>

          {/* Action Button */}
          {onAction && (
            <div className="pt-2">
              <Button
                variant="gradient"
                size="medium"
                onClick={onAction}
                className="flex items-center space-x-2"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
                <span>{config.actionText}</span>
              </Button>
            </div>
          )}

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-2 pt-4">
            <div className="w-2 h-2 bg-primary/20 rounded-full"></div>
            <div className="w-2 h-2 bg-secondary/20 rounded-full"></div>
            <div className="w-2 h-2 bg-accent/20 rounded-full"></div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Empty;