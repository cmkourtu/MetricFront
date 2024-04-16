import React, { useState, useEffect } from 'react';
import { KTIcon } from '../../../../_metronic/helpers';
import { ReportsTableConfig } from './ReportsConfig';
import { ReportsTableConfigProps } from './reportsModels';

export interface AddReportsColumnsDropdownProps {
  checkedColumnTitles: string[];
  setCheckedColumnTitles: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddReportsColumnsDropdown: React.FC<AddReportsColumnsDropdownProps> = ({
  checkedColumnTitles,
  setCheckedColumnTitles,
}) => {
  const [searchInputDropdown, setSearchInputDropdown] = useState<string>('');
  const [searchedReportsTableConfig, setSearchedReportsTableConfig] = useState<
    ReportsTableConfigProps[]
  >([]);
  const [temporaryCheckedColumnTitles, setTemporaryCheckedColumnTitles] =
    useState<string[]>([]);

  const handleSearchInputDropdownChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputDropdown(event.target.value);
  };

  const handleDropdownColumnCheck = (
    columnTitle: string,
    isChecked: boolean
  ) => {
    if (isChecked) {
      setTemporaryCheckedColumnTitles((prevTitles) => [
        ...prevTitles,
        columnTitle,
      ]);
    } else {
      setTemporaryCheckedColumnTitles((prevTitles) =>
        prevTitles.filter((title) => title !== columnTitle)
      );
    }
  };

  const handleDropdownApply = () => {
    setCheckedColumnTitles(temporaryCheckedColumnTitles);
  };

  const handleClearSearchInput = () => {
    setSearchInputDropdown('');
  };

  useEffect(() => {
    const filteredReportsTableConfig = ReportsTableConfig.filter(
      (item) => item.checkbox
    );

    if (searchInputDropdown.length > 0) {
      const searchedReportsTableConfig = filteredReportsTableConfig.filter(
        (item) =>
          item.title.toLowerCase().includes(searchInputDropdown.toLowerCase())
      );
      setSearchedReportsTableConfig(searchedReportsTableConfig);
    } else {
      setSearchedReportsTableConfig(filteredReportsTableConfig);
    }
  }, [searchInputDropdown]);

  useEffect(() => {
    setTemporaryCheckedColumnTitles(checkedColumnTitles);
  }, [checkedColumnTitles]);

  function isCheckedColumn(value: string, checkedColumnTitles: string[]) {
    return checkedColumnTitles.includes(value);
  }

  return (
    <div className="d-flex me-4 mb-4">
      <div className="me-0">
        <button
          className="btn btn-sm btn-secondary fw-bold"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
        >
          Add column
        </button>
        <div
          className="menu menu-sub menu-sub-dropdown w-250px w-md-300px"
          data-kt-menu="true"
        >
          <div className="px-7 py-5">
            <div className="fs-5 text-gray-900 fw-bolder">Add columns</div>
          </div>

          <div className="separator border-gray-200"></div>

          <div className="px-7 py-5">
            <div className="mb-10">
              <div className="d-flex align-items-center position-relative my-1">
                <KTIcon
                  iconName="magnifier"
                  className="fs-1 position-absolute ms-3"
                />
                <input
                  type="text"
                  className="form-control form-control-solid w-300px ps-14"
                  placeholder="Search"
                  value={searchInputDropdown}
                  onChange={handleSearchInputDropdownChange}
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
            </div>

            <div className="mb-10">
              <label className="form-label fw-bold">Available columns:</label>

              <div className="d-flex flex-column overflow-auto h-200px">
                {searchedReportsTableConfig.map((item) => (
                  <div key={item.key}>
                    <label className="form-check form-check-sm form-check-custom form-check-solid mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="1"
                        checked={isCheckedColumn(
                          item.value,
                          temporaryCheckedColumnTitles
                        )}
                        onChange={(e) =>
                          handleDropdownColumnCheck(
                            item.value,
                            e.target.checked
                          )
                        }
                      />
                      <span className="form-check-label">{item.title}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="reset"
                className="btn btn-sm btn-light btn-active-light-primary me-4"
                data-kt-menu-dismiss="true"
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                data-kt-menu-dismiss="true"
                onClick={handleDropdownApply}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReportsColumnsDropdown;
