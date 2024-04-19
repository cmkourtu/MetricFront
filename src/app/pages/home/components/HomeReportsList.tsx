import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePageData } from '../../../../_metronic/layout/core';
import { getFormattedDateFromString } from '../../../../_metronic/helpers/reportsHelpers';
import { KTIcon } from '../../../../_metronic/helpers';

const HomeReportsList: React.FC = () => {
  const navigate = useNavigate();
  const { reports } = usePageData();
  const [searchInput, setSearchInput] = useState('');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [sortedColumn, setSortedColumn] = useState<
    'name' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate'
  >('updatedAt');

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const handleClearSearchInput = () => {
    setSearchInput('');
  };

  const handleNavigateToReport = (reportId: string) => {
    navigate(`/reports/${reportId}`);
  };

  const handleSort = (
    column: 'name' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate'
  ) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortedColumn(column);
      setSortOrder('ASC');
    }
  };

  let filteredReports = reports?.filter((report) =>
    report?.name?.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (sortedColumn) {
    filteredReports = filteredReports?.sort((a, b) => {
      const aValue =
        sortedColumn === 'startDate' || sortedColumn === 'endDate'
          ? a[sortedColumn] || ''
          : a[sortedColumn];
      const bValue =
        sortedColumn === 'startDate' || sortedColumn === 'endDate'
          ? b[sortedColumn] || ''
          : b[sortedColumn];
      if (sortOrder === 'ASC') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }

  return (
    <div className="card mt-4">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Browse reports</span>
        </h3>
        <div className="d-flex align-items-center position-relative my-1">
          <KTIcon
            iconName="magnifier"
            className="fs-1 position-absolute ms-4"
          />
          <input
            type="text"
            className="form-control form-control-solid  ps-14"
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
      </div>
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th
                  className="ps-4 min-w-150px rounded-start text-hover-primary cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="d-flex flex-row justify-content-start align-items-center">
                    <span
                      className={`${sortedColumn === 'name' && 'text-primary'}`}
                    >
                      Name
                    </span>
                    {sortedColumn === 'name' && (
                      <KTIcon
                        iconName={
                          sortOrder === 'ASC' ? 'black-up' : 'black-down'
                        }
                        className="text-primary me-2 fs-2"
                      />
                    )}
                  </div>
                </th>
                <th
                  className=" min-w-100px text-hover-primary cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="d-flex flex-row justify-content-start align-items-center">
                    <span
                      className={`${sortedColumn === 'createdAt' && 'text-primary'}`}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Created At
                    </span>
                    {sortedColumn === 'createdAt' && (
                      <KTIcon
                        iconName={
                          sortOrder === 'ASC' ? 'black-up' : 'black-down'
                        }
                        className="text-primary me-2 fs-2"
                      />
                    )}
                  </div>
                </th>
                <th
                  className="min-w-100px text-hover-primary cursor-pointer"
                  onClick={() => handleSort('updatedAt')}
                >
                  <div className="d-flex flex-row justify-content-start align-items-center">
                    <span
                      className={`${sortedColumn === 'updatedAt' && 'text-primary'}`}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Updated At
                    </span>
                    {sortedColumn === 'updatedAt' && (
                      <KTIcon
                        iconName={
                          sortOrder === 'ASC' ? 'black-up' : 'black-down'
                        }
                        className="text-primary me-2 fs-2"
                      />
                    )}
                  </div>
                </th>
                <th
                  className="min-w-100px text-hover-primary cursor-pointer"
                  onClick={() => handleSort('startDate')}
                >
                  <div className="d-flex flex-row justify-content-start align-items-center">
                    <span
                      className={`${sortedColumn === 'startDate' && 'text-primary'}`}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Start Date
                    </span>
                    {sortedColumn === 'startDate' && (
                      <KTIcon
                        iconName={
                          sortOrder === 'ASC' ? 'black-up' : 'black-down'
                        }
                        className="text-primary me-2 fs-2"
                      />
                    )}
                  </div>
                </th>
                <th
                  className="min-w-100px rounded-end text-end pe-4 text-hover-primary cursor-pointer"
                  onClick={() => handleSort('endDate')}
                >
                  <div className="d-flex flex-row justify-content-end align-items-center">
                    {sortedColumn === 'endDate' && (
                      <KTIcon
                        iconName={
                          sortOrder === 'ASC' ? 'black-up' : 'black-down'
                        }
                        className="text-primary me-2 fs-2"
                      />
                    )}
                    <span
                      className={`${sortedColumn === 'endDate' && 'text-primary'}`}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      End Date
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReports &&
                filteredReports.map((report) => (
                  <tr key={report?.id}>
                    <td
                      className="cursor-pointer"
                      onClick={() =>
                        handleNavigateToReport(report?.id ? report?.id : '')
                      }
                    >
                      <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 ps-4 cursor-pointer">
                        {report?.name}
                      </span>
                    </td>
                    <td>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        {getFormattedDateFromString(
                          report?.createdAt ? report?.createdAt : ''
                        )}
                      </span>
                    </td>
                    <td>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        {getFormattedDateFromString(
                          report?.updatedAt ? report?.updatedAt : ''
                        )}
                      </span>
                    </td>
                    <td>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        {getFormattedDateFromString(report?.startDate)}
                      </span>
                    </td>
                    <td>
                      <span className="text-muted fw-semibold text-muted d-block fs-7 pe-4 text-end">
                        {getFormattedDateFromString(report?.endDate)}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { HomeReportsList };
