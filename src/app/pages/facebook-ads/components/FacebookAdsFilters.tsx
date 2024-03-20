import React, { useState } from 'react';

interface FacebookAdsFiltersProps {
  onCurrencySelect: (currency: string) => void;
}

const FacebookAdsFilters: React.FC<FacebookAdsFiltersProps> = ({
  onCurrencySelect,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const handleCurrencySelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const currency = event.target.value;
    setSelectedCurrency(currency);
  };
  const handleApplyFilter = () => {
    onCurrencySelect(selectedCurrency);
  };

  return (
    <div
      className="menu menu-sub menu-sub-dropdown w-250px w-md-300px"
      data-kt-menu="true"
    >
      <div className="px-7 py-5">
        <div className="fs-5 text-gray-900 fw-bolder">Filter Options</div>
      </div>

      <div className="separator border-gray-200"></div>

      <div className="px-7 py-5">
        <div className="mb-10">
          <label className="form-label fw-bold">Currency:</label>

          <div>
            <select
              className="form-select form-select-solid"
              data-kt-select2="true"
              data-placeholder="Select option"
              data-allow-clear="true"
              onChange={handleCurrencySelect}
            >
              <option value="">All</option>
              <option value="UAH">UAH</option>
              <option value="RUB">RUB</option>
            </select>
          </div>
        </div>

        {/* <div className="mb-10">
          <label className="form-label fw-bold">Member Type:</label>

          <div className="d-flex">
            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
              <input className="form-check-input" type="checkbox" value="1" />
              <span className="form-check-label">Author</span>
            </label>

            <label className="form-check form-check-sm form-check-custom form-check-solid">
              <input
                className="form-check-input"
                type="checkbox"
                value="2"
                defaultChecked={true}
              />
              <span className="form-check-label">Customer</span>
            </label>
          </div>
    </div>*/}

        {/*<div className="mb-10">
          <label className="form-label fw-bold">Notifications:</label>

          <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              name="notifications"
              defaultChecked={true}
            />
            <label className="form-check-label">Enabled</label>
          </div>
</div>*/}

        <div className="d-flex justify-content-end">
          <button
            type="reset"
            className="btn btn-sm btn-light btn-active-light-primary me-2"
            data-kt-menu-dismiss="true"
          >
            Reset
          </button>

          <button
            type="submit"
            className="btn btn-sm btn-primary"
            data-kt-menu-dismiss="true"
            onClick={handleApplyFilter}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacebookAdsFilters;
