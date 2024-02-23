import { Link } from 'react-router-dom';
import { useAuth } from '../../auth';

export function Overview() {
  const { currentUser } = useAuth();
  return (
    <>
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Profile Details</h3>
          </div>

          <Link to="/crafted/account/settings" className="btn btn-primary align-self-center">
            Edit Profile
          </Link>
        </div>

        <div className="card-body p-9">
          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Full Name</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-gray-900">
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Company</label>

            <div className="col-lg-8 fv-row">
              <span className="fw-bold fs-6">{currentUser?.companyName}</span>
            </div>
          </div>

          {/*<div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Job Title</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-gray-900">{currentUser?.jobTitle}</span>
            </div>
  </div>*/}

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Email</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-gray-900">{currentUser?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
