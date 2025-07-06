import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const PricingCard = ({ 
  plan, 
  price, 
  period, 
  features, 
  isPopular = false, 
  isCurrentPlan = false,
  onSelect,
  buttonText = "Get Started"
}) => {
  const getPlanColor = () => {
    switch (plan.toLowerCase()) {
      case 'free':
        return 'from-gray-100 to-gray-200';
      case 'basic':
        return 'from-secondary/20 to-success/20';
      case 'pro':
        return 'from-primary/20 via-secondary/20 to-accent/20';
      default:
        return 'from-gray-100 to-gray-200';
    }
  };

  const getButtonVariant = () => {
    if (isCurrentPlan) return 'ghost';
    switch (plan.toLowerCase()) {
      case 'free':
        return 'outline';
      case 'basic':
        return 'secondary';
      case 'pro':
        return 'gradient';
      default:
        return 'primary';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="relative"
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}

      <Card 
        variant="pricing" 
        className={`p-6 h-full ${isCurrentPlan ? 'ring-2 ring-primary' : ''} ${isPopular ? 'ring-2 ring-primary/50' : ''}`}
      >
        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getPlanColor()} flex items-center justify-center mx-auto mb-4`}>
            <ApperIcon 
              name={plan.toLowerCase() === 'free' ? 'Gift' : plan.toLowerCase() === 'basic' ? 'Users' : 'Crown'} 
              className="w-8 h-8 text-gray-700"
            />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">{plan}</h3>
          
          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-900">${price}</span>
            {period && <span className="text-gray-600">/{period}</span>}
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <ApperIcon name="Check" className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={getButtonVariant()}
          size="large"
          onClick={onSelect}
          disabled={isCurrentPlan}
          className="w-full"
        >
          {isCurrentPlan ? 'Current Plan' : buttonText}
        </Button>
      </Card>
    </motion.div>
  );
};

export default PricingCard;