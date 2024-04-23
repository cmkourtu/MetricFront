import axios from 'axios';
import {
  FacebookAccountsProps,
  FacebookAdsProps,
  ReportsProps,
  SubscriptionPlansDataProps,
  PaymentMethodProps,
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
export const GET_SUBSCRIPTION_PLANS_URL = `${API_URL}/subscriptionPlans`;
export const SUBSCRIBE_URL = `${API_URL}/subscriptions`;
export const UNSUBSCRIBE_URL = `${API_URL}/subscriptions`;
export const ADD_PAYMENT_METHOD = `${API_URL}/card`;
export const GET_PAYMENT_METHODS = `${API_URL}/card/me`;
export const DELETE_PAYMENT_METHOD = `${API_URL}/card`;

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
    startDate: reportByIdPayload?.startDate
      ? getFormattedDate(new Date(reportByIdPayload?.startDate))
      : null,
    endDate: reportByIdPayload?.endDate
      ? getFormattedDate(new Date(reportByIdPayload?.endDate))
      : null,
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

export function getSubscriptionPlans() {
  return axios.get<SubscriptionPlansDataProps[]>(GET_SUBSCRIPTION_PLANS_URL);
}

export function subscribe(subscriptionPlanId: string) {
  return axios.post(SUBSCRIBE_URL, { subscriptionPlanId });
}

export function unsubscribe() {
  return axios.delete(UNSUBSCRIBE_URL);
}

export function addPaymentMethod(
  token: string,
  cardNumber: string,
  expMonth: number,
  expYear: number,
  paymentMethodId: string
) {
  return axios.post(
    ADD_PAYMENT_METHOD,
    {
      number: cardNumber,
      expMonth: expMonth,
      expYear: expYear,
      stripePaymentMethodId: paymentMethodId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function getPaymentMethods(token: string) {
  return axios.get<PaymentMethodProps[]>(GET_PAYMENT_METHODS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deletePaymentMethod(token: string, paymentMethodId: string) {
  return axios.delete(`${DELETE_PAYMENT_METHOD}/${paymentMethodId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
