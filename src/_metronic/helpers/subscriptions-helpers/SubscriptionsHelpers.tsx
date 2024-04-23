export const getSubscriptionStatus = (
  subscriptionStatus: string | undefined
) => {
  //return subscriptionStatus === 'active' || subscriptionStatus === 'trialing';

  //Return true to enable subscription in development
  return true;
};
