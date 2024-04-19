import axios from 'axios';
import {
  FacebookAccountsProps,
  FacebookAdsProps,
  ReportsProps,
} from '../core/_appModels';
import { getFormattedDate } from '../../../../_metronic/helpers/reportsHelpers';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_FACEBOOK_TOKEN = `${API_URL}/auth/facebook `;
export const GET_FACEBOOK_ACCOUNTS = `${API_URL}/facebook/accounts/facebook`;
export const GET_FACEBOOK_ADS = `${API_URL}/facebook/accounts/ad`;
export const GET_FACEBOOK_ADS_BY_FACEBOOK_ID = `${API_URL}/facebook/accounts/ad`;
export const GET_FACEBOOK_ADS_BY_USER_ID = `${API_URL}/facebook/adsets/report`;
export const GET_ADSETS_PREVIEW = `${API_URL}/facebook/ads/insight/facebook`;
export const CREATE_REPORT = `${API_URL}/reports`;
export const GET_ALL_REPORTS = `${API_URL}/reports`;
export const GET_REPORTS_BY_USER_ID = `${API_URL}/reports/user`;
export const GET_REPORT_BY_ID = `${API_URL}/reports`;
export const UPDATE_REPORT = `${API_URL}/reports`;
export const DELETE_REPORT = `${API_URL}/reports`;

export function getFacebookToken(jwtToken: string, code: string) {
  return axios.post(
    GET_FACEBOOK_TOKEN,
    { code },
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
}

export function getFacebookAccounts(jwtToken: string) {
  return axios.get<FacebookAccountsProps[]>(GET_FACEBOOK_ACCOUNTS, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
}

export function getFacebookAds(jwtToken: string) {
  return axios.get<FacebookAdsProps[]>(GET_FACEBOOK_ADS, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
}

export function getFacebookAdsByFacebookId(
  jwtToken: string,
  facebookId: string
) {
  return axios.get<FacebookAdsProps>(
    `${GET_FACEBOOK_ADS_BY_FACEBOOK_ID}/${facebookId}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
}

export function getFacebookAdsByUserId(
  jwtToken: string,
  reportId: string,
  dateQueryString?: string | null
) {
  return axios.get(
    `${GET_FACEBOOK_ADS_BY_USER_ID}/${reportId}${dateQueryString ? `?${dateQueryString}` : ''}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
}

export function getAdsetsPreview(
  jwtToken: string,
  facebookId: string,
  adId: string
) {
  return axios.get(`${GET_ADSETS_PREVIEW}/${facebookId}/ad/${adId}/preview`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
}

export function createReport(
  userId: string,
  reportTitle: string,
  reportDescription?: string,
  startedDate?: string | null | Date,
  endedDate?: string | null | Date
) {
  return axios.post(CREATE_REPORT, {
    name: reportTitle,
    description: reportDescription,
    userId: userId,
    startDate: getFormattedDate(startedDate ? new Date(startedDate) : null),
    endDate: getFormattedDate(endedDate ? new Date(endedDate) : null),
  });
}

export function getAllReports() {
  return axios.get<ReportsProps[]>(GET_ALL_REPORTS);
}

export function getReportsByUserId(userId: string) {
  return axios.get<ReportsProps[]>(`${GET_REPORTS_BY_USER_ID}/${userId}`);
}

export function getReportsById(reportId: string) {
  return axios.get<ReportsProps>(`${GET_REPORT_BY_ID}/${reportId}`);
}

export function updateReport(reportByIdPayload: ReportsProps) {
  return axios.put<ReportsProps>(`${UPDATE_REPORT}/${reportByIdPayload?.id}`, {
    id: reportByIdPayload?.id,
    name: reportByIdPayload?.name,
    description: reportByIdPayload?.description,
    userId: reportByIdPayload?.userId,
    startDate: getFormattedDate(
      reportByIdPayload?.startDate
        ? new Date(reportByIdPayload?.startDate)
        : null
    ),
    endDate: getFormattedDate(
      reportByIdPayload?.endDate ? new Date(reportByIdPayload?.endDate) : null
    ),
    adSets: reportByIdPayload?.adSets,
    metrics: reportByIdPayload?.metrics,
    viewMode: reportByIdPayload?.viewMode
      ? reportByIdPayload?.viewMode
      : 'chart',
    groupBy: reportByIdPayload?.groupBy,
    chosenMetrics: reportByIdPayload?.chosenMetrics,
    chosenAdSets: reportByIdPayload?.chosenAdSets,
    createdAt: reportByIdPayload?.createdAt,
    updatedAt: reportByIdPayload?.updatedAt,
  });
}

export function deleteReport(reportId: string) {
  return axios.delete(`${DELETE_REPORT}/${reportId}`);
}
