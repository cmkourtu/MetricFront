import { useEffect } from 'react';
import { UserEditModalHeader } from './UserEditModalHeader';
import { UserEditModalFormWrapper } from './UserEditModalFormWrapper';
import { KTIcon } from '../../../../../../_metronic/helpers';

interface UserEditModalProps {
  setIsEditUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ setIsEditUserModalOpen }) => {
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleCloseEditProfileModal = () => {
    setIsEditUserModalOpen(false);
  };
  return (
    <>
      <div
        className="modal fade show d-block"
        id="kt_modal_add_user"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
      >
        {/* begin::Modal dialog */}
        <div className="modal-dialog modal-dialog-centered mw-650px">
          {/* begin::Modal content */}
          <div className="modal-content">
            <div className="modal-header">
              {/* begin::Modal title */}
              <h2 className="fw-bolder">Edit Profile</h2>
              {/* end::Modal title */}

              {/* begin::Close */}
              <div
                className="btn btn-icon btn-sm btn-active-icon-primary"
                data-kt-users-modal-action="close"
                onClick={handleCloseEditProfileModal}
                style={{ cursor: 'pointer' }}
              >
                <KTIcon iconName="cross" className="fs-1" />
              </div>
              {/* end::Close */}
            </div>
            {/* begin::Modal body */}
            <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
              <UserEditModalFormWrapper />
            </div>
            {/* end::Modal body */}
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}
      <div className="modal-backdrop fade show"></div>
      {/* end::Modal Backdrop */}
    </>
  );
};

export { UserEditModal };
