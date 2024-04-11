import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import moment from 'moment';

import { useAuth } from '../../../modules/auth';
import {
  createReport,
  updateReport,
} from '../../../modules/apps/core/_appRequests';
import { usePageData } from '../../../../_metronic/layout/core';

interface CreateReportModalProps {
  closeCreateReportModal: () => void;
  isUpdate: boolean;
  reportId?: string;
  previousTitle?: string;
  previousDescription?: string;
  startDate?: Date | null;
  endDate?: Date | null;
}

const CreateReportModal: React.FC<CreateReportModalProps> = ({
  closeCreateReportModal,
  isUpdate,
  reportId,
  previousTitle,
  previousDescription,
  startDate,
  endDate,
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { updateReportsTrigger, setUpdateReportsTrigger } = usePageData();
  const [selectedDates, setSelectedDates] = useState<Date[] | null>(null);
  const [reportTitle, setReportTitle] = useState<string>(previousTitle || '');
  const [reportDescription, setReportDescription] = useState<string>(
    previousDescription || ''
  );
  const [submitting, setSubmitting] = useState(false);
  function getFormattedDate(date: Date | null): string | null {
    if (!date) {
      return null;
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleReportTitleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReportTitle(event.target.value);
  };

  const handleReportDescriptionInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReportDescription(event.target.value);
  };

  const handleCreateReport = async () => {
    const startedDate = selectedDates
      ? getFormattedDate(selectedDates[0])
      : null;
    const endedDate = selectedDates ? getFormattedDate(selectedDates[1]) : null;
    const userId = currentUser?.id;
    try {
      if (reportTitle && userId && !submitting) {
        setSubmitting(true);
        if (!isUpdate) {
          const { data } = await createReport(
            userId,
            reportTitle,
            reportDescription,
            startedDate,
            endedDate
          );
          if (data) {
            setUpdateReportsTrigger(!updateReportsTrigger);
            closeCreateReportModal();
            navigate(`/reports/${data.id}`);
          }
        } else if (reportId) {
          const { data } = await updateReport(
            reportId,
            userId,
            reportTitle,
            reportDescription,
            startedDate,
            endedDate
          );
          if (data) {
            setUpdateReportsTrigger(!updateReportsTrigger);
            closeCreateReportModal();
          }
        }
        setReportTitle('');
        setReportDescription('');
      }
    } catch (error) {
      console.log('Error creating report:', error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      setSelectedDates([startDate, endDate]);
    }
  }, [startDate, endDate]);

  const handleDateChange = (selected: Date[]) => {
    if (selected.length === 2) {
      setSelectedDates(selected);
    }
  };

  const handleClearDate = () => {
    setSelectedDates(null);
  };

  const minDateThreeYearsAgo = moment().subtract(3, 'years').format('Y-MM-DD');
  const currentDate = moment().format('Y-MM-DD');

  return (
    <>
      <div
        className="modal fade show"
        id="kt_modal_new_target"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        style={{ display: 'block', paddingLeft: '0px' }}
      >
        <div className="modal-dialog modal-dialog-centered mw-650px">
          <div className="modal-content rounded">
            <div className="modal-header pb-0 border-0 justify-content-end">
              <div
                className="btn btn-sm btn-icon btn-active-color-primary"
                data-bs-dismiss="modal"
                onClick={closeCreateReportModal}
              >
                <i className="ki-duotone ki-cross fs-1">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </div>
            </div>
            <div className="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
              <form
                id="kt_modal_new_target_form"
                className="form fv-plugins-bootstrap5 fv-plugins-framework"
                action="#"
              >
                <div className="mb-13 text-center">
                  <h1 className="mb-3">
                    {isUpdate ? 'Update' : 'Create'} a Report
                  </h1>
                </div>
                <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                  <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                    <span className="required">Report Title</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="Enter Report Title"
                    name="target_title"
                    value={reportTitle}
                    onChange={handleReportTitleInputChange}
                  />
                  <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                </div>
                <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                  <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                    <span>Report Description</span>
                  </label>
                  <textarea
                    className="form-control form-control-solid"
                    rows={3}
                    name="target_details"
                    placeholder="Type Target Details"
                    value={reportDescription}
                    onChange={handleReportDescriptionInputChange}
                  />
                  <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                </div>
                <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                  <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                    <span>Select a period</span>
                  </label>
                  <div className="d-flex flex-row mb-10">
                    <Flatpickr
                      className="form-calendar-flatpickr fs-8 fw-bold me-4 h-45px"
                      options={{
                        mode: 'range',
                        dateFormat: 'Y-m-d',
                        onClose: handleDateChange,
                        minDate: minDateThreeYearsAgo,
                        maxDate: currentDate,
                        defaultDate: selectedDates,
                      }}
                      placeholder="Select a period"
                    />{' '}
                    <a
                      href="#"
                      className="btn btn-secondary fw-bold"
                      onClick={handleClearDate}
                    >
                      Clear
                    </a>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="reset"
                    id="kt_modal_new_target_cancel"
                    className="btn btn-secondary fw-bold me-20"
                    onClick={closeCreateReportModal}
                  >
                    Cancel
                  </button>
                  <button
                    id="kt_modal_new_target_submit"
                    className="btn btn-primary fw-bold"
                    onClick={handleCreateReport}
                    disabled={submitting || !reportTitle}
                  >
                    <span className="indicator-label fw-bold">Save report</span>
                    <span className="indicator-progress">
                      {submitting && (
                        <>
                          Please wait...{' '}
                          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default CreateReportModal;
