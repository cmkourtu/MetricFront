import { FC, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { isNotEmpty, toAbsoluteUrl } from '../../../../../../_metronic/helpers';
import { User } from '../core/_models';
import clsx from 'clsx';
import { useListView } from '../core/ListViewProvider';
import { UsersListLoading } from '../components/loading/UsersListLoading';
import { createUser, updateUser } from '../core/_requests';
import { useQueryResponse } from '../core/QueryResponseProvider';
import { useAuth } from '../../../../auth';

type Props = {
  isUserLoading: boolean;
  user: User;
};

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

const UserEditModalForm: FC<Props> = ({ user, isUserLoading }) => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();
  const { currentUser, setCurrentUser } = useAuth();

  const [userForEdit] = useState<User>({
    ...user,
    id: currentUser?.id || '',
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    companyName: currentUser?.companyName || '',
    jobTitle: currentUser?.jobTitle || '',
    email: currentUser?.email || '',
  });

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
  };

  const blankImg = toAbsoluteUrl('media/svg/avatars/blank.svg');
  const userAvatarImg = toAbsoluteUrl(`media/avatars/blank.png`);

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(true);
      try {
        if (isNotEmpty(values.id)) {
          await updateUser(values);
        } else {
          await createUser(values);
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setSubmitting(true);
        cancel(true);
      }
    },
  });

  return (
    <>
      <form id="kt_modal_add_user_form" className="form" onSubmit={formik.handleSubmit} noValidate>
        <div
          className="d-flex flex-column scroll-y me-n7 pe-7"
          id="kt_modal_add_user_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_add_user_header"
          data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
          data-kt-scroll-offset="300px"
        >
          <div className="fv-row mb-7">
            <label className="d-block fw-bold fs-6 mb-5">Avatar</label>
            <div
              className="image-input image-input-outline"
              data-kt-image-input="true"
              style={{ backgroundImage: `url('${blankImg}')` }}
            >
              <div
                className="image-input-wrapper w-125px h-125px"
                style={{ backgroundImage: `url('${userAvatarImg}')` }}
              ></div>
            </div>
          </div>
          <div className="fv-row mb-7">
            <label className="required fw-bold fs-6 mb-2">First Name</label>
            <input
              placeholder="First name"
              {...formik.getFieldProps('firstName')}
              type="text"
              name="firstName"
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.firstName && formik.errors.firstName },
                {
                  'is-valid': formik.touched.firstName && !formik.errors.firstName,
                },
              )}
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.firstName}</span>
                </div>
              </div>
            )}
          </div>

          <div className="fv-row mb-7">
            <label className="required fw-bold fs-6 mb-2">Last Name</label>
            <input
              placeholder="Last name"
              {...formik.getFieldProps('lastName')}
              type="text"
              name="lastName"
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.lastName && formik.errors.lastName },
                {
                  'is-valid': formik.touched.lastName && !formik.errors.lastName,
                },
              )}
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.lastName}</span>
                </div>
              </div>
            )}
          </div>

          <div className="fv-row mb-7">
            <label className="fw-bold fs-6 mb-2">Company</label>
            <input
              placeholder="Company"
              {...formik.getFieldProps('company')}
              type="text"
              name="company"
              className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
          </div>

          <div className="fv-row mb-7">
            <label className="fw-bold fs-6 mb-2">Job Title</label>
            <input
              placeholder="Job Title"
              {...formik.getFieldProps('jobTitle')}
              type="text"
              name="jobTitle"
              className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
          </div>

          <div className="fv-row mb-7">
            <label className="required fw-bold fs-6 mb-2">Email</label>
            <input
              placeholder="Email"
              {...formik.getFieldProps('email')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.email && formik.errors.email },
                {
                  'is-valid': formik.touched.email && !formik.errors.email,
                },
              )}
              type="email"
              name="email"
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.email}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={() => cancel()}
            className="btn btn-light me-3"
            data-kt-users-modal-action="cancel"
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            data-kt-users-modal-action="submit"
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className="indicator-label">Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className="indicator-progress">
                Please wait...{' '}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  );
};

export { UserEditModalForm };
