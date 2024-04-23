import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import {
  PaymentMethod,
  SummarySubscriptionCard,
  SubscriptionDetailsCard,
} from './';
import { PaymentMethodProps } from './subscriptionsModels';

const SubscriptionDetails: React.FC = () => {
  const STRIPE_PUBLISHABLE_KEY = import.meta.env
    .VITE_APP_STRIPE_PUBLISHABLE_KEY;

  const [paymentMethodData, setPaymentMethodData] = useState<
    PaymentMethodProps[]
  >([]);

  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  return (
    <div id="kt_app_content" className="app-content flex-column-fluid">
      <div
        id="kt_app_content_container"
        className="app-container  container-xxl "
      >
        <Elements stripe={stripePromise}>
          <div className="d-flex flex-column flex-lg-row">
            <div className="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
              <SubscriptionDetailsCard />
              <PaymentMethod
                paymentMethodData={paymentMethodData}
                setPaymentMethodData={setPaymentMethodData}
              />
            </div>
            <SummarySubscriptionCard paymentMethodData={paymentMethodData} />
          </div>
        </Elements>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
