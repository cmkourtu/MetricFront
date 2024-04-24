import React, { useState, useEffect } from 'react';

import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers';
import AddNewCardModal from './AddNewCardModal';
import {
  getPaymentMethods,
  deletePaymentMethod,
  setCardAsDefault,
} from '../../../modules/apps/core/_appRequests';
import { useAuth } from '../../../modules/auth';
import { PaymentMethodComponentProps } from './subscriptionsModels';
import { getMonthAbbreviation } from '../../../../_metronic/helpers/reportsHelpers';
import ConfirmModal from '../../../../_metronic/partials/modals/ConfirmModal/ConfirmModal';

const PaymentMethod: React.FC<PaymentMethodComponentProps> = ({
  setPaymentMethodData,
  paymentMethodData,
}) => {
  const { auth } = useAuth();
  const token = auth?.accessToken;
  const [showAddCardModal, setShowAddCardModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [paymentMethodId, setPaymentMethodId] = useState<string>('');
  const [updatePaymentMethodTrigger, setUpdatePaymentMethodTrigger] =
    useState<boolean>(false);

  const handleOpenAddCartModal = () => {
    setShowAddCardModal(true);
  };
  const handleCloseAddCartModal = () => {
    setShowAddCardModal(false);
    setUpdatePaymentMethodTrigger(!updatePaymentMethodTrigger);
  };

  const handleOpenConfirmModal = (paymentMethodId: string) => {
    setShowConfirmModal(true);
    setPaymentMethodId(paymentMethodId);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setPaymentMethodId('');
  };

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        if (token) {
          const { data } = await getPaymentMethods(token);

          const defaultPaymentIndex = data.findIndex(
            (paymentMethod) => paymentMethod.isDefault
          );
          if (defaultPaymentIndex !== -1) {
            const defaultPayment = data.splice(defaultPaymentIndex, 1)[0];
            setPaymentMethodData([defaultPayment, ...data]);
          } else {
            setPaymentMethodData(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPaymentMethods();
  }, [updatePaymentMethodTrigger]);

  const handleDeletePaymentMethod = async () => {
    try {
      if (token && paymentMethodId) {
        await deletePaymentMethod(token, paymentMethodId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleCloseConfirmModal();
      setUpdatePaymentMethodTrigger(!updatePaymentMethodTrigger);
    }
  };

  const chooseDefaultCard = async (paymentMethodId: string) => {
    try {
      if (token) {
        await setCardAsDefault(token, paymentMethodId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatePaymentMethodTrigger(!updatePaymentMethodTrigger);
    }
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
              className="btn btn-sm btn-primary fw-bold"
              onClick={handleOpenAddCartModal}
            >
              New Method
            </button>
          </div>
        </div>
        {paymentMethodData?.length > 0 &&
          paymentMethodData?.map((paymentCard, index) => (
            <div className="card-body pt-0" key={paymentCard?.id}>
              <div id="kt_create_new_payment_method">
                <div className="py-1">
                  <div className="py-3 d-flex flex-stack flex-wrap">
                    <div
                      className={`d-flex align-items-center collapsible toggle ${!paymentCard?.isDefault && 'collapsed'}`}
                      data-bs-toggle="collapse"
                      data-bs-target={`#kt_create_new_payment_method_${index + 1}`}
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
                      {paymentCard?.card?.brand === 'mastercard' && (
                        <img
                          src={toAbsoluteUrl(
                            'media/svg/card-logos/mastercard.svg'
                          )}
                          className="w-40px me-3"
                          alt=""
                        />
                      )}
                      {paymentCard?.card?.brand === 'visa' && (
                        <img
                          src={toAbsoluteUrl('media/svg/card-logos/visa.svg')}
                          className="w-40px me-3"
                          alt=""
                        />
                      )}
                      {paymentCard?.card?.brand === 'american-express' && (
                        <img
                          src={toAbsoluteUrl(
                            'media/svg/card-logos/american-express.svg'
                          )}
                          className="w-40px me-3"
                          alt=""
                        />
                      )}
                      <div className="me-3">
                        <div className="d-flex align-items-center fw-bold">
                          {paymentCard?.card?.brand
                            ? paymentCard.card.brand.toUpperCase()
                            : ''}
                          {paymentCard?.isDefault && (
                            <div className="badge badge-light-primary ms-5">
                              Primary
                            </div>
                          )}
                        </div>
                        <div className="text-muted">
                          Expires{' '}
                          {paymentCard?.card?.exp_month
                            ? getMonthAbbreviation(paymentCard?.card?.exp_month)
                            : ''}{' '}
                          {paymentCard?.card?.exp_year}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex my-3 ms-2">
                      {paymentCard?.isDefault ? (
                        <div className="btn btn-sm bg-success text-white fw-bold me-2">
                          {` Default card `}
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm btn-primary fw-bold me-2"
                          onClick={() => chooseDefaultCard(paymentCard?.id)}
                        >
                          Set as default
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-icon btn-active-color-danger me-2"
                        onClick={() => handleOpenConfirmModal(paymentCard?.id)}
                      >
                        <KTIcon iconName="trash" className="fs-2x" />
                      </button>
                    </div>
                  </div>
                  <div
                    id={`kt_create_new_payment_method_${index + 1}`}
                    className={`${paymentCard?.isDefault && 'show fs-6 ps-10'} collapse`}
                  >
                    <div className="d-flex flex-wrap py-5">
                      <div className="flex-equal me-5">
                        <table className="table table-flush fw-semibold gy-1">
                          <tbody>
                            <tr>
                              <td className="text-muted min-w-125px w-125px">
                                Name
                              </td>
                              <td className="text-gray-800">
                                {paymentCard?.billing_details?.name
                                  ? paymentCard?.billing_details?.name
                                  : '---'}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-muted min-w-125px w-125px">
                                Number
                              </td>
                              <td className="text-gray-800">
                                {paymentCard?.card?.last4
                                  ? '****' + paymentCard?.card?.last4
                                  : '---'}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-muted min-w-125px w-125px">
                                Expires
                              </td>
                              <td className="text-gray-800">
                                {paymentCard?.card?.exp_month
                                  ? paymentCard?.card?.exp_month
                                  : '---'}
                                /
                                {paymentCard?.card?.exp_year
                                  ? paymentCard?.card?.exp_year
                                  : '---'}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-muted min-w-125px w-125px">
                                Type
                              </td>
                              <td className="text-gray-800">
                                {paymentCard?.card?.brand
                                  ? paymentCard.card.brand.toUpperCase()
                                  : ''}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-muted min-w-125px w-125px">
                                CVC check
                              </td>
                              <td>
                                <div className="d-flex flex-row align-items-center justify-content-start">
                                  <span className="text-gray-800 me-2">
                                    {' '}
                                    Passed{' '}
                                  </span>
                                  <i className="ki-duotone ki-check-circle fs-2 text-success">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                  </i>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/*<div className="flex-equal ">
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
                              <td className="text-gray-800">
                                No phone provided
                              </td>
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
                                    src={toAbsoluteUrl(
                                      'media/flags/australia.svg'
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
                                <i className="ki-duotone ki-check-circle fs-2 text-success">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {showAddCardModal && (
        <AddNewCardModal closeModal={handleCloseAddCartModal} />
      )}
      {showConfirmModal && (
        <ConfirmModal
          confirmQuestion="Are you sure you want to delete this card?"
          yesButtonAction={handleDeletePaymentMethod}
          closeConfirmModal={handleCloseConfirmModal}
        />
      )}
    </>
  );
};

export default PaymentMethod;
