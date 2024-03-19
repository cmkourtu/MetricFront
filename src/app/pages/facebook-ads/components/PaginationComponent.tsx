import React from 'react';
import { KTIcon } from '../../../../_metronic/helpers';
import { PaginationProps } from '../../../modules/apps/core/_appModels';

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
}) => {
  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => paginate(1)}>
            First
          </button>
        </li>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => paginate(currentPage - 1)}
          >
            <KTIcon iconName="left" className="fs-2" />
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
          >
            <button className="page-link" onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <button
            className="page-link"
            onClick={() => paginate(currentPage + 1)}
          >
            <KTIcon iconName="right" className="fs-2" />
          </button>
        </li>
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <button className="page-link" onClick={() => paginate(totalPages)}>
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
