import React, { useState, useEffect } from 'react';
//import { KTIcon } from '../../../../_metronic/helpers';
import {
  ReportsTableDataProps,
  SimplifiedReportsTableDataProps,
} from './reportsModels';
import { ReportsTableConfig } from './ReportsConfig';

const ReportsTable: React.FC<ReportsTableDataProps> = ({
  reportsTableData,
  setChosenReports,
}) => {
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
                <span style={{ whiteSpace: 'nowrap' }}>Ads</span>
              </div>
            </th>
            {ReportsTableConfig.map((tableConfig) => (
              <th className="w-25px" key={tableConfig.key}>
                <div className="form-check form-check-sm form-check-custom form-check-solid ms-auto ">
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
                  <span style={{ whiteSpace: 'nowrap' }}>
                    {tableConfig?.title}
                  </span>
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
                <a
                  href="#"
                  className="text-gray-900 fw-bold text-hover-primary fs-6"
                >
                  {data?.ad_name}
                </a>
              </td>
              {ReportsTableConfig.map((tableConfig) => (
                <td key={tableConfig?.key}>
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary fs-6"
                  >
                    {data.hasOwnProperty(tableConfig.value) &&
                    data[tableConfig.value] !== null
                      ? data[tableConfig.value]
                      : '---'}
                  </a>
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
