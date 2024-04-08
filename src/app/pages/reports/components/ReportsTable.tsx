import React, { useState, useEffect } from 'react';
import { KTIcon } from '../../../../_metronic/helpers';
import { ReportsTableDataProps } from './reportsModels';

const ReportsTable: React.FC<ReportsTableDataProps> = ({
  reportsTableData,
  setChosenReports,
  chosenReports,
}) => {
  const [updateReportsTrigger, setUpdateReportsTrigger] = useState(false);
  const [checkedColumnTitles, setCheckedColumnTitles] = useState<string[]>([]);

  const handleCheckboxChange = (index: number) => {
    const updatedChosenReports = [...reportsTableData];
    if (!updatedChosenReports[index].selected) {
      updatedChosenReports[index].selected = false;
    }
    updatedChosenReports[index].selected =
      !updatedChosenReports[index].selected;
    const selectedReports = updatedChosenReports.filter(
      (report) => report.selected
    );

    const selectedAds = selectedReports.map((report) => ({
      ads: report.ads,
    }));
    setChosenReports(selectedAds);
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

  useEffect(() => {
    if (chosenReports.length < 1 || checkedColumnTitles.length < 1) {
      return;
    }
    const updatedChosenReports = [...reportsTableData].map((report) => {
      const newReport: any = { ads: report.ads };
      checkedColumnTitles.forEach((title) => {
        if (report.hasOwnProperty(title)) {
          newReport[title] = report[title];
        }
      });
      return newReport;
    });

    const filteredReports = chosenReports
      .map((chosenReport) => {
        return updatedChosenReports.find(
          (report) => report.ads === chosenReport.ads
        );
      })
      .filter((filteredReport) => filteredReport !== undefined);
    setChosenReports(filteredReports);
  }, [updateReportsTrigger]);

  return (
    <div className="table-responsive">
      <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
        <thead>
          <tr className="fw-bold text-muted">
            <th className="w-25px">
              <div className="form-check form-check-sm form-check-custom form-check-solid">
                {/*<input
                  className="form-check-input"
                  type="checkbox"
                  value="1"
                  data-kt-check="true"
                  data-kt-check-target=".widget-13-check"
  />*/}
              </div>
            </th>
            <th className="min-w-150px">Ads</th>
            <th className="min-w-20px">
              <span className="">Spent</span>
            </th>
            <th>
              <div className="form-check form-check-sm form-check-custom form-check-solid ms-auto ">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value="1"
                  data-kt-check="true"
                  data-kt-check-target=".widget-13-check"
                  onChange={(e) =>
                    handleColumnCheck('purchaseValue', e.target.checked)
                  }
                />
                <span>Purchase Value</span>
              </div>
            </th>
            <th>
              <div className="form-check form-check-sm form-check-custom form-check-solid ms-auto ">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value="1"
                  data-kt-check="true"
                  data-kt-check-target=".widget-13-check"
                  onChange={(e) => handleColumnCheck('roas', e.target.checked)}
                />
                <span>ROAS</span>
              </div>
            </th>
            <th>
              <div className="form-check form-check-sm form-check-custom form-check-solid ms-auto ">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value="1"
                  data-kt-check="true"
                  data-kt-check-target=".widget-13-check"
                  onChange={(e) =>
                    handleColumnCheck('purchaseRatio', e.target.checked)
                  }
                />
                <span>Purchase Ratio</span>
              </div>
            </th>
            <th className="min-w-120px">Purchases</th>
            <th className="min-w-120px">
              <div className="form-check form-check-sm form-check-custom form-check-solid ms-auto ">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value="1"
                  data-kt-check="true"
                  data-kt-check-target=".widget-13-check"
                  onChange={(e) =>
                    handleColumnCheck('thumbstop', e.target.checked)
                  }
                />
                <span className="">Thumbstop</span>
              </div>
            </th>
            <th className="min-w-100px text-end">Actions</th>
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
                    onChange={() => handleCheckboxChange(index)}
                  />
                </div>
              </td>
              <td>
                <a
                  href="#"
                  className="text-gray-900 fw-bold text-hover-primary fs-6"
                >
                  {data.ads}
                </a>
              </td>
              <td>
                <a
                  href="#"
                  className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                >
                  {data.spent}
                </a>
              </td>
              <td>
                <a
                  href="#"
                  className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                >
                  {data.purchaseValue}
                </a>
              </td>
              <td>
                <a
                  href="#"
                  className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                >
                  {data.roas}
                </a>
              </td>
              <td>
                <a
                  href="#"
                  className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                >
                  {data.purchaseRatio}
                </a>
              </td>
              <td>
                <a
                  href="#"
                  className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                >
                  {data.purchases}
                </a>
              </td>
              <td>
                <a
                  href="#"
                  className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                >
                  {data.thumbstop}
                </a>
              </td>
              <td className="text-end">
                <a
                  href="#"
                  className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                >
                  <KTIcon iconName="switch" className="fs-3" />
                </a>
                <a
                  href="#"
                  className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                >
                  <KTIcon iconName="pencil" className="fs-3" />
                </a>
                <a
                  href="#"
                  className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                >
                  <KTIcon iconName="trash" className="fs-3" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
