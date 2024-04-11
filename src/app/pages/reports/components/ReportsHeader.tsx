import React, { useState } from 'react';
import moment from 'moment';

import 'flatpickr/dist/themes/material_blue.css';

import Flatpickr from 'react-flatpickr';

import { ReportsProps } from '../../../modules/apps/core/_appModels';
import { CreateReportModal } from '.';
import { KTIcon } from '../../../../_metronic/helpers';
import ConfirmModal from '../../../../_metronic/partials/modals/ConfirmModal/ConfirmModal';
import { usePageData } from '../../../../_metronic/layout/core';
import { useNavigate } from 'react-router-dom';
import { deleteReport } from '../../../modules/apps/core/_appRequests';

interface ReportsHeaderProps {
  reportById: ReportsProps;
  setDateFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

const ReportsHeader: React.FC<ReportsHeaderProps> = ({
  reportById,
  setDateFilter,
}) => {
  const navigate = useNavigate();
  const { updateReportsTrigger, setUpdateReportsTrigger } = usePageData();

  const [showCreateReportModal, setShowCreateReportModal] =
    useState<boolean>(false);
  const [showDeleteReportModal, setShowDeleteReportModal] =
    useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  const handleHideCalendar = () => {
    setShowCalendar(false);
    setStartDate(null);
    setEndDate(null);
    setDateFilter(null);
  };

  const handleDateChange = (selectedDates: Date[]) => {
    if (selectedDates.length === 2) {
      setStartDate(selectedDates[0]);
      setEndDate(selectedDates[1]);
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
        navigate('/dashboard');
        closeDeleteReportModal();
      }
    }
  };

  const handleSaveDateFilter = () => {
    if (startDate && endDate) {
      const startYear = startDate.getFullYear();
      const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
      const startDay = String(startDate.getDate()).padStart(2, '0');

      const endYear = endDate.getFullYear();
      const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
      const endDay = String(endDate.getDate()).padStart(2, '0');

      const queryString = `start=${startYear}-${startMonth}-${startDay}&end=${endYear}-${endMonth}-${endDay}`;
      setDateFilter(queryString);
    } else {
      setDateFilter(null);
    }
  };

  const minDateThreeYearsAgo = moment().subtract(3, 'years').format('Y-MM-DD');
  const currentDate = moment().format('Y-MM-DD');

  return (
    <>
      <div className="d-flex fv-rowrow align-items-center justify-content-between cursor-pointer mb-6">
        <h1>{reportById?.name}</h1>
        <div className="d-flex flex-row">
          {!showCalendar && (
            <a
              href="#"
              className="btn btn-sm btn-flex btn-light fw-bold me-4"
              onClick={handleShowCalendar}
            >
              Choose date
            </a>
          )}
          {showCalendar && (
            <div className="d-flex flex-row">
              <Flatpickr
                className="form-calendar-flatpickr fs-7 fw-bold me-2"
                options={{
                  mode: 'range',
                  dateFormat: 'Y-m-d',
                  onClose: handleDateChange,
                  minDate: minDateThreeYearsAgo,
                  maxDate: currentDate,
                }}
                placeholder="Select a period"
              />
              <a
                href="#"
                className="btn btn-sm btn-flex btn-light fw-bold me-4"
                onClick={handleHideCalendar}
              >
                Clear
              </a>
              <a
                href="#"
                className="btn btn-sm fw-bold btn-primary me-4"
                onClick={handleSaveDateFilter}
              >
                Save
              </a>
            </div>
          )}
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
          startDate={startDate}
          endDate={endDate}
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
