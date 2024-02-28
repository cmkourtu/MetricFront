import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { resetPassword } from '../core/_requests';

const initialValues = {
  password: '',
};

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('password is required'),
});

export function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const [token, setToken] = useState<string>('');
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      const tokenWithoutPrefix = token.replace('token=', '');
      setToken(tokenWithoutPrefix);
    }
  }, [location]);

  const formik = useFormik({
    initialValues,
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setHasErrors(undefined);
      try {
        const { data } = await resetPassword(token, values.password);
        console.log(data);
        if (data) {
          setTimeout(() => {
            navigate('/auth');
          }, 2000);
        }
        setHasErrors(false);
        setLoading(false);
      } catch (error) {
        setHasErrors(true);
        setLoading(false);
        setSubmitting(false);
        setStatus('The login detail is incorrect');
      }
    },
  });

  return (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_password_reset_form"
      onSubmit={formik.handleSubmit}
    >
      <div className="text-center mb-10">
        {/* begin::Title */}
        <h1 className="text-gray-900 fw-bolder mb-3">Enter new password.</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className="text-gray-500 fw-semibold fs-6">Enter new password to reset.</div>
        {/* end::Link */}
      </div>

      {/* begin::Title */}
      {hasErrors === true && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">
            Sorry, looks like there are some errors detected, please try again.
          </div>
        </div>
      )}

      {hasErrors === false && (
        <div className="mb-10 bg-light-info p-8 rounded">
          <div className="text-info">Password successfully changed.</div>
        </div>
      )}
      {/* end::Title */}

      {/* begin::Form group */}
      <div className="fv-row mb-8">
        {/*<label className="form-label fw-bolder text-gray-900 fs-6">New password</label>*/}
        <input
          type="password"
          placeholder=""
          autoComplete="off"
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            { 'is-invalid': formik.touched.password && formik.errors.password },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            },
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="submit"
          id="kt_password_reset_submit"
          className="btn btn-primary me-4"
          disabled={formik.isSubmitting || !!formik.errors.password || !formik.values.password}
        >
          <span className="indicator-label">Submit</span>
          {loading && (
            <span className="indicator-progress">
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
        <Link to="/auth/login">
          <button
            type="button"
            id="kt_login_password_reset_form_cancel_button"
            className="btn btn-light"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Cancel
          </button>
        </Link>{' '}
      </div>
      {/* end::Form group */}
    </form>
  );
}
