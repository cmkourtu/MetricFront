import React, { useState } from 'react';

import { ReportsProps } from '../../../modules/apps/core/_appModels';
import { CreateReportModal } from '.';
import { KTIcon } from '../../../../_metronic/helpers';
import ConfirmModal from '../../../../_metronic/partials/modals/ConfirmModal/ConfirmModal';
import { usePageData } from '../../../../_metronic/layout/core';
import { useNavigate } from 'react-router-dom';
import { deleteReport } from '../../../modules/apps/core/_appRequests';

interface ReportsHeaderProps {
  reportById: ReportsProps;
}

const ReportsHeader: React.FC<ReportsHeaderProps> = ({ reportById }) => {
  const navigate = useNavigate();
  const { updateReportsTrigger, setUpdateReportsTrigger } = usePageData();

  const [showCreateReportModal, setShowCreateReportModal] =
    useState<boolean>(false);

  const [showDeleteReportModal, setShowDeleteReportModal] =
    useState<boolean>(false);

  const openCreateReportModal = () => {
    setShowCreateReportModal(true);
  };

  const closeCreateReportModal = () => {
    setShowCreateReportModal(false);
  };

  const openDeleteReportModal = () => {
    setShowDeleteReportModal(true);
  };

  const closeDeleteReportModal = () => {
    setShowDeleteReportModal(false);
  };

  const handleDeleteReport = async () => {
    const reportId = reportById?.id;
    if (reportId) {
      const response = await deleteReport(reportId);
      if (response) {
        setUpdateReportsTrigger(!updateReportsTrigger);
        navigate('/dashboard');
        closeDeleteReportModal();
      }
    }
  };

  return (
    <>
      <div className="d-flex fv-rowrow align-items-center justify-content-between cursor-pointer mb-6">
        <h1>{reportById?.name}</h1>
        <div>
          <a href="#" className="btn btn-sm btn-flex btn-light fw-bold me-4">
            Filter
          </a>
          <a
            href="#"
            className="btn btn-sm fw-bold btn-primary me-4"
            onClick={openCreateReportModal}
          >
            Edit
          </a>
          <a
            href="#"
            className="btn btn-sm btn-icon btn-active-color-danger "
            onClick={openDeleteReportModal}
          >
            <KTIcon iconName="trash" className="fs-2x" />
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
      {showDeleteReportModal && (
        <ConfirmModal
          confirmQuestion="Are you sure you want to delete this report?"
          yesButtonAction={handleDeleteReport}
          closeConfirmModal={closeDeleteReportModal}
        />
      )}
    </>
  );
};

export default ReportsHeader;
