import React, { useState, useEffect } from 'react';
import {
  ReportsTable,
  ReportsCharts,
  ReportsHeader,
  TemporaryAdsetsData,
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

  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [sortColumn, setSortColumn] = useState<string>('');

  const location = useLocation();
  const pathnameParts = location.pathname.split('/');
  const reportId = pathnameParts[pathnameParts.length - 1];

  useEffect(() => {
    setReportById(undefined);
    setTemporaryAdsetsData([]);
    setSimplifiedReportsTableData([]);
    setChosenReports([]);
    setSortColumn('');
    setSortOrder('ASC');
  }, [reportId]);

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
      const simplified = temporaryAdsetsData.flatMap((data) => {
        return data.adSets.map((adSet) => {
          const { video_play_curve_actions, ...otherInsights } =
            adSet.insights || {};
          const roundedInsights: { [key: string]: any } = {};
          for (const [key, value] of Object.entries(otherInsights)) {
            if (typeof value === 'number') {
              roundedInsights[key] =
                Math.round((value + Number.EPSILON) * 100) / 100;
            } else {
              roundedInsights[key] = value;
            }
          }
          return {
            facebookId: data.facebookAccount.facebookId || '',
            firstName: data.facebookAccount.firstName || '',
            lastName: data.facebookAccount.lastName || '',
            checked: false,
            ...roundedInsights,
          };
        });
      });
      setSimplifiedReportsTableData(simplified);
    } else {
      setSimplifiedReportsTableData([]);
      setChosenReports([]);
    }
  }, [temporaryAdsetsData, updateReportsTrigger]);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortColumn(column);
      setSortOrder('ASC');
    }
  };

  const sortedData = simplifiedReportsTableData.sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'ASC'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'ASC' ? valueA - valueB : valueB - valueA;
    } else {
      return 0;
    }
  });

  return (
    <div>
      {reportById && <ReportsHeader reportById={reportById} />}
      {chosenReports && chosenReports?.length > 0 && (
        <ReportsCharts chosenReports={chosenReports} />
      )}
      {simplifiedReportsTableData?.length > 0 && (
        <ReportsTable
          reportsTableData={sortedData}
          setChosenReports={setChosenReports}
          handleSort={handleSort}
          sortOrder={sortOrder}
          sortColumn={sortColumn}
        />
      )}
    </div>
  );
};

export default Reports;
