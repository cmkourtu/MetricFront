import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import moment from 'moment';

import { toAbsoluteUrl } from '../../../../_metronic/helpers';
import { addPaymentMethod } from '../../../modules/apps/core/_appRequests';
import { useAuth } from '../../../modules/auth';

interface AddNewCardModalProps {
  closeModal: () => void;
}

const AddNewCardModal: React.FC<AddNewCardModalProps> = ({ closeModal }) => {
  const { auth, currentUser } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isCardDefault, setIsCardDefault] = useState(true);
  const currentYear = moment().year();
  const futureYears = 6;
  const token = auth?.accessToken;
  const userId = currentUser?.id;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(undefined);

    if (!stripe || !elements) {
      setError('Stripe.js has not loaded yet.');
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (paymentMethod) {
      try {
        if (token && userId) {
          await addPaymentMethod(
            token,
            userId,
            paymentMethod.card?.last4 || '',
            paymentMethod.id || '',
            typeof paymentMethod.card?.exp_month === 'number'
              ? paymentMethod.card?.exp_month
              : 0,
            typeof paymentMethod.card?.exp_year === 'number'
              ? paymentMethod.card?.exp_year
              : 0,
            isCardDefault
          );
        }
      } catch (error) {
        setError('Failed to add payment method. Please try again.');
      } finally {
        closeModal();
      }
    }

    setLoading(false);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCardDefault(event.target.checked);
  };

  return (
    <>
      <div
        className="modal fade show"
        id="kt_modal_new_target"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        style={{ display: 'block', paddingLeft: '0px' }}
      >
        <div
          className="modal-dialog modal-dialog-centered mw-650px"
          data-select2-id="select2-data-128-rm13"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Card</h2>
              <div
                className="btn btn-sm btn-icon btn-active-color-primary"
                onClick={closeModal}
              >
                <i className="ki-duotone ki-cross fs-1">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>{' '}
              </div>
            </div>
            <div
              className="modal-body scroll-y mx-5 mx-xl-15 my-7"
              data-select2-id="select2-data-127-hp8u"
            >
              <form
                id="kt_modal_new_card_form"
                className="form fv-plugins-bootstrap5 fv-plugins-framework"
                action="#"
                data-select2-id="select2-data-kt_modal_new_card_form"
                onSubmit={handleSubmit}
              >
                <div className="d-flex flex-column mb-7 fv-row fv-plugins-icon-container">
                  <label className="d-flex align-items-center fs-6 fw-semibold form-label mb-2">
                    <span className="">Name On Card</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder=""
                    name="card_name"
                  />
                  <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                </div>
                <div className="d-flex flex-column mb-7 fv-row fv-plugins-icon-container">
                  <label className="required fs-6 fw-semibold form-label mb-2">
                    Card Number
                  </label>
                  <CardElement
                    className="form-control form-control-solid mb-10"
                    options={{
                      style: { base: { fontSize: '14px' } },
                      hidePostalCode: true,
                    }}
                  />
                  <label className="form-check form-switch form-check-custom form-check-solid cursor-pointer">
                    <input
                      className="form-check-input me-4"
                      type="checkbox"
                      value="1"
                      checked={isCardDefault}
                      onChange={handleCheckboxChange}
                    />
                    <span className="fs-6 fw-semibold">
                      Set card as default
                    </span>
                  </label>
                  {/*<div className="position-relative">
                    <input
                      type="text"
                      className="form-control form-control-solid"
                      placeholder="Enter card number"
                      name="card_number"
                    />
                    <div className="position-absolute translate-middle-y top-50 end-0 me-5">
                      <img
                        src={toAbsoluteUrl('media/svg/card-logos/visa.svg')}
                        alt=""
                        className="h-25px"
                      />
                      <img
                        src={toAbsoluteUrl(
                          'media/svg/card-logos/mastercard.svg'
                        )}
                        alt=""
                        className="h-25px"
                      />
                      <img
                        src={toAbsoluteUrl(
                          'media/svg/card-logos/american-express.svg'
                        )}
                        alt=""
                        className="h-25px"
                      />
                    </div>
                  </div>
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>*/}
                </div>
                {/*<div
                  className="row mb-10"
                  data-select2-id="select2-data-126-ixef"
                >
                  <div
                    className="col-md-8 fv-row"
                    data-select2-id="select2-data-125-48ja"
                  >
                    <label className="required fs-6 fw-semibold form-label mb-2">
                      Expiration Date
                    </label>
                    <div className="row fv-row fv-plugins-icon-container">
                      <div
                        className="col-6"
                        data-select2-id="select2-data-142-asfc"
                      >
                        <select
                          name="card_expiry_month"
                          className="form-select form-select-solid select2-hidden-accessible"
                          data-control="select2"
                          data-hide-search="true"
                          data-placeholder="Month"
                          data-select2-id="select2-data-9-pove"
                          aria-hidden="true"
                          data-kt-initialized="1"
                        >
                          {[...Array(12).keys()].map((month) => (
                            <option
                              key={month + 1}
                              value={month + 1}
                              data-select2-id={`select2-data-${month + 143}-syn9`}
                            >
                              {month + 1}
                            </option>
                          ))}
                        </select>
                        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                      </div>
                      <div
                        className="col-6"
                        data-select2-id="select2-data-124-xf1a"
                      >
                        <select
                          name="card_expiry_year"
                          className="form-select form-select-solid select2-hidden-accessible"
                          data-control="select2"
                          data-hide-search="true"
                          data-placeholder="Year"
                          data-select2-id="select2-data-12-hkb6"
                          aria-hidden="true"
                          data-kt-initialized="1"
                        >
                          {[...Array(futureYears).keys()].map((index) => (
                            <option
                              key={currentYear + index}
                              value={currentYear + index}
                              data-select2-id={`select2-data-${currentYear + index}-nx5f`}
                            >
                              {currentYear + index}
                            </option>
                          ))}
                        </select>
                        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 fv-row fv-plugins-icon-container">
                    <label className="d-flex align-items-center fs-6 fw-semibold form-label mb-2">
                      <span className="required">CVV</span>
                      <span
                        className="ms-1"
                        data-bs-toggle="tooltip"
                        aria-label="Enter a card CVV code"
                        data-bs-original-title="Enter a card CVV code"
                        data-kt-initialized="1"
                      >
                        <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                          <span className="path1"></span>
                          <span className="path2"></span>
                          <span className="path3"></span>
                        </i>
                      </span>{' '}
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        minlength={3} maxlength="4" placeholder="CVV"
                        name="card_cvv"
                      />
                      <div className="position-absolute translate-middle-y top-50 end-0 me-3">
                        <i className="ki-duotone ki-credit-cart fs-2hx">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>{' '}
                      </div>
                    </div>
                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                  </div>
                        </div>*/}
                <div className="text-center pt-15">
                  <button
                    className="btn btn-light fw-bold me-4"
                    onClick={closeModal}
                  >
                    Discard
                  </button>
                  <button className="btn btn-primary fw-bold">
                    <span className="indicator-label">Submit</span>
                    <span className="indicator-progress">
                      Please wait...{' '}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default AddNewCardModal;
