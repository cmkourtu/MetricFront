import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns';
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { defaultStaticRanges } from '.';
import { ReportsProps, DateRangeSelectorProps } from './reportsModels';
import { KTIcon } from '../../../../_metronic/helpers';
import { usePageData } from '../../../../_metronic/layout/core';
import { getQueryString } from '../../../../_metronic/helpers/reportsHelpers';

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  setDateFilter,
  updateReportById,
  selectedDateRange,
  setSelectedDateRange,
  isModal,
}) => {
  const { reportByIdPayload, setReportByIdPayload } = usePageData();
  const [showDateRangeSelector, setShowDateRangeSelector] =
    useState<boolean>(false);
  const handleShowDateRangeSelector = () => {
    setShowDateRangeSelector(true);
  };

  const minDateThreeYearsAgo = new Date(
    moment().subtract(3, 'years').format('Y-MM-DD')
  );
  const currentDate = new Date(moment().format('Y-MM-DD'));

  function formatDateDisplay(date: Date | null, defaultText: string) {
    if (!date) return defaultText;
    return format(date, 'yyyy.MM.dd');
  }

  const handleSelect = (ranges: any) => {
    setSelectedDateRange(ranges.selection);
  };

  const onClickClear = () => {
    setSelectedDateRange({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    });
    setShowDateRangeSelector(false);
  };

  const handleApply = () => {
    setShowDateRangeSelector(false);
    if (
      selectedDateRange.startDate &&
      selectedDateRange.endDate &&
      setDateFilter
    ) {
      const startDate = selectedDateRange?.startDate
        ? new Date(selectedDateRange?.startDate)
        : null;
      const endDate = selectedDateRange?.endDate
        ? new Date(selectedDateRange?.endDate)
        : null;
      const dateFilter = getQueryString(startDate, endDate);
      setDateFilter(dateFilter);
    } else if (setDateFilter) {
      setDateFilter(null);
    }
    if (isModal) {
      setReportByIdPayload((prevPayload: ReportsProps) => ({
        ...prevPayload,
        startDate: selectedDateRange?.startDate,
        endDate: selectedDateRange?.endDate,
      }));
    } else {
      if (reportByIdPayload && updateReportById) {
        updateReportById({
          ...reportByIdPayload,
          startDate: selectedDateRange.startDate,
          endDate: selectedDateRange.endDate,
        });
      }
    }
  };

  return (
    <>
      <div
        className="btn btn-sm fw-bold  d-flex align-items-center bg-body btn-color-gray-700 btn-active-color-primary me-4 "
        onClick={handleShowDateRangeSelector}
      >
        <div className="me-2">
          {reportByIdPayload?.startDate ? (
            <span className="text-gray-600 fw-bold text-hover-primary">
              {formatDateDisplay(selectedDateRange.startDate, 'Start Date')} to{' '}
              {formatDateDisplay(selectedDateRange.endDate, 'End Date')}
            </span>
          ) : (
            'Choose period'
          )}
        </div>
        <KTIcon iconName="calendar-8" className="fs-2" />
      </div>
      {showDateRangeSelector && (
        <div
          className={`${isModal ? 'position-absolute top-0' : 'position-absolute top-100'}`}
          style={{
            right: isModal ? '50px' : 0,
            zIndex: 2,
          }}
        >
          <div className="shadow d-inline-block">
            <DateRangePicker
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              months={isModal ? 1 : 2}
              ranges={[selectedDateRange]}
              direction="horizontal"
              minDate={minDateThreeYearsAgo}
              maxDate={currentDate}
              staticRanges={defaultStaticRanges}
            />
            <div className="d-flex flex-row align-items-center justify-content-end bg-white">
              <button
                className="btn btn-sm btn-primary fw-bold me-4 mb-4"
                onClick={handleApply}
              >
                Apply
              </button>
              <button
                className="btn btn-sm btn-secondary fw-bold me-4 mb-4"
                onClick={onClickClear}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DateRangeSelector;
