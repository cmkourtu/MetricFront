import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns';
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { defaultStaticRanges } from '.';
import { KTIcon } from '../../../../_metronic/helpers';

interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface DateRangeSelectorProps {
  onSubmit?: (selectedDateRange: DateRange) => void;
  setStartDateFilter: React.Dispatch<React.SetStateAction<Date | null>>;
  startDateFilter: Date | null;
  setEndDateFilter: React.Dispatch<React.SetStateAction<Date | null>>;
  endDateFilter: Date | null;
  setDateFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  setStartDateFilter,
  startDateFilter,
  setEndDateFilter,
  endDateFilter,
  setDateFilter,
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(() => {
    const defaultStartDate = startDateFilter ? startDateFilter : new Date();
    const defaultEndDate = endDateFilter ? endDateFilter : new Date();

    return {
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      key: 'selection',
    };
  });

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
    setStartDateFilter(selectedDateRange.startDate);
    setEndDateFilter(selectedDateRange.endDate);
    setShowDateRangeSelector(false);
    if (selectedDateRange.startDate && selectedDateRange.endDate) {
      const startYear = selectedDateRange.startDate.getFullYear();
      const startMonth = String(
        selectedDateRange.startDate.getMonth() + 1
      ).padStart(2, '0');
      const startDay = String(selectedDateRange.startDate.getDate()).padStart(
        2,
        '0'
      );

      const endYear = selectedDateRange.endDate.getFullYear();
      const endMonth = String(
        selectedDateRange.endDate.getMonth() + 1
      ).padStart(2, '0');
      const endDay = String(selectedDateRange.endDate.getDate()).padStart(
        2,
        '0'
      );

      const queryString = `start=${startYear}-${startMonth}-${startDay}&end=${endYear}-${endMonth}-${endDay}`;
      setDateFilter(queryString);
    } else {
      setDateFilter(null);
    }
  };

  return (
    <>
      <div
        className="btn btn-sm fw-bold  d-flex align-items-center bg-body btn-color-gray-700 btn-active-color-primary me-4 "
        onClick={handleShowDateRangeSelector}
      >
        <div className="me-2">
          {startDateFilter ? (
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
          className="position-absolute top-100"
          style={{ right: 0, zIndex: 2 }}
        >
          <div className="shadow d-inline-block">
            <DateRangePicker
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              months={2}
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
