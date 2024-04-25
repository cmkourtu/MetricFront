import React, { useState } from 'react';
import { KTIcon } from '../../../../_metronic/helpers';
import { CreateReportModal } from '../../reports/components';

const HomeHeader: React.FC = () => {
  const [openCreateReportModal, setOpenCreateReportModal] = useState(false);
  const handleCloseCreateReportMotal = () => {
    setOpenCreateReportModal(false);
  };

  const handleOpenCreateReportMotal = () => {
    setOpenCreateReportModal(true);
  };

  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row mb-8">
          <h1>Home</h1>
        </div>
        <div className="row g-5 g-xl-8">
          <div className="col-xl-4">
            <div
              className="card bgi-no-repeat bgi-position-y-top bgi-position-x-end statistics-widget-1 card-xl-stretch mb-xl-8 bg-light-info text-hover-info cursor-pointer"
              onClick={handleOpenCreateReportMotal}
            >
              <div className="card-body">
                <div className="d-flex flex-row align-items-center justify-content-start">
                  <div className="me-8">
                    <KTIcon iconName="plus-circle" className="fs-1" />
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-start">
                    <span className="pb-1 fw-semibold fs-4 text-gray-800">
                      Create new report
                    </span>
                    <span className="fw-semibold fs-8 text-gray-600  text-start">
                      Build a report and grab insights into your creative
                      performance
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card bgi-no-repeat bgi-position-y-top bgi-position-x-end statistics-widget-1 card-xl-stretch mb-xl-8 bg-light-info ">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center justify-content-start">
                  <div className="me-8">
                    <KTIcon iconName="plus-circle" className="fs-1" />
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-start">
                    <span className="pb-1 fw-semibold fs-4 text-gray-300">
                      Invite team members
                    </span>
                    <span className="fw-semibold fs-8 text-gray-300 text-start">
                      Collaborate with your team members and build better
                      reports together
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card bgi-no-repeat bgi-position-y-top bgi-position-x-end statistics-widget-1 card-xl-stretch mb-xl-8 bg-light-info ">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center justify-content-start">
                  <div className="me-8">
                    <KTIcon iconName="plus-circle" className="fs-1" />
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-start">
                    <span className="pb-1 fw-semibold fs-4 text-gray-300">
                      Book a call with a Motion expert
                    </span>
                    <span className="fw-semibold fs-8 text-gray-300 text-start">
                      Improve your creative strategy skills with a personalized
                      call with a Motion expert
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openCreateReportModal && (
        <CreateReportModal
          closeCreateReportModal={handleCloseCreateReportMotal}
          isUpdate={false}
        />
      )}
    </>
  );
};

export default HomeHeader;
