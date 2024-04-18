import React from 'react';

import { SubscriptionsPlans, SubscriptionDetails } from './components';
import { useAuth } from '../../modules/auth';

const Subscriptions: React.FC = () => {
  const { isSubscriptionActive } = useAuth();

  return { isSubscriptionActive } ? (
    <SubscriptionDetails />
  ) : (
    <SubscriptionsPlans />
  );
};

export default Subscriptions;
