import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { format } from 'date-fns';

const TeamMemberCard = ({ member, onRemove, canRemove = true }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove(member.Id);
    setIsRemoving(false);
  };

  const getInitials = (email) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  const getLastViewedStatus = () => {
    if (!member.lastViewedQuote) return 'Never';
    
    const lastViewed = new Date(member.lastViewedQuote);
    const today = new Date();
    const diffDays = Math.floor((today - lastViewed) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-medium text-sm">
              {getInitials(member.email)}
            </div>
            
            <div>
              <p className="font-medium text-gray-900">{member.email}</p>
              <p className="text-sm text-gray-500">
                Joined {format(new Date(member.joinedDate), 'MMM d, yyyy')}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm text-gray-600">Last viewed</p>
              <p className="text-sm font-medium text-gray-900">
                {getLastViewedStatus()}
              </p>
            </div>

            {canRemove && (
              <Button
                variant="ghost"
                size="small"
                onClick={handleRemove}
                disabled={isRemoving}
                className="text-error hover:text-error hover:bg-error/10"
              >
                {isRemoving ? (
                  <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                ) : (
                  <ApperIcon name="X" className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TeamMemberCard;