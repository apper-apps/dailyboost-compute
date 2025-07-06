import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  error = 'Something went wrong', 
  onRetry, 
  title = 'Oops! Something went wrong',
  description 
}) => {
  const getErrorMessage = () => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    return 'An unexpected error occurred. Please try again.';
  };

  const getErrorDescription = () => {
    if (description) return description;
    return 'We encountered an issue while loading your content. This might be a temporary problem.';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto"
    >
      <Card className="p-8 text-center">
        <div className="space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center">
              <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
            </div>
          </div>

          {/* Error Content */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              {title}
            </h3>
            <p className="text-gray-600">
              {getErrorDescription()}
            </p>
            {error && (
              <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                {getErrorMessage()}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <Button
                variant="primary"
                size="medium"
                onClick={onRetry}
                className="flex items-center space-x-2"
              >
                <ApperIcon name="RefreshCw" className="w-4 h-4" />
                <span>Try Again</span>
              </Button>
            )}
            
            <Button
              variant="outline"
              size="medium"
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="RotateCcw" className="w-4 h-4" />
              <span>Refresh Page</span>
            </Button>
          </div>

          {/* Help Text */}
          <p className="text-xs text-gray-500">
            If this problem persists, please contact support at{' '}
            <a 
              href="mailto:support@dailyboost.com" 
              className="text-primary hover:underline"
            >
              support@dailyboost.com
            </a>
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default Error;