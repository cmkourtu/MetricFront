import React from 'react';

import { toAbsoluteUrl } from '../../../../_metronic/helpers';
import { useAuth } from '../../../modules/auth';
import {
  getFormattedDateWithMonth,
  getMonthAbbreviation,
} from '../../../../_metronic/helpers/reportsHelpers';
import { SummarySubscriptionCardProps } from './subscriptionsModels';

const SummarySubscriptionCard: React.FC<SummarySubscriptionCardProps> = ({
  paymentMethodData,
}) => {
  const { currentUser } = useAuth();
  return (
    <div className="flex-column flex-lg-row-auto w-lg-250px w-xl-300px mb-10 order-1 order-lg-2">
      <div
        className="card card-flush mb-0"
        data-kt-sticky="true"
        data-kt-sticky-name="subscription-summary"
        data-kt-sticky-offset="{default: false, lg: '200px'}"
        data-kt-sticky-width="{lg: '250px', xl: '300px'}"
        data-kt-sticky-left="auto"
        data-kt-sticky-top="150px"
        data-kt-sticky-animation="false"
        data-kt-sticky-zindex="95"
      >
        <div className="card-header">
          <div className="card-title">
            <h2>Summary</h2>
          </div>
        </div>
        <div className="card-body pt-0 fs-6">
          <div className="mb-7">
            <div className="d-flex align-items-center">
              <div className="symbol symbol-60px symbol-circle me-3">
                <img
                  alt="Pic"
                  src={
                    currentUser?.avatar
                      ? currentUser?.avatar
                      : toAbsoluteUrl('media/avatars/blank.png')
                  }
                />
              </div>
              <div className="d-flex flex-column">
                <a
                  href="#"
                  className="fs-4 fw-bold text-gray-900 text-hover-primary me-2"
                >
                  {currentUser?.firstName} {currentUser?.lastName}
                </a>
                <a
                  href="#"
                  className="fw-semibold text-gray-600 text-hover-primary"
                >
                  {currentUser?.email}
                </a>
              </div>
            </div>
          </div>
          <div className="separator separator-dashed mb-7"></div>
          <div className="mb-7">
            <h5 className="mb-4">Product details</h5>
            <div className="mb-0">
              <span className="badge badge-light-info me-2">Basic Bundle</span>
              {currentUser?.subscription?.status === 'active' ? (
                <span className="fw-semibold text-gray-600">
                  ${currentUser?.subscription?.subscriptionPlan?.price} /{' '}
                  {currentUser?.subscription?.subscriptionPlan?.name}
                </span>
              ) : (
                <span className="fw-semibold text-gray-600">
                  Trial:{' '}
                  {currentUser?.subscription?.subscriptionPlan?.trialPeriodDays}{' '}
                  days left
                </span>
              )}
            </div>
          </div>
          <div className="separator separator-dashed mb-7"></div>
          <div className="mb-10">
            <h5 className="mb-4">Payment Details</h5>
            <div className="mb-0">
              <div className="fw-semibold text-gray-600 d-flex align-items-center">
                Mastercard
                {paymentMethodData[0]?.card?.brand &&
                  paymentMethodData[0]?.card?.brand === 'mastercard' && (
                    <img
                      src={toAbsoluteUrl('media/svg/card-logos/mastercard.svg')}
                      className="w-40px me-3"
                      alt=""
                    />
                  )}
                {paymentMethodData[0]?.card?.brand &&
                  paymentMethodData[0]?.card?.brand === 'visa' && (
                    <img
                      src={toAbsoluteUrl('media/svg/card-logos/visa.svg')}
                      className="w-40px me-3"
                      alt=""
                    />
                  )}
                {paymentMethodData[0]?.card?.brand &&
                  paymentMethodData[0]?.card?.brand === 'american-express' && (
                    <img
                      src={toAbsoluteUrl(
                        'media/svg/card-logos/american-express.svg'
                      )}
                      className="w-40px me-3"
                      alt=""
                    />
                  )}
              </div>
              <div className="fw-semibold text-gray-600">
                {paymentMethodData[0]?.card?.exp_month &&
                  paymentMethodData[0]?.card?.exp_year &&
                  `Expires ${getMonthAbbreviation(paymentMethodData[0]?.card?.exp_month)} ${paymentMethodData[0]?.card?.exp_year}`}
              </div>
            </div>
          </div>
          <div className="separator separator-dashed mb-7"></div>
          <div className="mb-0">
            <h5 className="mb-4">Subscription Details</h5>
            <table className="table fs-6 fw-semibold gs-0 gy-2 gx-2">
              <tbody>
                <tr className="">
                  <td className="text-gray-500">Started:</td>
                  <td className="text-gray-800">
                    {getFormattedDateWithMonth(
                      currentUser?.subscription?.createdAt
                    )}
                  </td>
                </tr>
                <tr className="">
                  <td className="text-gray-500">Status:</td>
                  <td>
                    <span className="badge badge-light-success">Active</span>
                  </td>
                </tr>
                <tr className="">
                  <td className="text-gray-500">Next Invoice:</td>
                  <td className="text-gray-800">
                    {getFormattedDateWithMonth(
                      currentUser?.subscription?.end &&
                        currentUser?.subscription?.end * 1000
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySubscriptionCard;
