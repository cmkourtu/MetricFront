import React, { useState, useEffect } from 'react';
//import { KTIcon } from '../../../../_metronic/helpers';
import {
  ReportsTableDataProps,
  SimplifiedReportsTableDataProps,
} from './reportsModels';
import { ReportsTableConfig } from './ReportsConfig';
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers';
import { useNavigate } from 'react-router-dom';

const ReportsTable: React.FC<ReportsTableDataProps> = ({
  reportsTableData,
  setChosenReports,
  handleSort,
  sortOrder,
  sortColumn,
}) => {
  const navigate = useNavigate();
  const [updateReportsTrigger, setUpdateReportsTrigger] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [checkedColumnTitles, setCheckedColumnTitles] = useState<string[]>([]);
  const [chosenRows, setChosenRows] = useState<
    SimplifiedReportsTableDataProps[]
  >([]);

  const handleCheckboxChange = (index: number) => {
    const updatedChosenReports = [...reportsTableData];

    if (!updatedChosenReports[index].checked) {
      updatedChosenReports[index].checked = false;
    } else if (selectAllChecked) {
      updatedChosenReports[index].checked = true;
    }
    updatedChosenReports[index].checked = !updatedChosenReports[index].checked;
    const selectedReports = updatedChosenReports.filter(
      (report) => report.checked
    );
    setSelectAllChecked(false);
    setChosenRows(selectedReports);
    setUpdateReportsTrigger(!updateReportsTrigger);
  };

  const handleColumnCheck = (columnTitle: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedColumnTitles((prevTitles) => [...prevTitles, columnTitle]);
    } else {
      setCheckedColumnTitles((prevTitles) =>
        prevTitles.filter((title) => title !== columnTitle)
      );
    }
    setUpdateReportsTrigger(!updateReportsTrigger);
  };

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setSelectAllChecked(isChecked);

    const updatedReportsData = reportsTableData.map((report) => ({
      ...report,
      checked: isChecked,
    }));
    setChosenRows(isChecked ? updatedReportsData : []);
    setUpdateReportsTrigger(!updateReportsTrigger);
  };

  useEffect(() => {
    if (chosenRows && checkedColumnTitles?.length > 0) {
      const filteredReports = chosenRows.map((report) => {
        const filteredReport: { [key: string]: any } = {
          ad_name: report.ad_name,
          icon: report.icon,
        };
        checkedColumnTitles.forEach((title) => {
          filteredReport[title] = report[title];
        });
        return filteredReport;
      });
      setChosenReports?.(filteredReports);
    } else {
      setChosenReports?.([]);
    }
  }, [updateReportsTrigger]);

  const isRowChecked = (dataId: number) => {
    const isSelected = chosenRows.some((chosenRow) => {
      return chosenRow.ad_id === dataId;
    });
    return isSelected;
  };

  const handleNavigatetoPreview = (facebookId: string, adId: number) => {
    navigate(`/reports/${facebookId}/ad/${adId}/preview`);
  };

  return (
    <div className="table-responsive ">
      <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3 overflow-auto">
        <thead>
          <tr className="fw-bold text-muted">
            <th className="w-25px">
              <div className="form-check form-check-sm form-check-custom form-check-solid">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="1"
                  data-kt-check="true"
                  data-kt-check-target=".widget-13-check"
                  checked={selectAllChecked}
                  onChange={handleSelectAllChange}
                />
              </div>
            </th>
            <th className="min-w-250px">
              <div className="form-check form-check-sm form-check-custom form-check-solid ms-auto ">
                <div
                  className="d-flex flex-row no-wrap text-hover-primary cursor-pointer"
                  onClick={() => handleSort('ad_name')}
                >
                  <span
                    className={`${sortColumn === 'ad_name' ? 'text-primary' : ''} me-2`}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Ads
                  </span>
                  {sortColumn === 'ad_name' && (
                    <KTIcon
                      iconName={sortOrder === 'ASC' ? 'black-up' : 'black-down'}
                      className="text-primary me-2 fs-2"
                    />
                  )}
                </div>
              </div>
            </th>
            {ReportsTableConfig.map((tableConfig) => (
              <th className="w-25px" key={tableConfig.key}>
                <div className="form-check form-check-sm form-check-custom form-check-solid ms-auto text-hover-primary cursor-pointer">
                  {tableConfig?.checkbox && (
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value="1"
                      data-kt-check="true"
                      data-kt-check-target=".widget-13-check"
                      onChange={(e) =>
                        handleColumnCheck(tableConfig.value, e.target.checked)
                      }
                    />
                  )}
                  <div
                    className="d-flex flex-row no-wrap"
                    onClick={() => handleSort(tableConfig.value)}
                  >
                    <span
                      className={`${sortColumn === tableConfig.value ? 'text-primary' : ''} me-2`}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {tableConfig?.title}
                    </span>
                    {sortColumn === tableConfig.value && (
                      <KTIcon
                        iconName={
                          sortOrder === 'ASC' ? 'black-up' : 'black-down'
                        }
                        className="text-primary me-2 fs-2"
                      />
                    )}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reportsTableData.map((data, index) => (
            <tr key={index}>
              <td>
                <div className="form-check form-check-sm form-check-custom form-check-solid">
                  <input
                    className="form-check-input widget-13-check"
                    type="checkbox"
                    value="1"
                    checked={isRowChecked(data?.ad_id ? data?.ad_id : 0)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </div>
              </td>
              <td>
                <div
                  className="d-flex flex-row align-items-center text-hover-primary cursor-pointer"
                  onClick={() => {
                    if (data?.facebookId && data?.ad_id) {
                      handleNavigatetoPreview(data.facebookId, data.ad_id);
                    }
                  }}
                >
                  <img
                    src={
                      data?.icon
                        ? data?.icon
                        : toAbsoluteUrl('media/auth/404-error.png')
                    }
                    alt=""
                    className="me-3"
                    style={{ width: '64px', height: '64px' }}
                  />
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary fs-6"
                  >
                    {data?.ad_name}
                  </a>
                </div>
              </td>
              {ReportsTableConfig.map((tableConfig) => (
                <td key={tableConfig?.key}>
                  <span className="text-gray-900 fw-bold fs-6">
                    {data.hasOwnProperty(tableConfig.value) &&
                    data[tableConfig.value] !== null
                      ? data[tableConfig.value]
                      : '---'}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
