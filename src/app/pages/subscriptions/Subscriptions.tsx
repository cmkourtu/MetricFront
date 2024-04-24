import React, { useState, useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { SubscriptionsPlans, SubscriptionDetails } from './components';
import { useAuth } from '../../modules/auth';
import { PaymentMethodProps } from './components/subscriptionsModels';

const Subscriptions: React.FC = () => {
  const { isSubscriptionActive } = useAuth();
  const STRIPE_PUBLISHABLE_KEY = import.meta.env
    .VITE_APP_STRIPE_PUBLISHABLE_KEY;

  const [paymentMethodData, setPaymentMethodData] = useState<
    PaymentMethodProps[]
  >([]);

  const stripePromise = useMemo(
    () => loadStripe(STRIPE_PUBLISHABLE_KEY),
    [STRIPE_PUBLISHABLE_KEY]
  );

  const ComponentToRender = useMemo(() => {
    return isSubscriptionActive ? SubscriptionDetails : SubscriptionsPlans;
  }, [isSubscriptionActive]);

  return (
    <Elements stripe={stripePromise}>
      <ComponentToRender
        paymentMethodData={paymentMethodData}
        setPaymentMethodData={setPaymentMethodData}
      />
    </Elements>
  );
};

export default Subscriptions;
