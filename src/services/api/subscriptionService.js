import mockSubscriptions from '@/services/mockData/subscriptions.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const subscriptionService = {
  async getCurrentSubscription() {
    await delay(250);
    // Simulate getting current user's subscription
    return mockSubscriptions[0];
  },

  async upgradePlan(newTier) {
    await delay(500);
    // Simulate Stripe payment processing
    const subscription = mockSubscriptions[0];
    
    const tierConfig = {
      basic: { price: 5, teamMemberLimit: 10 },
      pro: { price: 15, teamMemberLimit: 999 }
    };
    
    const config = tierConfig[newTier];
    if (!config) {
      throw new Error('Invalid plan tier');
    }
    
    // Update subscription
    subscription.tier = newTier;
    subscription.status = 'active';
    subscription.teamMemberLimit = config.teamMemberLimit;
    subscription.currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    
    return subscription;
  },

  async cancelSubscription() {
    await delay(300);
    const subscription = mockSubscriptions[0];
    subscription.status = 'cancelled';
    return subscription;
  },

  async getSubscriptionHistory() {
    await delay(200);
    return mockSubscriptions;
  }
};