import React, { useState, useEffect } from 'react';
import {
  ReportsTable,
  ReportsCharts,
  ReportsHeader,
  //TemporaryAdsetsData,
} from './components';
import {
  TemporaryAdsetsDataProps,
  SimplifiedReportsTableDataProps,
} from './components/reportsModels';
import { usePageData } from '../../../_metronic/layout/core';
import {
  getFacebookAdsByUserId,
  getReportsById,
} from '../../modules/apps/core/_appRequests';
import { ReportsProps } from '../../modules/apps/core/_appModels';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../modules/auth';

const Reports: React.FC = () => {
  const { currentUser, auth } = useAuth();
  const { updateReportsTrigger } = usePageData();
  const [chosenReports, setChosenReports] = useState<
    SimplifiedReportsTableDataProps[]
  >([]);
  const [reportById, setReportById] = useState<ReportsProps>();
  const [simplifiedReportsTableData, setSimplifiedReportsTableData] = useState<
    SimplifiedReportsTableDataProps[]
  >([]);
  const [temporaryAdsetsData, setTemporaryAdsetsData] = useState<
    TemporaryAdsetsDataProps[]
  >([]);

  const location = useLocation();
  const pathnameParts = location.pathname.split('/');
  const reportId = pathnameParts[pathnameParts.length - 1];

  useEffect(() => {
    const userId = currentUser?.id;
    const token = auth?.accessToken;
    const fetchReports = async () => {
      try {
        const { data } = await getReportsById(reportId);
        if (data) {
          setReportById(data);
          if (userId && token) {
            const ads = await getFacebookAdsByUserId(token, userId);
            setTemporaryAdsetsData(ads?.data);
          }
        }
      } catch (error) {
        console.log('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [updateReportsTrigger, reportId]);

  useEffect(() => {
    if (temporaryAdsetsData?.length > 0) {
      const simplified = temporaryAdsetsData.map((data) => ({
        facebookId: data.facebookAccount.facebookId,
        firstName: data.facebookAccount.firstName,
        lastName: data.facebookAccount.lastName,
        checked: false,
        ...data.adSets[0].insights,
      }));
      setSimplifiedReportsTableData(simplified);
    }
  }, [temporaryAdsetsData]);

  return (
    <div>
      {reportById && <ReportsHeader reportById={reportById} />}
      {chosenReports && chosenReports?.length > 0 && (
        <ReportsCharts chosenReports={chosenReports} />
      )}
      {simplifiedReportsTableData && (
        <ReportsTable
          reportsTableData={simplifiedReportsTableData}
          chosenReports={chosenReports}
          setChosenReports={setChosenReports}
        />
      )}
    </div>
  );
};

export default Reports;
