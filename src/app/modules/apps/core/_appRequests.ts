import axios from 'axios';
import { FacebookAccountsProps, FacebookAdsProps } from '../core/_appModels';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_FACEBOOK_TOKEN = `${API_URL}/auth/facebook `;
export const GET_FACEBOOK_ACCOUNTS = `${API_URL}/facebook/accounts/facebook`;
export const GET_FACEBOOK_ADS = `${API_URL}/facebook/accounts/ad`;
export const GET_FACEBOOK_ADS_BY_FACEBOOK_ID = `${API_URL}/facebook/accounts/ad`;

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
