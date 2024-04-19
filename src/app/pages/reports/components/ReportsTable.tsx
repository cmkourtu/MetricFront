import React, { useState, useEffect } from 'react';
//import { KTIcon } from '../../../../_metronic/helpers';
import {
  ReportsTableDataProps,
  SimplifiedReportsTableDataProps,
  ReportsProps,
} from './reportsModels';
import { ReportsTableConfig } from './ReportsConfig';
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers';
import { ReportPreviewModal } from '.';
import { usePageData } from '../../../../_metronic/layout/core';

const ReportsTable: React.FC<ReportsTableDataProps> = ({
  reportsTableData,
  setChosenReports,
  handleSort,
  sortOrder,
}) => {
  const { reportByIdPayload, setReportByIdPayload } = usePageData();
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [openReportPreviewModal, setOpenReportPreviewModal] = useState(false);
  const [facebookId, setFacebookId] = useState<string | null>(null);
  const [adsId, setAdsId] = useState<string | null>(null);
  const [chosenRows, setChosenRows] = useState<
    SimplifiedReportsTableDataProps[]
  >([]);

  useEffect(() => {
    if (
      reportByIdPayload?.chosenAdSets &&
      reportByIdPayload?.chosenAdSets.length > 0
    ) {
      const filteredRows = reportsTableData.filter(
        (report) =>
          report?.ad_id !== null &&
          reportByIdPayload.chosenAdSets?.includes(report?.ad_id as number)
      );
      setChosenRows(filteredRows);
    }
  }, [reportsTableData]);

  const handleCloseReportPreviewModal = () => {
    setOpenReportPreviewModal(false);
    setFacebookId(null);
    setAdsId(null);
  };

  const handleOpenReportPreviewModal = (facebookId: string, adsId: string) => {
    setFacebookId(facebookId);
    setAdsId(adsId);
    if (adsId && facebookId) {
      setOpenReportPreviewModal(true);
    }
  };

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
    const chosenAdId = selectedReports.map((report) => report.ad_id);
    setSelectAllChecked(false);
    setReportByIdPayload((prevPayload: ReportsProps) => {
      return {
        ...prevPayload,
        chosenAdSets: chosenAdId as number[],
      };
    });
    setChosenRows(selectedReports);
  };

  const handleColumnCheck = (columnTitle: string, isChecked: boolean) => {
    let updatedColumns: string[] = [
      ...(reportByIdPayload?.chosenMetrics || []),
    ];
    if (isChecked) {
      updatedColumns.push(columnTitle);
    } else {
      updatedColumns = updatedColumns.filter((title) => title !== columnTitle);
    }
    setReportByIdPayload((prevPayload: ReportsProps) => ({
      ...prevPayload,
      chosenMetrics: updatedColumns,
    }));
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
  };

  useEffect(() => {
    if (
      chosenRows &&
      reportByIdPayload?.chosenMetrics &&
      reportByIdPayload?.chosenMetrics?.length > 0
    ) {
      const filteredReports = chosenRows.map((report) => {
        const filteredReport: { [key: string]: any } = {
          ad_name: report.ad_name,
          icon: report.icon,
        };
        reportByIdPayload?.chosenMetrics.forEach((title) => {
          filteredReport[title] = report[title];
        });
        return filteredReport;
      });
      setChosenReports?.(filteredReports);
    } else {
      setChosenReports?.([]);
    }
  }, [chosenRows, reportByIdPayload?.chosenMetrics]);

  function isCheckedColumn(value: string, checkedColumnTitles: string[]) {
    return checkedColumnTitles.includes(value);
  }

  const isRowChecked = (dataId: number) => {
    const isSelected = chosenRows.some((chosenRow) => {
      return chosenRow.ad_id === dataId;
    });
    return isSelected;
  };

  return (
    <>
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
                      className={`${reportByIdPayload?.groupBy === 'ad_name' ? 'text-primary' : ''} me-2`}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Ads
                    </span>
                    {reportByIdPayload?.groupBy === 'ad_name' && (
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
                        checked={isCheckedColumn(
                          tableConfig.value,
                          reportByIdPayload?.chosenMetrics
                            ? reportByIdPayload?.chosenMetrics
                            : []
                        )}
                      />
                    )}
                    <div
                      className="d-flex flex-row no-wrap"
                      onClick={() => handleSort(tableConfig.value)}
                    >
                      <span
                        className={`${reportByIdPayload?.groupBy === tableConfig.value ? 'text-primary' : ''} me-2`}
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        {tableConfig?.title}
                      </span>
                      {reportByIdPayload?.groupBy === tableConfig.value && (
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
                      if (data?.facebookId && data.ads_id) {
                        handleOpenReportPreviewModal(
                          data?.facebookId,
                          data?.ads_id
                        );
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
      {openReportPreviewModal && (
        <ReportPreviewModal
          closeReportPreviewModal={handleCloseReportPreviewModal}
          facebookId={facebookId}
          adsId={adsId}
        />
      )}
    </>
  );
};

export default ReportsTable;
