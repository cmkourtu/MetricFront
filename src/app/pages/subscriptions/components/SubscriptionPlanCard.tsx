import React from 'react';
import {
  SubscriptionPlanCardProps,
  PaymentMethodProps,
} from './subscriptionsModels';
import { subscribe } from '../../../modules/apps/core/_appRequests';

const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  subscriptionPlan,
  paymentMethodData,
}) => {
  const handleSelectSubscriptionPlan = async (subscriptionId: string) => {
    try {
      const { data } = await subscribe(subscriptionId);
      window.location.assign(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const getAddInfo = (paymentMethodData: PaymentMethodProps[]) => {
    if (!paymentMethodData || paymentMethodData.length === 0) {
      return '* Please, add a payment method to proceed.';
    }

    const defaultCount = paymentMethodData.filter(
      (method) => method.isDefault
    ).length;

    if (defaultCount !== 1) {
      return '* Please, choose a default payment method to proceed.';
    }

    return '';
  };

  return (
    <div className="col-xl-4">
      <div className="d-flex h-100 align-items-center">
        <div className="w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-15 px-10">
          <div className="mb-7 text-center">
            <h1 className="text-gray-900 mb-5 fw-bolder">
              {subscriptionPlan?.name}
            </h1>
            <div className="text-gray-600 fw-semibold mb-5">
              {subscriptionPlan?.description}
            </div>
            <div className="text-center">
              <span className="mb-2 text-primary">$</span>
              <span
                className="fs-3x fw-bold text-primary"
                data-kt-plan-price-month="39"
                data-kt-plan-price-annual="399"
              >
                {subscriptionPlan?.price}
              </span>

              <span className="fs-7 fw-semibold opacity-50">
                /
                <span data-kt-element="period">
                  {subscriptionPlan?.interval}
                </span>
              </span>
            </div>
          </div>

          <div className="w-100 mb-10">
            {subscriptionPlan?.interval === 'month' && (
              <div className="d-flex align-items-center mb-5">
                <span className="fw-semibold fs-6 text-gray-800 flex-grow-1 pe-3">
                  Trial period 14 days
                </span>
                <i className="ki-duotone ki-check-circle fs-1 text-success">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </div>
            )}

            {/*<div className="d-flex align-items-center mb-5">
              <span className="fw-semibold fs-6 text-gray-800 flex-grow-1 pe-3">
                Up to 30 Project Integrations{' '}
              </span>
              <i className="ki-duotone ki-check-circle fs-1 text-success">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
  </div>*/}

            {/*<div className="d-flex align-items-center mb-5">
              <span className="fw-semibold fs-6 text-gray-800 flex-grow-1 pe-3">
                Analytics Module{' '}
              </span>
              <i className="ki-duotone ki-check-circle fs-1 text-success">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
  </div>*/}

            {/*<div className="d-flex align-items-center mb-5">
              <span className="fw-semibold fs-6 text-gray-600 flex-grow-1">
                Finance Module{' '}
              </span>
              <i className="ki-duotone ki-cross-circle fs-1">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
  </div>*/}

            {/*<div className="d-flex align-items-center mb-5">
              <span className="fw-semibold fs-6 text-gray-600 flex-grow-1">
                Accounting Module{' '}
              </span>
              <i className="ki-duotone ki-cross-circle fs-1">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
  </div>*/}

            {/*<div className="d-flex align-items-center mb-5">
              <span className="fw-semibold fs-6 text-gray-600 flex-grow-1">
                Network Platform{' '}
              </span>
              <i className="ki-duotone ki-cross-circle fs-1">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
  </div>*/}

            {/*<div className="d-flex align-items-center ">
              <span className="fw-semibold fs-6 text-gray-600 flex-grow-1">
                Unlimited Cloud Space{' '}
              </span>
              <i className="ki-duotone ki-cross-circle fs-1">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
  </div>*/}
          </div>

          <button
            className="btn btn-sm btn-primary fw-bold mb-8"
            onClick={() => {
              handleSelectSubscriptionPlan(subscriptionPlan?.id);
            }}
            disabled={getAddInfo(paymentMethodData) !== ''}
          >
            Select
          </button>
          <span>{getAddInfo(paymentMethodData)}</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlanCard;
