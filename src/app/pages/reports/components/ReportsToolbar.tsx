import React from 'react';
import { KTIcon } from '../../../../_metronic/helpers';

interface ReportsToolbarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  generatePDF: () => void;
}

const ReportsToolbar: React.FC<ReportsToolbarProps> = ({
  searchInput,
  setSearchInput,
  generatePDF,
}) => {
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="card-body py-3">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <div className="d-flex align-items-center position-relative my-1">
          <KTIcon
            iconName="magnifier"
            className="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            className="form-control form-control-solid w-300px ps-14"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        <button
          className="btn btn-sm btn-primary fw-bold"
          onClick={generatePDF}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ReportsToolbar;
