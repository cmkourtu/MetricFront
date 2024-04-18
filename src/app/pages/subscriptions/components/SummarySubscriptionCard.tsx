import React from 'react';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';
import { useAuth } from '../../../modules/auth';

const SummarySubscriptionCard: React.FC = () => {
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
              <span className="fw-semibold text-gray-600">$149.99 / Year</span>
            </div>
          </div>
          <div className="separator separator-dashed mb-7"></div>
          <div className="mb-10">
            <h5 className="mb-4">Payment Details</h5>
            <div className="mb-0">
              <div className="fw-semibold text-gray-600 d-flex align-items-center">
                Mastercard
                <img
                  src={toAbsoluteUrl('media/svg/card-logos/mastercard.svg')}
                  className="w-35px ms-2"
                  alt=""
                />
              </div>
              <div className="fw-semibold text-gray-600">Expires Dec 2024</div>
            </div>
          </div>
          <div className="separator separator-dashed mb-7"></div>
          <div className="mb-0">
            <h5 className="mb-4">Subscription Details</h5>
            <table className="table fs-6 fw-semibold gs-0 gy-2 gx-2">
              <tbody>
                <tr className="">
                  <td className="text-gray-500">Subscription ID:</td>
                  <td className="text-gray-800">sub_4567_8765</td>
                </tr>
                <tr className="">
                  <td className="text-gray-500">Started:</td>
                  <td className="text-gray-800">15 Apr 2021</td>
                </tr>
                <tr className="">
                  <td className="text-gray-500">Status:</td>
                  <td>
                    <span className="badge badge-light-success">Active</span>
                  </td>
                </tr>
                <tr className="">
                  <td className="text-gray-500">Next Invoice:</td>
                  <td className="text-gray-800">15 Apr 2022</td>
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
