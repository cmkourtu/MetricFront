import React, { useState, useEffect } from 'react';

import {
  SubscriptionPlansDataProps,
  SubscriptionPlansProps,
} from './subscriptionsModels';
import SubscriptionPlanCard from './SubscriptionPlanCard';
import { getSubscriptionPlans } from '../../../modules/apps/core/_appRequests';
import PaymentMethod from './PaymentMethod';
import ErrorModal from '../../../../_metronic/partials/modals/ErrorModal/ErrorModal';

const SubscriptionsPlans: React.FC<SubscriptionPlansProps> = ({
  paymentMethodData,
  setPaymentMethodData,
}) => {
  const [activeTab, setActiveTab] = useState<'month' | 'annual'>('month');
  const [monthSubscriptionsPlans, setMonthSubscriptionsPlans] = useState<
    SubscriptionPlansDataProps[]
  >([]);
  const [annualSubscriptionsPlans, setAnnualSubscriptionsPlans] = useState<
    SubscriptionPlansDataProps[]
  >([]);
  const [errorText, setErrorText] = useState<string | undefined>('');

  const handleTabClick = (tab: 'month' | 'annual') => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        const { data } = await getSubscriptionPlans();
        if (data) {
          const monthSubscriptions = data
            .filter((subscription) => subscription.interval === 'month')
            .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

          const annualSubscriptions = data
            .filter((subscription) => subscription.interval === 'year')
            .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

          setMonthSubscriptionsPlans(monthSubscriptions);
          setAnnualSubscriptionsPlans(annualSubscriptions);
        }
      } catch (error) {
        console.log(error);
        setErrorText('Can not get subscription plans. Please try again later.');
      }
    };
    fetchSubscriptionPlans();
  }, []);

  return (
    <>
      <div id="kt_app_content" className="app-content  flex-column-fluid ">
        <div
          id="kt_app_content_container"
          className="app-container  container-xxl "
        >
          <div className="card mb-5" id="kt_pricing">
            <div className="card-body p-lg-17">
              <div className="d-flex flex-column">
                <div className="mb-4 text-center">
                  <h1 className="fs-2hx fw-bold mb-5">Choose Your Plan</h1>
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
                        paymentMethodData={paymentMethodData}
                      />
                    ))}
                  {activeTab === 'annual' &&
                    annualSubscriptionsPlans &&
                    annualSubscriptionsPlans.map((subscription) => (
                      <SubscriptionPlanCard
                        subscriptionPlan={subscription}
                        paymentMethodData={paymentMethodData}
                        key={subscription.id}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <PaymentMethod
            paymentMethodData={paymentMethodData}
            setPaymentMethodData={setPaymentMethodData}
          />
        </div>
      </div>
      {errorText && (
        <ErrorModal errorModalText={errorText} setErrorText={setErrorText} />
      )}
    </>
  );
};

export default SubscriptionsPlans;
