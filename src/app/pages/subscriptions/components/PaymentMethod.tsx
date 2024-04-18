import React, { useState } from 'react';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';
import AddNewCardModal from './AddNewCardModal';

const PaymentMethod: React.FC = () => {
  const [showAddCardModal, setShowAddCardModal] = useState<boolean>(false);
  const handleOpenAddCartModal = () => {
    setShowAddCardModal(true);
  };
  const handleCloseAddCartModal = () => {
    setShowAddCardModal(false);
  };

  return (
    <>
      <div
        className="card card-flush pt-3 mb-5 mb-lg-10"
        data-kt-subscriptions-form="pricing"
      >
        <div className="card-header">
          <div className="card-title">
            <h2 className="fw-bold">Payment Method</h2>
          </div>
          <div className="card-toolbar">
            <button
              className="btn btn-primary fw-bold"
              onClick={handleOpenAddCartModal}
            >
              New Method
            </button>
          </div>
        </div>
        <div className="card-body pt-0">
          <div id="kt_create_new_payment_method">
            <div className="py-1">
              <div className="py-3 d-flex flex-stack flex-wrap">
                <div
                  className="d-flex align-items-center collapsible toggle "
                  data-bs-toggle="collapse"
                  data-bs-target="#kt_create_new_payment_method_1"
                >
                  <div className="btn btn-sm btn-icon btn-active-color-primary ms-n3 me-2">
                    <i className="ki-duotone ki-minus-square toggle-on text-primary fs-2">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                    <i className="ki-duotone ki-plus-square toggle-off fs-2">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </i>{' '}
                  </div>
                  <img
                    src={toAbsoluteUrl('media/svg/card-logos/mastercard.svg')}
                    className="w-40px me-3"
                    alt=""
                  />
                  <div className="me-3">
                    <div className="d-flex align-items-center fw-bold">
                      Mastercard{' '}
                      <div className="badge badge-light-primary ms-5">
                        Primary
                      </div>
                    </div>
                    <div className="text-muted">Expires Dec 2024</div>
                  </div>
                </div>
                <div className="d-flex my-3 ms-9">
                  <label className="form-check form-check-custom form-check-solid me-5">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_method" /*checked={checked}*/
                    />
                  </label>
                </div>
              </div>
              <div
                id="kt_create_new_payment_method_1"
                className="collapse show fs-6 ps-10"
              >
                <div className="d-flex flex-wrap py-5">
                  <div className="flex-equal me-5">
                    <table className="table table-flush fw-semibold gy-1">
                      <tbody>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Name
                          </td>
                          <td className="text-gray-800">Emma Smith</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Number
                          </td>
                          <td className="text-gray-800">**** 3266</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Expires
                          </td>
                          <td className="text-gray-800">12/2024</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Type
                          </td>
                          <td className="text-gray-800">
                            Mastercard credit card
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Issuer
                          </td>
                          <td className="text-gray-800">VICBANK</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">ID</td>
                          <td className="text-gray-800">id_4325df90sdf8</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex-equal ">
                    <table className="table table-flush fw-semibold gy-1">
                      <tbody>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Billing address
                          </td>
                          <td className="text-gray-800">AU</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Phone
                          </td>
                          <td className="text-gray-800">No phone provided</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Email
                          </td>
                          <td className="text-gray-800">
                            <a
                              href="#"
                              className="text-gray-900 text-hover-primary"
                            >
                              smith@kpmg.com
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Origin
                          </td>
                          <td className="text-gray-800">
                            Australia{' '}
                            <div className="symbol symbol-20px symbol-circle ms-2">
                              <img
                                src={toAbsoluteUrl('media/flags/australia.svg')}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            CVC check
                          </td>
                          <td className="text-gray-800">
                            Passed{' '}
                            <i className="ki-duotone ki-check-circle fs-2 text-success">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="separator separator-dashed"></div>
            <div className="py-1">
              <div className="py-3 d-flex flex-stack flex-wrap">
                <div
                  className="d-flex align-items-center collapsible toggle collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#kt_create_new_payment_method_2"
                >
                  <div className="btn btn-sm btn-icon btn-active-color-primary ms-n3 me-2">
                    <i className="ki-duotone ki-minus-square toggle-on text-primary fs-2">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                    <i className="ki-duotone ki-plus-square toggle-off fs-2">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </i>{' '}
                  </div>
                  <img
                    src={toAbsoluteUrl('media/svg/card-logos/visa.svg')}
                    className="w-40px me-3"
                    alt=""
                  />
                  <div className="me-3">
                    <div className="d-flex align-items-center fw-bold">
                      Visa{' '}
                    </div>
                    <div className="text-muted">Expires Feb 2022</div>
                  </div>
                </div>
                <div className="d-flex my-3 ms-9">
                  <label className="form-check form-check-custom form-check-solid me-5">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_method"
                    />
                  </label>
                </div>
              </div>
              <div
                id="kt_create_new_payment_method_2"
                className="collapse  fs-6 ps-10"
              >
                <div className="d-flex flex-wrap py-5">
                  <div className="flex-equal me-5">
                    <table className="table table-flush fw-semibold gy-1">
                      <tbody>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Name
                          </td>
                          <td className="text-gray-800">Melody Macy</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Number
                          </td>
                          <td className="text-gray-800">**** 4194</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Expires
                          </td>
                          <td className="text-gray-800">02/2022</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Type
                          </td>
                          <td className="text-gray-800">Visa credit card</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Issuer
                          </td>
                          <td className="text-gray-800">ENBANK</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">ID</td>
                          <td className="text-gray-800">id_w2r84jdy723</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex-equal ">
                    <table className="table table-flush fw-semibold gy-1">
                      <tbody>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Billing address
                          </td>
                          <td className="text-gray-800">UK</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Phone
                          </td>
                          <td className="text-gray-800">No phone provided</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Email
                          </td>
                          <td className="text-gray-800">
                            <a
                              href="#"
                              className="text-gray-900 text-hover-primary"
                            >
                              melody@altbox.com
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Origin
                          </td>
                          <td className="text-gray-800">
                            United Kingdom{' '}
                            <div className="symbol symbol-20px symbol-circle ms-2">
                              <img
                                src={toAbsoluteUrl(
                                  'media/flags/united-kingdom.svg'
                                )}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            CVC check
                          </td>
                          <td className="text-gray-800">
                            Passed{' '}
                            <i className="ki-duotone ki-check fs-2 text-success"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="separator separator-dashed"></div>
            <div className="py-1">
              <div className="py-3 d-flex flex-stack flex-wrap">
                <div
                  className="d-flex align-items-center collapsible toggle collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#kt_create_new_payment_method_3"
                >
                  <div className="btn btn-sm btn-icon btn-active-color-primary ms-n3 me-2">
                    <i className="ki-duotone ki-minus-square toggle-on text-primary fs-2">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                    <i className="ki-duotone ki-plus-square toggle-off fs-2">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </i>{' '}
                  </div>
                  <img
                    src={toAbsoluteUrl(
                      'media/svg/card-logos/american-express.svg'
                    )}
                    className="w-40px me-3"
                    alt=""
                  />
                  <div className="me-3">
                    <div className="d-flex align-items-center fw-bold">
                      American Express{' '}
                      <div className="badge badge-light-danger ms-5">
                        Expired
                      </div>
                    </div>
                    <div className="text-muted">Expires Aug 2021</div>
                  </div>
                </div>
                <div className="d-flex my-3 ms-9">
                  <label className="form-check form-check-custom form-check-solid me-5">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_method"
                    />
                  </label>
                </div>
              </div>
              <div
                id="kt_create_new_payment_method_3"
                className="collapse  fs-6 ps-10"
              >
                <div className="d-flex flex-wrap py-5">
                  <div className="flex-equal me-5">
                    <table className="table table-flush fw-semibold gy-1">
                      <tbody>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Name
                          </td>
                          <td className="text-gray-800">Max Smith</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Number
                          </td>
                          <td className="text-gray-800">**** 7841</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Expires
                          </td>
                          <td className="text-gray-800">08/2021</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Type
                          </td>
                          <td className="text-gray-800">
                            American express credit card
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Issuer
                          </td>
                          <td className="text-gray-800">USABANK</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">ID</td>
                          <td className="text-gray-800">id_89457jcje63</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex-equal ">
                    <table className="table table-flush fw-semibold gy-1">
                      <tbody>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Billing address
                          </td>
                          <td className="text-gray-800">US</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Phone
                          </td>
                          <td className="text-gray-800">No phone provided</td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Email
                          </td>
                          <td className="text-gray-800">
                            <a
                              href="#"
                              className="text-gray-900 text-hover-primary"
                            >
                              max@kt.com
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            Origin
                          </td>
                          <td className="text-gray-800">
                            United States of America{' '}
                            <div className="symbol symbol-20px symbol-circle ms-2">
                              <img
                                src={toAbsoluteUrl(
                                  'media/flags/united-states.svg'
                                )}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted min-w-125px w-125px">
                            CVC check
                          </td>
                          <td className="text-gray-800">
                            Failed{' '}
                            <i className="ki-duotone ki-cross fs-2 text-danger">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddCardModal && (
        <AddNewCardModal closeModal={handleCloseAddCartModal} />
      )}
    </>
  );
};

export default PaymentMethod;
