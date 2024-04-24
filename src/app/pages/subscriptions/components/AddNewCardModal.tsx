import React, { useState, memo } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { addPaymentMethod } from '../../../modules/apps/core/_appRequests';
import { useAuth } from '../../../modules/auth';
import ErrorModal from '../../../../_metronic/partials/modals/ErrorModal/ErrorModal';
import { AddNewCardModalProps } from './subscriptionsModels';

const AddNewCardModal: React.FC<AddNewCardModalProps> = ({ closeModal }) => {
  const { auth, currentUser } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [errorText, setErrorText] = useState<string | undefined>('');
  const [cardName, setCardName] = useState('');
  const [isCardDefault, setIsCardDefault] = useState(true);
  const token = auth?.accessToken;
  const userId = currentUser?.id;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorText('');

    if (!stripe || !elements) {
      setErrorText('Stripe.js has not loaded yet.');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!,
    });

    if (error) {
      setErrorText(error.message);
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
            isCardDefault,
            cardName
          );
        }
      } catch (error) {
        setErrorText('Failed to add payment method. Please try again later.');
        return;
      }
    }
    closeModal();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCardDefault(event.target.checked);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(event.target.value);
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
                    onChange={handleInputChange}
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
                </div>
                <div className="text-center pt-15">
                  <button
                    className="btn btn-light fw-bold me-8"
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
      {errorText && (
        <ErrorModal errorModalText={errorText} setErrorText={setErrorText} />
      )}
    </>
  );
};

export default memo(AddNewCardModal);
