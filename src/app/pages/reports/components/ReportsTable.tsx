import React from 'react';
import { KTIcon } from '../../../../_metronic/helpers';
import { ReportsTableDataProps } from './reportsModels';

const ReportsTable: React.FC<ReportsTableDataProps> = ({
  reportsTableData,
  setChosenReports,
}) => {
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
      spent: report.spent,
    }));
    setChosenReports(selectedAds);
  };
  return (
    <div className="table-responsive">
      <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
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
                />
              </div>
            </th>
            <th className="min-w-150px">Ads</th>
            <th className="min-w-140px d-flex flex-row align-items-center justify-content-start">
              <div className="form-check form-check-sm form-check-custom form-check-solid ms-auto me-2">
                <input
                  className="form-check-input "
                  type="checkbox"
                  value="1"
                  data-kt-check="true"
                  data-kt-check-target=".widget-13-check"
                />
              </div>
              <span className="">Spent</span>
            </th>
            <th className="min-w-120px">Purchase Value</th>
            <th className="min-w-120px">ROAS</th>
            <th className="min-w-120px">Purchase Ratio</th>
            <th className="min-w-120px">Purchases</th>
            <th className="min-w-120px">Thumbstop</th>
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
