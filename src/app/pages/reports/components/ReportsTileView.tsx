import React from 'react';

import { ReportsTileViewProps } from './reportsModels';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';

const ReportsTileView: React.FC<ReportsTileViewProps> = ({ chosenReports }) => {
  const cropString = (str: string | undefined | null) => {
    if (!str) {
      return '---';
    }
    if (str.length <= 30) {
      return str;
    } else {
      return str.slice(0, 30) + '...';
    }
  };

  return (
    <div className="row g-5 g-xl-8">
      {chosenReports.map((ads, index) => (
        <div className="col-xl-4" style={{ maxWidth: '400px' }} key={index}>
          <div className="card bgi-no-repeat bgi-position-y-top bgi-position-x-end statistics-widget-1 card-xl-stretch mb-xl-8">
            <div className="card-body">
              <span className="card-title fw-bold text-muted fs-4">
                {cropString(ads?.ad_name)}
              </span>
              <div className="fw-bold text-primary my-6">
                <img
                  src={
                    ads?.icon
                      ? ads?.icon
                      : toAbsoluteUrl('media/auth/404-error.png')
                  }
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </div>
              {Object.entries(ads).map(
                ([key, value]) =>
                  key !== 'ad_name' &&
                  key !== 'icon' && (
                    <div
                      key={key}
                      className="d-flex flex-row align-items-center justify-content-between mb-4 border-bottom"
                    >
                      <span className="text-gray-900-75 fw-semibold fs-6 m-0">
                        {key}
                      </span>
                      <span className="text-gray-900-75 fw-semibold fs-6 m-0">
                        {value === undefined ? '---' : value}
                      </span>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportsTileView;
