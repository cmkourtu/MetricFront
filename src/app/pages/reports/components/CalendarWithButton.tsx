import React, { useState, useEffect } from 'react';

import { DateRangeSelector } from '.';
import {
  DateRangeProps,
  CalendarWithButtonProps,
  ReportsProps,
} from './reportsModels';
import { usePageData } from '../../../../_metronic/layout/core';

const CalendarWithButton: React.FC<CalendarWithButtonProps> = ({
  setDateFilter,
  updateReportById,
  isModal,
  isUpdate,
}) => {
  const [selectedDateRange, setSelectedDateRange] =
    useState<DateRangeProps | null>(null);
  const { reportByIdPayload, setReportByIdPayload } = usePageData();
  const [showDateRangeSelector, setShowDateRangeSelector] =
    useState<boolean>(false);

  useEffect(() => {
    if (!reportByIdPayload?.startDate || !reportByIdPayload?.endDate) {
      setSelectedDateRange(null);
    } else {
      setSelectedDateRange({
        startDate: new Date(reportByIdPayload.startDate),
        endDate: new Date(reportByIdPayload.endDate),
        key: 'selection',
      });
    }
  }, [reportByIdPayload]);

  const handleClearDate = () => {
    if (!isUpdate) {
      setReportByIdPayload((prevPayload: ReportsProps) => ({
        ...prevPayload,
        startDate: null,
        endDate: null,
      }));
    }
    if (setDateFilter) {
      setDateFilter(null);
    }

    setSelectedDateRange(null);
    if (reportByIdPayload && updateReportById) {
      updateReportById({
        ...reportByIdPayload,
        startDate: null,
        endDate: null,
      });
    }
  };

  const handleOpenCalendar = () => {
    setSelectedDateRange({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    });
    setShowDateRangeSelector(true);
  };

  return (
    <div className="d-flex flex-row">
      {selectedDateRange?.startDate && selectedDateRange?.endDate ? (
        <DateRangeSelector
          setDateFilter={setDateFilter}
          updateReportById={updateReportById}
          selectedDateRange={selectedDateRange}
          setSelectedDateRange={setSelectedDateRange}
          showDateRangeSelector={showDateRangeSelector}
          setShowDateRangeSelector={setShowDateRangeSelector}
          isModal={isModal}
        />
      ) : (
        <button
          className="btn btn-sm fw-bold btn-secondary"
          onClick={handleOpenCalendar}
        >
          Choose period
        </button>
      )}
      {reportByIdPayload?.startDate && (
        <a
          href="#"
          className="btn btn-sm fw-bold btn-secondary"
          onClick={handleClearDate}
        >
          Clear
        </a>
      )}
    </div>
  );
};

export default CalendarWithButton;
