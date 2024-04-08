import React from 'react';

import { ReportsProps } from '../../../modules/apps/core/_appModels';

interface ReportsHeaderProps {
  reportById: ReportsProps;
}

const ReportsHeader: React.FC<ReportsHeaderProps> = ({ reportById }) => {
  return (
    <div className="d-flex fv-rowrow align-items-center justify-content-between cursor-pointer mb-6">
      <h1>{reportById?.name}</h1>
      <div>
        <a href="#" className="btn btn-sm btn-flex btn-light fw-bold">
          Filter
        </a>
        <a href="#" className="btn btn-sm fw-bold btn-primary">
          Create
        </a>
      </div>
    </div>
  );
};

export default ReportsHeader;
