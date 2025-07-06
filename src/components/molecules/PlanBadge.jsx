import Badge from '@/components/atoms/Badge';

const PlanBadge = ({ plan, size = 'medium' }) => {
  const planConfig = {
    free: { variant: 'free', label: 'Free Trial' },
    basic: { variant: 'basic', label: 'Basic Plan' },
    pro: { variant: 'pro', label: 'Pro Plan' },
  };

  const config = planConfig[plan.toLowerCase()] || planConfig.free;

  return (
    <Badge variant={config.variant} size={size}>
      {config.label}
    </Badge>
  );
};

export default PlanBadge;