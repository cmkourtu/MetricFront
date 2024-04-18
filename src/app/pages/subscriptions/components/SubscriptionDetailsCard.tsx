import React from 'react';

const SubscriptionDetailsCard: React.FC = () => {
  return (
    <div className="card card-flush pt-3 mb-5 mb-xl-10">
      <div className="card-header">
        <div className="card-title">
          <h2 className="fw-bold">Product Details</h2>
        </div>
      </div>
      <div className="card-body pt-3">
        <div className="mb-10">
          <h5 className="mb-4">Billing Address:</h5>
          <div className="d-flex flex-wrap py-5">
            <div className="flex-equal me-5">
              <table className="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">
                <tbody>
                  <tr>
                    <td className="text-gray-500 min-w-175px w-175px">
                      Bill to:
                    </td>
                    <td className="text-gray-800 min-w-200px">
                      <a
                        href="/metronic8/demo1/pages/apps/customers/view.html"
                        className="text-gray-800 text-hover-primary"
                      >
                        smith@kpmg.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Customer Name:</td>
                    <td className="text-gray-800">Emma Smith </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Address:</td>
                    <td className="text-gray-800">
                      Floor 10, 101 Avenue of the Light Square, New York, NY,
                      10050.
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Phone:</td>
                    <td className="text-gray-800">(555) 555-1234</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex-equal">
              <table className="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">
                <tbody>
                  <tr>
                    <td className="text-gray-500 min-w-175px w-175px">
                      Subscribed Product:
                    </td>
                    <td className="text-gray-800 min-w-200px">
                      <a href="#" className="text-gray-800 text-hover-primary">
                        Basic Bundle
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Subscription Fees:</td>
                    <td className="text-gray-800">$149.99 / Year</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Billing method:</td>
                    <td className="text-gray-800">Annually</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Currency:</td>
                    <td className="text-gray-800">USD - US Dollar</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mb-0">
          <h5 className="mb-4">Subscribed Products:</h5>
          <div className="table-responsive">
            <table className="table align-middle table-row-dashed fs-6 gy-4 mb-0">
              <thead>
                <tr className="border-bottom border-gray-200 text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                  <th className="min-w-150px">Product</th>
                  <th className="min-w-125px">Subscription ID</th>
                  <th className="min-w-125px">Qty</th>
                  <th className="min-w-125px">Total</th>
                  <th className="text-end min-w-70px">Actions</th>
                </tr>
              </thead>
              <tbody className="fw-semibold text-gray-800">
                <tr>
                  <td>
                    <label className="w-150px">Basic Bundle</label>
                    <div className="fw-normal text-gray-600">
                      Basic yearly bundle
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-light-danger">
                      sub_4567_8765
                    </span>
                  </td>
                  <td>1</td>
                  <td>$149.99 / Year</td>
                  <td className="text-end">
                    <a
                      href="#"
                      className="btn btn-icon btn-active-light-primary w-30px h-30px"
                      data-kt-menu-trigger="click"
                      data-kt-menu-placement="bottom-end"
                    >
                      <i className="ki-duotone ki-setting-3 fs-3">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                      </i>{' '}
                    </a>
                    <div
                      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-6 w-200px py-4"
                      data-kt-menu="true"
                    >
                      <div className="menu-item px-3">
                        <a href="#" className="menu-link px-3">
                          Pause Subscription
                        </a>
                      </div>
                      <div className="menu-item px-3">
                        <a
                          href="#"
                          className="menu-link px-3"
                          data-kt-subscriptions-view-action="delete"
                        >
                          Edit Subscription
                        </a>
                      </div>
                      <div className="menu-item px-3">
                        <a
                          href="#"
                          className="menu-link text-danger px-3"
                          data-kt-subscriptions-view-action="edit"
                        >
                          Cancel Subscription
                        </a>
                      </div>
                    </div>
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

export default SubscriptionDetailsCard;
