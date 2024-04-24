import React, { useState } from 'react';
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

  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  return (
    <>
      <Elements stripe={stripePromise}>
        {isSubscriptionActive ? (
          <SubscriptionDetails
            paymentMethodData={paymentMethodData}
            setPaymentMethodData={setPaymentMethodData}
          />
        ) : (
          <SubscriptionsPlans
            paymentMethodData={paymentMethodData}
            setPaymentMethodData={setPaymentMethodData}
          />
        )}
      </Elements>
    </>
  );
};

export default Subscriptions;
