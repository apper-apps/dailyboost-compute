import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const QuoteCard = ({ quote, isDaily = false }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Motivation from DailyBoost',
          text: `"${quote.text}" - ${quote.author}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
      toast.success('Quote copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={isDaily ? "animate-quote-flip" : ""}
    >
      <Card variant="quote" className="p-8 text-center max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="relative">
            <ApperIcon 
              name="Quote" 
              className="w-12 h-12 text-primary/20 mx-auto mb-4"
            />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-gray-900 leading-relaxed">
              "{quote.text}"
            </blockquote>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <div className="text-right">
              <cite className="text-lg font-medium text-gray-700 not-italic">
                — {quote.author}
              </cite>
              {quote.category && (
                <p className="text-sm text-gray-500 mt-1">
                  {quote.category}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-3 pt-4">
            <Button
              variant="outline"
              size="medium"
              onClick={handleShare}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Share2" className="w-4 h-4" />
              <span>Share</span>
            </Button>
            
            <Button
              variant="ghost"
              size="medium"
              onClick={() => {
                navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
                toast.success('Quote copied!');
              }}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Copy" className="w-4 h-4" />
              <span>Copy</span>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default QuoteCard;