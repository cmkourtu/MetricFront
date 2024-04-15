import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import {
  ReportsTable,
  ReportsCharts,
  ReportsHeader,
  TemporaryAdsetsData,
  ReportPreviewModal,
  ReportsToolbar,
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
  const [savedAdId, setSavedAdId] = useState<string[]>([]);
  const [startDateFilter, setStartDateFilter] = useState<Date | null>(null);
  const [endDateFilter, setEndDateFilter] = useState<Date | null>(null);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [sortColumn, setSortColumn] = useState<string>('');
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
    setSortColumn('');
    setSortOrder('ASC');
    setSavedAdId([]);
    setStartDateFilter(null);
    setEndDateFilter(null);
    setDateFilter(null);
    setSearchInput('');
  }, [reportId]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await getReportsById(reportId);
        if (data) {
          setReportById(data);
          if (data?.startDate && data?.endDate) {
            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);
            setStartDateFilter(data.startDate);
            setEndDateFilter(data.endDate);

            // Extracting date components
            const startYear = startDate.getFullYear();
            const startMonth = String(startDate.getMonth() + 1).padStart(
              2,
              '0'
            );
            const startDay = String(startDate.getDate()).padStart(2, '0');

            const endYear = endDate.getFullYear();
            const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
            const endDay = String(endDate.getDate()).padStart(2, '0');
            // Creating query string
            const queryString = `start=${startYear}-${startMonth}-${startDay}&end=${endYear}-${endMonth}-${endDay}`;
            setDateFilter(queryString);
          } else {
            setEndDateFilter(null);
            setStartDateFilter(null);
            setDateFilter(null);
          }
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
  }, [updateReportsTrigger, reportId]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        if (userId && token) {
          let ads;
          if (dateFilter) {
            ads = await getFacebookAdsByUserId(token, reportId, dateFilter);
          } else {
            ads = await getFacebookAdsByUserId(token, reportId);
          }

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
  }, [updateReportsTrigger, reportId, dateFilter]);

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
          savedAdId.includes(String(item.ad_id))
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
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortColumn(column);
      setSortOrder('ASC');
    }
  };

  const sortedData = searchedData.sort((a, b) => {
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

  const generatePDF = useReactToPrint({
    content: () => pdfContentRef.current,
    documentTitle: 'Results',
  });

  return (
    <div className="p-10" ref={pdfContentRef}>
      {reportById && (
        <ReportsHeader
          reportById={reportById}
          setDateFilter={setDateFilter}
          availableAds={availableAds}
          savedAdId={savedAdId}
          startDateFilter={startDateFilter}
          endDateFilter={endDateFilter}
        />
      )}
      {chosenReports && chosenReports?.length > 0 && (
        <ReportsCharts chosenReports={chosenReports} />
      )}
      <ReportsToolbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        generatePDF={generatePDF}
      />
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
