import React, { useState } from 'react';

import { ReportsProps } from '../../../modules/apps/core/_appModels';
import { CreateReportModal } from '.';

interface ReportsHeaderProps {
  reportById: ReportsProps;
}

const ReportsHeader: React.FC<ReportsHeaderProps> = ({ reportById }) => {
  const [showCreateReportModal, setShowCreateReportModal] =
    useState<boolean>(false);

  const openCreateReportModal = () => {
    setShowCreateReportModal(true);
  };

  const closeCreateReportModal = () => {
    setShowCreateReportModal(false);
  };

  return (
    <>
      <div className="d-flex fv-rowrow align-items-center justify-content-between cursor-pointer mb-6">
        <h1>{reportById?.name}</h1>
        <div>
          <a href="#" className="btn btn-sm btn-flex btn-light fw-bold">
            Filter
          </a>
          <a
            href="#"
            className="btn btn-sm fw-bold btn-primary"
            onClick={openCreateReportModal}
          >
            Edit
          </a>
        </div>
      </div>
      {showCreateReportModal && (
        <CreateReportModal
          closeCreateReportModal={closeCreateReportModal}
          isUpdate={true}
          reportId={reportById?.id}
          previousTitle={reportById?.name}
          previousDescription={reportById?.description}
        />
      )}
    </>
  );
};

export default ReportsHeader;
