import { useState, FC } from 'react';
import { isNotEmpty, toAbsoluteUrl } from '../../../../../../_metronic/helpers';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from '../../../../auth';
import { UserByIdProps } from '../../../../auth/core/_models';
import { updateUserById } from '../../../../auth/core/_requests';

const editUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  firstName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  lastName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
});

const ProfileDetails: FC = () => {
  const { currentUser, setCurrentUser, auth } = useAuth();

  const [userForEdit] = useState<UserByIdProps>({
    id: currentUser?.id || '',
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    companyName: currentUser?.companyName || '',
    //jobTitle: currentUser?.jobTitle || '',
    email: currentUser?.email || '',
  });

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const jwtToken = auth?.accessToken;
        if (isNotEmpty(values.id) && jwtToken) {
          const { data } = await updateUserById(values?.id, jwtToken, values);
          if (data) {
            setCurrentUser(data);
          }
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="card mb-5 mb-xl-10">
      <div
        className="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_profile_details"
        aria-expanded="true"
        aria-controls="kt_account_profile_details"
      >
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Profile Details</h3>
        </div>
      </div>

      <div id="kt_account_profile_details" className="collapse show">
        <form onSubmit={formik.handleSubmit} noValidate className="form">
          <div className="card-body border-top p-9">
            <div className="row mb-6">
              <label className="col-lg-4 col-form-label fw-bold fs-6">Avatar</label>
              <div className="col-lg-8">
                <div
                  className="image-input image-input-outline"
                  data-kt-image-input="true"
                  style={{ backgroundImage: `url(${toAbsoluteUrl('media/avatars/blank.png')})` }}
                >
                  <div
                    className="image-input-wrapper w-125px h-125px"
                    style={{ backgroundImage: `url(${toAbsoluteUrl('media/avatars/blank.png')})` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">Full Name</label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-6 fv-row">
                    <input
                      type="text"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="First name"
                      {...formik.getFieldProps('firstName')}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.firstName}</div>
                      </div>
                    )}
                  </div>

                  <div className="col-lg-6 fv-row">
                    <input
                      type="text"
                      className="form-control form-control-lg form-control-solid"
                      placeholder="Last name"
                      {...formik.getFieldProps('lastName')}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.lastName}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label  fw-bold fs-6">Company</label>

              <div className="col-lg-8 fv-row">
                <input
                  type="text"
                  className="form-control form-control-lg form-control-solid"
                  placeholder="Company name"
                  {...formik.getFieldProps('companyName')}
                />
              </div>
            </div>

            {/*<div className="row mb-6">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                <span>Job title</span>
              </label>

              <div className="col-lg-8 fv-row">
                <input
                  type="text"
                  className="form-control form-control-lg form-control-solid"
                  placeholder="Job Title"
                  {...formik.getFieldProps('jobTitle')}
                />
              </div>
            </div>*/}

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                <span className="required">Email</span>
              </label>
              <div className="col-lg-8 fv-row">
                <input
                  type="email"
                  className="form-control form-control-lg form-control-solid"
                  placeholder="Email"
                  {...formik.getFieldProps('email')}
                />

                {formik.touched.email && formik.errors.email && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.email}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-end py-6 px-9">
            <button
              type="submit"
              className="btn btn-primary fw-bold"
              data-kt-users-modal-action="submit"
              disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
            >
              <span className="indicator-label">Submit</span>
              {formik.isSubmitting && (
                <span className="indicator-progress">
                  Please wait...{' '}
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { ProfileDetails };
