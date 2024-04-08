import React from 'react';

interface ConfirmModalProps {
  closeConfirmModal: () => void;
  yesButtonAction: () => void;
  confirmQuestion: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  closeConfirmModal,
  yesButtonAction,
  confirmQuestion,
}) => {
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
        <div className="modal-dialog modal-dialog-centered mw-350px">
          <div className="modal-content rounded">
            <div className="modal-header pb-0 border-0 justify-content-end">
              <div
                className="btn btn-sm btn-icon btn-active-color-primary"
                data-bs-dismiss="modal"
                onClick={closeConfirmModal}
              >
                <i className="ki-duotone ki-cross fs-1">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </div>
            </div>
            <div className="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
              <form
                id="kt_modal_new_target_form"
                className="form fv-plugins-bootstrap5 fv-plugins-framework"
                action="#"
              >
                <div className="mb-13 text-center">
                  <h1 className="mb-3">{confirmQuestion}</h1>
                </div>

                <div className="text-center ">
                  <button
                    type="reset"
                    id="kt_modal_new_target_cancel"
                    className="btn btn-light me-20"
                    onClick={yesButtonAction}
                  >
                    Yes
                  </button>
                  <button
                    id="kt_modal_new_target_submit"
                    className="btn btn-primary"
                    onClick={closeConfirmModal}
                  >
                    <span className="indicator-label">No</span>
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

export default ConfirmModal;
