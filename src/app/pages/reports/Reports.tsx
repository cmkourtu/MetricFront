import React, { useState } from 'react';
import { ReportsTable, TemporaryReportsData } from './components';
import { TemporaryReportsDataProps } from './components/reportsModels';

const Reports: React.FC = () => {
  const [chosenReports, setChosenReports] = useState<
    TemporaryReportsDataProps[]
  >([]);
  console.log('Chosen', chosenReports);
  return (
    <div>
      <ReportsTable
        reportsTableData={TemporaryReportsData}
        setChosenReports={setChosenReports}
      />
    </div>
  );
};

export default Reports;
