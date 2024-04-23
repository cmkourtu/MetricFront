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
import {
  CreateReportModalProps,
  DateRangeProps,
  ReportsProps,
} from './reportsModels';
import { CalendarWithButton } from './';

const CreateReportModal: React.FC<CreateReportModalProps> = ({
  closeCreateReportModal,
  isUpdate,
  previousTitle,
  previousDescription,
  setDateFilter,
  updateReportById,
  availableAds,
  savedAdId,
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const {
    reportByIdPayload,
    setReportByIdPayload,
    setUpdateReportsTrigger,
    updateReportsTrigger,
  } = usePageData();
  const [reportTitle, setReportTitle] = useState<string>(previousTitle || '');
  const [reportDescription, setReportDescription] = useState<string>(
    previousDescription || ''
  );
  const [chosenAdId, setChosenAdId] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

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
    const userId = currentUser?.id;
    try {
      setSubmitting(true);
      if (reportTitle && userId && !submitting) {
        if (!isUpdate) {
          const { data } = await createReport(
            userId,
            reportTitle,
            reportDescription,
            reportByIdPayload?.startDate,
            reportByIdPayload?.endDate
          );
          if (data) {
            setReportByIdPayload(data);
            closeCreateReportModal();
            navigate(`/reports/${data.id}`);
          }
        } else if (reportByIdPayload && updateReportById) {
          updateReportById({
            ...reportByIdPayload,
            name: reportTitle,
            description: reportDescription,
          });
          closeCreateReportModal();
        }
        setReportTitle('');
        setReportDescription('');
      }
    } catch (error) {
      console.log('Error creating report:', error);
    } finally {
      setSubmitting(false);
      if (!submitting) {
        setUpdateReportsTrigger(!updateReportsTrigger);
      }
    }
  };

  useEffect(() => {
    if (savedAdId) {
      setChosenAdId(savedAdId.map(Number));
    }
  }, [savedAdId]);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    adId: number
  ) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setChosenAdId((prevIds) => [...prevIds, adId]);
    } else {
      setChosenAdId((prevIds) => prevIds.filter((id) => id !== adId));
    }
  };

  useEffect(() => {
    if (!isUpdate) {
      setReportByIdPayload((prevPayload: ReportsProps) => ({
        ...prevPayload,
        startDate: null,
        endDate: null,
      }));
    }
  }, []);

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
                <div className="d-flex flex-column fv-row fv-plugins-icon-container">
                  <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                    <span>Select a period</span>
                  </label>
                  <div className="d-flex flex-row align-items-center mb-10 position-relative">
                    <CalendarWithButton
                      setDateFilter={setDateFilter}
                      updateReportById={updateReportById}
                      isModal={true}
                      isUpdate={isUpdate}
                    />
                  </div>
                </div>
                {isUpdate && (
                  <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                    <label className="d-flex align-items-center fs-6 fw-semibold mb-4">
                      <span>Available ads</span>
                    </label>
                    <div
                      className="d-flex flex-column overflow-auto"
                      style={{ maxHeight: '200px' }}
                    >
                      {availableAds?.map((ads) => (
                        <div
                          className="form-check form-check-sm form-check-custom form-check-solid mb-4"
                          key={ads.ad_id}
                        >
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value="1"
                            data-kt-check="true"
                            data-kt-check-target=".widget-13-check"
                            onChange={(e) => handleCheckboxChange(e, ads.ad_id)}
                            checked={chosenAdId.includes(ads.ad_id)}
                          />
                          <label
                            className="form-check-label fw-bold"
                            htmlFor="widget-13-check"
                          >
                            {ads.ad_name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
