import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'flatpickr/dist/themes/material_blue.css';
import Flatpickr from 'react-flatpickr';

import { CreateReportModal } from '.';
import { KTIcon } from '../../../../_metronic/helpers';
import ConfirmModal from '../../../../_metronic/partials/modals/ConfirmModal/ConfirmModal';
import { usePageData } from '../../../../_metronic/layout/core';
import { useNavigate } from 'react-router-dom';
import { deleteReport } from '../../../modules/apps/core/_appRequests';
import { ReportsHeaderProps } from './reportsModels';
import { getFormattedDateForInput } from '../../../../_metronic/helpers/reportsHelpers';

const ReportsHeader: React.FC<ReportsHeaderProps> = ({
  reportById,
  setDateFilter,
  availableAds,
  savedAdId,
  startDateFilter,
  endDateFilter,
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
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
  const minDateThreeYearsAgo = moment().subtract(3, 'years').format('Y-MM-DD');
  const currentDate = moment().format('Y-MM-DD');

  const handleShowCalendar = () => {
    setShowCalendar(true);
    setShowSaveButton(true);
  };

  const handleHideCalendar = () => {
    setShowCalendar(false);
    setStartDate(null);
    setEndDate(null);
    setDateFilter(null);
    setShowSaveButton(true);
  };

  const handleClearPeriod = () => {
    setStartDate(null);
    setEndDate(null);
    handleShowCalendar();
    setShowSaveButton(true);
  };

  const handleDateChange = (selectedDates: Date[]) => {
    if (selectedDates.length === 2) {
      setStartDate(selectedDates[0]);
      setEndDate(selectedDates[1]);
    }
    setShowSaveButton(true);
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
    setShowSaveButton(false);
    setShowCalendar(false);
  };

  useEffect(() => {
    if (startDateFilter && endDateFilter) {
      setStartDate(startDateFilter);
      setEndDate(endDateFilter);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  }, [startDateFilter, endDateFilter]);
  return (
    <>
      <div className="d-flex fv-rowrow align-items-center justify-content-between mb-6">
        <h1>{reportById?.name}</h1>
        <div className="d-flex flex-row">
          {startDate && endDate ? (
            <div className="d-flex flex-row align-items-center">
              <span>
                <span className="fw-bold fs-7 me-4">
                  {getFormattedDateForInput(startDate)}
                  {' to '}
                  {getFormattedDateForInput(endDate)}
                </span>
              </span>
              <a
                href="#"
                className="btn btn-sm btn-flex btn-light fw-bold me-4"
                onClick={handleClearPeriod}
              >
                Clear
              </a>
            </div>
          ) : (
            <>
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
                </div>
              )}
            </>
          )}
          {showSaveButton && (
            <a
              href="#"
              className="btn btn-sm fw-bold btn-primary me-4"
              onClick={handleSaveDateFilter}
            >
              Apply
            </a>
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
          availableAds={availableAds}
          savedAdId={savedAdId}
          startDateFilter={startDateFilter}
          endDateFilter={endDateFilter}
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
