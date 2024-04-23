import React, { useState, useEffect, useCallback } from 'react';

import { CalendarWithButton, CreateReportModal } from '.';
import { KTIcon } from '../../../../_metronic/helpers';
import ConfirmModal from '../../../../_metronic/partials/modals/ConfirmModal/ConfirmModal';
import { usePageData } from '../../../../_metronic/layout/core';
import { useNavigate } from 'react-router-dom';
import { deleteReport } from '../../../modules/apps/core/_appRequests';
import { ReportsHeaderProps, DateRangeProps } from './reportsModels';

const ReportsHeader: React.FC<ReportsHeaderProps> = ({
  reportById,
  setDateFilter,
  availableAds,
  savedAdId,
  updateReportById,
}) => {
  const navigate = useNavigate();
  const { updateReportsTrigger, setUpdateReportsTrigger, reportByIdPayload } =
    usePageData();
  const [showCreateReportModal, setShowCreateReportModal] =
    useState<boolean>(false);
  const [showDeleteReportModal, setShowDeleteReportModal] =
    useState<boolean>(false);

  const handleSaveReportById = () => {
    if (reportByIdPayload) {
      updateReportById(reportByIdPayload);
    }
  };

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
        navigate('/home');
        closeDeleteReportModal();
      }
    }
  };

  return (
    <>
      <div className="d-flex fv-rowrow align-items-center justify-content-between mb-6">
        <h1>{reportById?.name}</h1>
        <div className="d-flex flex-row position-relative flex-wrap justify-content-end">
          <CalendarWithButton
            setDateFilter={setDateFilter}
            updateReportById={updateReportById}
            isModal={false}
          />
          <div className="d-flex flex-row">
            <a
              href="#"
              className="btn btn-sm fw-bold btn-primary me-4 ms-4"
              onClick={openCreateReportModal}
            >
              Edit
            </a>
            <a
              href="#"
              className="btn btn-sm fw-bold btn-primary me-4"
              onClick={handleSaveReportById}
            >
              Save
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
      </div>
      {showCreateReportModal && (
        <CreateReportModal
          closeCreateReportModal={closeCreateReportModal}
          isUpdate={true}
          previousTitle={reportById?.name ? reportById?.name : ''}
          previousDescription={
            reportById?.description ? reportById?.description : ''
          }
          availableAds={availableAds}
          savedAdId={savedAdId}
          setDateFilter={setDateFilter}
          updateReportById={updateReportById}
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
