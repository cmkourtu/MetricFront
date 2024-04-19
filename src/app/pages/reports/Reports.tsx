import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import {
  ReportsTable,
  ReportsCharts,
  ReportsHeader,
  TemporaryAdsetsData,
  ReportsToolbar,
  ReportsTileView,
} from './components';
import {
  TemporaryAdsetsDataProps,
  SimplifiedReportsTableDataProps,
  AvailableAdsProps,
} from './components/reportsModels';
import { usePageData } from '../../../_metronic/layout/core';
import {
  getFacebookAdsByUserId,
  getReportsById,
  updateReport,
} from '../../modules/apps/core/_appRequests';
import { ReportsProps } from '../../modules/apps/core/_appModels';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../modules/auth';
import { getQueryString } from '../../../_metronic/helpers/reportsHelpers';

const Reports: React.FC = () => {
  const { currentUser, auth } = useAuth();
  const { reportByIdPayload, setReportByIdPayload } = usePageData();
  const [chosenReports, setChosenReports] = useState<
    SimplifiedReportsTableDataProps[]
  >([]);
  const [reportById, setReportById] = useState<ReportsProps>();
  const [temporaryAdsetsData, setTemporaryAdsetsData] = useState<
    TemporaryAdsetsDataProps[]
  >([]);
  const [simplifiedReportsTableData, setSimplifiedReportsTableData] = useState<
    SimplifiedReportsTableDataProps[]
  >([]);
  const [searchedData, setSearchedData] = useState<
    SimplifiedReportsTableDataProps[]
  >([]);

  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [availableAds, setAvailableAds] = useState<AvailableAdsProps[]>([]);
  const [savedAdId, setSavedAdId] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [searchInput, setSearchInput] = useState<string>('');
  const userId = currentUser?.id;
  const token = auth?.accessToken;
  const location = useLocation();
  const pathnameParts = location.pathname.split('/');
  const reportId = pathnameParts[pathnameParts.length - 1];
  const pdfContentRef = useRef(null);

  useEffect(() => {
    setReportById(undefined);
    setTemporaryAdsetsData([]);
    setSimplifiedReportsTableData([]);
    setChosenReports([]);
    setSortOrder('ASC');
    setSavedAdId([]);
    setSearchInput('');
    setDateFilter(null);
  }, [reportId]);

  const updateReportById = async (report: ReportsProps) => {
    try {
      const { data } = await updateReport(report);
      if (data) {
        setReportById(data);
        setReportByIdPayload(data);
      }
    } catch (error) {
      console.log('Error updating report:', error);
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await getReportsById(reportId);
        if (data) {
          setReportByIdPayload(data);
          setReportById(data);
          const startDate = data?.startDate ? new Date(data?.startDate) : null;
          const endDate = data?.endDate ? new Date(data?.endDate) : null;
          const dateFilter = getQueryString(startDate, endDate);
          setDateFilter(dateFilter);
          if (data?.adSets?.length > 0) {
            const adIdToSave = data.adSets;
            setSavedAdId(adIdToSave);
          }
        }
      } catch (error) {
        console.log('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, [reportId]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        if (userId && token) {
          const ads = await getFacebookAdsByUserId(token, reportId, dateFilter);
          const extractedAds = ads?.data.flatMap(
            (adData: TemporaryAdsetsDataProps) =>
              adData.adSets?.map((adSet) => ({
                ad_name: adSet.adSet.name,
                ad_id: adSet.insights.ad_id,
              })) || []
          );
          setAvailableAds(extractedAds);
          setTemporaryAdsetsData(ads?.data);
        }
      } catch (error) {
        console.log('Error fetching reports:', error);
      }
    };
    fetchAds();
  }, [reportById]);

  useEffect(() => {
    if (temporaryAdsetsData?.length > 0) {
      const simplified: SimplifiedReportsTableDataProps[] =
        temporaryAdsetsData.flatMap((data) => {
          return (data.adSets || []).map((adSet) => {
            const { video_play_curve_actions, ...otherInsights } =
              adSet?.insights || {};
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
              facebookId: data.facebookAccount?.facebookId || '',
              firstName: data.facebookAccount?.firstName || '',
              lastName: data.facebookAccount?.lastName || '',
              checked: false,
              ...roundedInsights,
              icon: adSet?.icon || null,
              updatedAt: data.updatedAt || '',
              ads_id: adSet.ads[0]?.id || null,
            };
          });
        });

      if (savedAdId.length > 0 && simplified.length > 0) {
        const matchedItems = simplified.filter((item) =>
          savedAdId.includes(Number(item.ad_id))
        );
        setSimplifiedReportsTableData(matchedItems);
      } else if (simplified.length > 0) {
        setSimplifiedReportsTableData(simplified);
      }
    } else {
      setSimplifiedReportsTableData([]);
      setChosenReports([]);
    }
  }, [temporaryAdsetsData]);

  useEffect(() => {
    if (simplifiedReportsTableData.length < 1) {
      return;
    } else if (
      simplifiedReportsTableData.length > 0 &&
      searchInput.length > 0
    ) {
      const filteredData = simplifiedReportsTableData.filter(
        (item) =>
          item.ad_name &&
          item.ad_name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchedData(filteredData);
    } else {
      setSearchedData(simplifiedReportsTableData);
    }
  }, [simplifiedReportsTableData, searchInput]);

  const handleSort = (column: string) => {
    if (column === reportByIdPayload?.groupBy) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setReportByIdPayload((prevPayload: ReportsProps) => ({
        ...prevPayload,
        groupBy: column,
      }));
      setSortOrder('ASC');
    }
  };

  const sortedData = searchedData.sort((a, b) => {
    if (reportByIdPayload?.groupBy) {
      const valueA = a[reportByIdPayload?.groupBy];
      const valueB = b[reportByIdPayload?.groupBy];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'ASC'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'ASC' ? valueA - valueB : valueB - valueA;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });

  const generatePDF = useReactToPrint({
    content: () => pdfContentRef.current,
    documentTitle: reportById?.name || 'Report',
  });

  return (
    <div className="p-10" ref={pdfContentRef}>
      {reportById && (
        <ReportsHeader
          reportById={reportById}
          updateReportById={updateReportById}
          setDateFilter={setDateFilter}
          availableAds={availableAds}
          savedAdId={savedAdId}
        />
      )}
      {chosenReports &&
        chosenReports?.length > 0 &&
        (reportByIdPayload?.viewMode === 'chart' ||
          reportByIdPayload?.viewMode === null) && (
          <ReportsCharts chosenReports={chosenReports} />
        )}
      {chosenReports &&
        chosenReports?.length > 0 &&
        reportByIdPayload?.viewMode === 'tile' && (
          <ReportsTileView chosenReports={chosenReports} />
        )}

      <ReportsToolbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        generatePDF={generatePDF}
        updatedAt={reportById?.updatedAt ?? ''}
      />
      {simplifiedReportsTableData?.length > 0 && (
        <ReportsTable
          reportsTableData={sortedData}
          setChosenReports={setChosenReports}
          handleSort={handleSort}
          sortOrder={sortOrder}
        />
      )}
    </div>
  );
};

export default Reports;
