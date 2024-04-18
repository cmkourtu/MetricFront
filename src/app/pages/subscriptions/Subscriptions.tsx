import React, { useState, useEffect } from 'react';

import { SubscriptionPlanCard, TemporarySubscriptionsData } from './components';
import { TemporarySubscriptionsDataProps } from './components/subscriptionsModels';

const Subscriptions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'month' | 'annual'>('month');
  const [monthSubscriptionsPlans, setMonthSubscriptionsPlans] = useState<
    TemporarySubscriptionsDataProps[]
  >([]);
  const [annualSubscriptionsPlans, setAnnualSubscriptionsPlans] = useState<
    TemporarySubscriptionsDataProps[]
  >([]);

  const handleTabClick = (tab: 'month' | 'annual') => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const monthSubscriptions = TemporarySubscriptionsData.filter(
      (subscription) => subscription.interval === 'month'
    ).sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    const annualSubscriptions = TemporarySubscriptionsData.filter(
      (subscription) => subscription.interval === 'year'
    ).sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    setMonthSubscriptionsPlans(monthSubscriptions);
    setAnnualSubscriptionsPlans(annualSubscriptions);
  }, [TemporarySubscriptionsData]);

  return (
    <div id="kt_app_content" className="app-content  flex-column-fluid ">
      <div
        id="kt_app_content_container"
        className="app-container  container-xxl "
      >
        <div className="card" id="kt_pricing">
          <div className="card-body p-lg-17">
            <div className="d-flex flex-column">
              <div className="mb-4 text-center">
                <h1 className="fs-2hx fw-bold mb-5">Choose Your Plan</h1>

                {/*<div className="text-gray-600 fw-semibold fs-5">
                  If you need more info about our pricing, please check{' '}
                  <a href="#" className="link-primary fw-bold">
                    Pricing Guidelines
                  </a>
                  .
  </div>*/}
              </div>

              <div
                className="nav-group nav-group-outline mx-auto mb-10"
                data-kt-buttons="true"
                data-kt-initialized="1"
              >
                <button
                  className={`btn btn-color-gray-600 btn-active btn-active-secondary px-6 py-3 me-2 ${activeTab === 'month' && 'active'}`}
                  data-kt-plan="month"
                  onClick={() => handleTabClick('month')}
                >
                  Monthly
                </button>

                <button
                  className={`btn btn-color-gray-600 btn-active btn-active-secondary px-6 py-3 ${activeTab === 'annual' && 'active'}`}
                  data-kt-plan="annual"
                  onClick={() => handleTabClick('annual')}
                >
                  Annual
                </button>
              </div>

              <div className="row g-10">
                {activeTab === 'month' &&
                  monthSubscriptionsPlans &&
                  monthSubscriptionsPlans.map((subscription) => (
                    <SubscriptionPlanCard
                      subscriptionPlan={subscription}
                      key={subscription.id}
                    />
                  ))}
                {activeTab === 'annual' &&
                  annualSubscriptionsPlans &&
                  annualSubscriptionsPlans.map((subscription) => (
                    <SubscriptionPlanCard
                      subscriptionPlan={subscription}
                      key={subscription.id}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
