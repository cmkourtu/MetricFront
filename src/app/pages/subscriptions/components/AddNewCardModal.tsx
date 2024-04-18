import React from 'react';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';

interface AddNewCardModalProps {
  closeModal: () => void;
}

const AddNewCardModal: React.FC<AddNewCardModalProps> = ({ closeModal }) => {
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
              >
                <div className="d-flex flex-column mb-7 fv-row fv-plugins-icon-container">
                  <label className="d-flex align-items-center fs-6 fw-semibold form-label mb-2">
                    <span className="required">Name On Card</span>
                    <span
                      className="ms-1"
                      data-bs-toggle="tooltip"
                      aria-label="Specify a card holder's name"
                      data-bs-original-title="Specify a card holder's name"
                      data-kt-initialized="1"
                    >
                      <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                      </i>
                    </span>{' '}
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder=""
                    name="card_name"
                    value="Max Doe"
                  />
                  <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                </div>
                <div className="d-flex flex-column mb-7 fv-row fv-plugins-icon-container">
                  <label className="required fs-6 fw-semibold form-label mb-2">
                    Card Number
                  </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control form-control-solid"
                      placeholder="Enter card number"
                      name="card_number"
                      value="4111 1111 1111 1111"
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
                  <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                </div>
                <div
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
                          /*tabindex="-1"*/ aria-hidden="true"
                          data-kt-initialized="1"
                        >
                          <option value="" disabled selected>
                            Month
                          </option>
                          <option
                            value="1"
                            data-select2-id="select2-data-143-syn9"
                          >
                            1
                          </option>
                          <option
                            value="2"
                            data-select2-id="select2-data-144-waak"
                          >
                            2
                          </option>
                          <option
                            value="3"
                            data-select2-id="select2-data-145-mzfs"
                          >
                            3
                          </option>
                          <option
                            value="4"
                            data-select2-id="select2-data-146-2kna"
                          >
                            4
                          </option>
                          <option
                            value="5"
                            data-select2-id="select2-data-147-phaf"
                          >
                            5
                          </option>
                          <option
                            value="6"
                            data-select2-id="select2-data-148-2uf1"
                          >
                            6
                          </option>
                          <option
                            value="7"
                            data-select2-id="select2-data-149-5sws"
                          >
                            7
                          </option>
                          <option
                            value="8"
                            data-select2-id="select2-data-150-jcpe"
                          >
                            8
                          </option>
                          <option
                            value="9"
                            data-select2-id="select2-data-151-7czh"
                          >
                            9
                          </option>
                          <option
                            value="10"
                            data-select2-id="select2-data-152-ulaz"
                          >
                            10
                          </option>
                          <option
                            value="11"
                            data-select2-id="select2-data-153-87yn"
                          >
                            11
                          </option>
                          <option
                            value="12"
                            data-select2-id="select2-data-154-ekgu"
                          >
                            12
                          </option>
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
                          /*tabindex="-1"*/ aria-hidden="true"
                          data-kt-initialized="1"
                        >
                          <option value="" disabled selected>
                            Year
                          </option>
                          <option
                            value="2024"
                            data-select2-id="select2-data-130-nx5f"
                          >
                            2024
                          </option>
                          <option
                            value="2025"
                            data-select2-id="select2-data-131-h6z0"
                          >
                            2025
                          </option>
                          <option
                            value="2026"
                            data-select2-id="select2-data-132-0t90"
                          >
                            2026
                          </option>
                          <option
                            value="2027"
                            data-select2-id="select2-data-133-8nib"
                          >
                            2027
                          </option>
                          <option
                            value="2028"
                            data-select2-id="select2-data-134-uwda"
                          >
                            2028
                          </option>
                          <option
                            value="2029"
                            data-select2-id="select2-data-135-9mqv"
                          >
                            2029
                          </option>
                          <option
                            value="2030"
                            data-select2-id="select2-data-136-2lzd"
                          >
                            2030
                          </option>
                          <option
                            value="2031"
                            data-select2-id="select2-data-137-sr6t"
                          >
                            2031
                          </option>
                          <option
                            value="2032"
                            data-select2-id="select2-data-138-tvaj"
                          >
                            2032
                          </option>
                          <option
                            value="2033"
                            data-select2-id="select2-data-139-7sic"
                          >
                            2033
                          </option>
                          <option
                            value="2034"
                            data-select2-id="select2-data-140-qm8b"
                          >
                            2034
                          </option>
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
                        /*minlength={3} maxlength="4"*/ placeholder="CVV"
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
                </div>
                <div className="d-flex flex-stack">
                  <div className="me-5">
                    <label className="fs-6 fw-semibold form-label">
                      Save Card for further billing?
                    </label>
                    <div className="fs-7 fw-semibold text-muted">
                      If you need more info, please check budget planning
                    </div>
                  </div>
                  <label className="form-check form-switch form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="1" /*checked="checked"*/
                    />
                    <span className="form-check-label fw-semibold text-muted">
                      Save Card
                    </span>
                  </label>
                </div>
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
