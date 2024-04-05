import React, { useState } from 'react';
import {
  ReportsTable,
  TemporaryReportsData,
  ReportsCharts,
  ReportsHeader,
} from './components';
import { TemporaryReportsDataProps } from './components/reportsModels';
import { ToolbarClassic } from '../../../_metronic/layout/components/toolbar/toolbars';

const Reports: React.FC = () => {
  const [chosenReports, setChosenReports] = useState<
    TemporaryReportsDataProps[]
  >([]);

  return (
    <div>
      <ReportsHeader />
      {chosenReports.length > 0 && (
        <ReportsCharts chosenReports={chosenReports} />
      )}
      <ReportsTable
        reportsTableData={TemporaryReportsData}
        chosenReports={chosenReports}
        setChosenReports={setChosenReports}
      />
    </div>
  );
};

export default Reports;
