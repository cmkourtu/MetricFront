import React from 'react';

const ReportsHeader: React.FC = () => {
  return (
    <div className="d-flex fv-rowrow align-items-center justify-content-between cursor-pointer mb-6">
      <h1>Reports</h1>
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
