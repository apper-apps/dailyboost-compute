import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const AddTeamMemberForm = ({ onAddMember, teamCount, teamLimit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (teamCount >= teamLimit) {
      setError(`You've reached your team limit of ${teamLimit} members`);
      return;
    }

    try {
      await onAddMember(email);
      setEmail('');
      toast.success('Team member invited successfully!');
    } catch (err) {
      setError(err.message || 'Failed to invite team member');
    }
  };

  const canAddMore = teamCount < teamLimit;
  const isUnlimited = teamLimit === 999;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <ApperIcon name="UserPlus" className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">
            Add Team Member
          </h3>
        </div>

        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="colleague@company.com"
            error={error}
            disabled={!canAddMore || isLoading}
          />

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {isUnlimited ? (
                <span className="text-success font-medium">
                  ✓ Unlimited team members
                </span>
              ) : (
                <span>
                  {teamCount} of {teamLimit} members used
                </span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="medium"
              disabled={!canAddMore || isLoading || !email.trim()}
              className="flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                  <span>Inviting...</span>
                </>
              ) : (
                <>
                  <ApperIcon name="Send" className="w-4 h-4" />
                  <span>Send Invite</span>
                </>
              )}
            </Button>
          </div>

          {!canAddMore && !isUnlimited && (
            <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <ApperIcon name="AlertTriangle" className="w-4 h-4 text-warning" />
                <p className="text-sm text-warning font-medium">
                  You've reached your team limit. Upgrade to add more members.
                </p>
              </div>
            </div>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default AddTeamMemberForm;