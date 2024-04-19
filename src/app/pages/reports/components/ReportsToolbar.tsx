import React from 'react';

import { KTIcon } from '../../../../_metronic/helpers';
import {
  capitalizeTitle,
  getFormattedDateWithTime,
} from '../../../../_metronic/helpers/reportsHelpers';
import { AddReportsColumnsDropdown } from '.';
import { ReportsToolbarProps, ReportsProps } from './reportsModels';
import { usePageData } from '../../../../_metronic/layout/core';

const ReportsToolbar: React.FC<ReportsToolbarProps> = ({
  searchInput,
  setSearchInput,
  generatePDF,
  updatedAt,
}) => {
  const { reportByIdPayload, setReportByIdPayload } = usePageData();
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const handleRemoveTag = (titleToRemove: string) => {
    if (reportByIdPayload?.chosenMetrics) {
      const updatedTitles: string[] = reportByIdPayload?.chosenMetrics.filter(
        (title) => title !== titleToRemove
      );
      setReportByIdPayload((prevPayload: ReportsProps) => ({
        ...prevPayload,
        chosenMetrics: updatedTitles,
      }));
    }
  };

  const handleClearSearchInput = () => {
    setSearchInput('');
  };

  const handleChangeTypeOfView = (typeOfView: string) => {
    setReportByIdPayload((prevPayload: ReportsProps) => ({
      ...prevPayload,
      viewMode: typeOfView,
    }));
  };

  return (
    <div className="card-body py-3">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <div className="d-flex align-items-center position-relative my-1">
          <KTIcon
            iconName="magnifier"
            className="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            className="form-control form-control-solid w-300px ps-14"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <div className="modal-header pb-0 border-0 justify-content-end">
            <div
              className="btn btn-sm btn-icon btn-active-color-primary "
              onClick={handleClearSearchInput}
            >
              <i className="ki-duotone ki-cross fs-1">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center">
          <div className="d-flex flex-column align-items-start me-4">
            <span className="text-gray-900 fw-bold fs-9">
              Lastly updated at:
            </span>
            <span>
              {updatedAt ? getFormattedDateWithTime(updatedAt) : '---'}
            </span>
          </div>
          <button
            className="btn btn-sm btn-primary fw-bold"
            onClick={generatePDF}
          >
            Download PDF
          </button>
        </div>
      </div>
      <div className="d-flex flex-row align-items-start justify-content-between">
        <div className="d-flex flex-start align-items-center flex-wrap mb-3">
          {reportByIdPayload?.chosenMetrics &&
            reportByIdPayload?.chosenMetrics?.length > 0 &&
            reportByIdPayload?.chosenMetrics.map((title, index) => (
              <div
                className="d-flex justify-content-between align-items-center me-4 mb-4 bg-light-primary rounded"
                key={index}
              >
                <span className="p-2 fw-semibold fs-6 text-gray-700">
                  {capitalizeTitle(title)}
                </span>
                <div
                  className="btn btn-sm btn-icon btn-active-color-primary"
                  onClick={() => handleRemoveTag(title)}
                >
                  <i className="ki-duotone ki-cross fs-1">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                </div>
              </div>
            ))}
          <AddReportsColumnsDropdown />
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center no-wrap ">
          <button
            className={`${(reportByIdPayload?.viewMode === 'chart' || reportByIdPayload?.viewMode === null) && 'active'} btn btn-sm btn-icon btn-active-color-primary me-2`}
            onClick={() => handleChangeTypeOfView('chart')}
          >
            <KTIcon iconName="chart-simple" className="fs-2x" />
          </button>
          <button
            className={`${reportByIdPayload?.viewMode === 'chart-pie' && 'active'} btn btn-sm btn-icon btn-active-color-primary me-2`}
            onClick={() => handleChangeTypeOfView('chart-pie')}
            disabled
          >
            <KTIcon iconName="chart-pie-simple" className="fs-2x" />
          </button>
          <button
            className={`${reportByIdPayload?.viewMode === 'tile' && 'active'} btn btn-sm btn-icon btn-active-color-primary me-2`}
            onClick={() => handleChangeTypeOfView('tile')}
          >
            <KTIcon iconName="element-plus" className="fs-2x" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsToolbar;
