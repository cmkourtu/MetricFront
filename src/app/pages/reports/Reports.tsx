import React, { useState, useEffect } from 'react';
import {
  ReportsTable,
  TemporaryReportsData,
  ReportsCharts,
  ReportsHeader,
} from './components';
import { TemporaryReportsDataProps } from './components/reportsModels';
import { usePageData } from '../../../_metronic/layout/core';
import { getReportsById } from '../../modules/apps/core/_appRequests';
import { ReportsProps } from '../../modules/apps/core/_appModels';
import { useLocation } from 'react-router-dom';

const Reports: React.FC = () => {
  const { updateReportsTrigger } = usePageData();
  const [chosenReports, setChosenReports] = useState<
    TemporaryReportsDataProps[]
  >([]);
  const [reportById, setReportById] = useState<ReportsProps>();

  const location = useLocation();
  const pathnameParts = location.pathname.split('/');
  const reportId = pathnameParts[pathnameParts.length - 1];

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await getReportsById(reportId);
        if (data) {
          setReportById(data);
        }
      } catch (error) {
        console.log('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [updateReportsTrigger, reportId]);

  return (
    <div>
      {reportById && <ReportsHeader reportById={reportById} />}
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
