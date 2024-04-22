import React from 'react';

import SummarySubscriptionCard from './SummarySubscriptionCard';
import SubscriptionDetailsCard from './SubscriptionDetailsCard';
import PaymentMethod from './PaymentMethod';

const SubscriptionDetails: React.FC = () => {
  return (
    <div id="kt_app_content" className="app-content flex-column-fluid">
      <div
        id="kt_app_content_container"
        className="app-container  container-xxl "
      >
        <div className="d-flex flex-column flex-lg-row">
          <div className="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
            <SubscriptionDetailsCard />
            <PaymentMethod />
          </div>
          <SummarySubscriptionCard />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
