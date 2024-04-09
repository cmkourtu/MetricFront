export interface TemporaryReportsDataProps {
  [key: string]: any;
  ads: string;
  spent?: string;
  purchaseValue?: string;
  roas?: string;
  purchaseRatio?: string;
  purchases?: number;
  thumbstop?: string;
  selected?: boolean;
}

export interface FacebookAccount {
  facebookId: string;
  firstName: string;
  lastName: string;
}

export interface AdSet {
  name: string;
  account_id: string;
  campaign_id: string;
  id: string;
}

export interface Insights {
  frequency?: number;
  impressions?: number;
  clicks?: number;
  reach?: number;
  spend?: number;
  date_start?: number;
  date_stop?: number;
  buying_type?: string;
  canvas_avg_view_percent?: number;
  canvas_avg_view_time?: number;
  conversion_rate_ranking?: string;
  engagement_rate_ranking?: string;
  estimated_ad_recallers?: number;
  instant_experience_clicks_to_open?: number;
  objective?: string;
  optimization_goal?: string;
  quality_ranking?: string;
  social_spend?: number;
  ad_name?: string;
  ad_id?: number;
  adset_id?: number;
  adset_name?: string;
  campaign_name?: string;
  campaign_id?: number;
  video_watched_3_s_percent?: number;
  video_watched_15_s_percent?: number;
  video_watched_30_s_percent?: number;
  video_watched_0_s_count?: number;
  video_watched_3_s_count?: number;
  video_watched_15_s_count?: number;
  video_watched_30_s_count?: number;
  video_watched_25_p_count?: number;
  video_watched_50_p_count?: number;
  video_watched_75_p_count?: number;
  video_watched_95_p_count?: number;
  video_watched_100_p_count?: number;
  first_frame_retention?: number;
  video_watched_25_p?: number;
  video_watched_50_p?: number;
  video_watched_75_p?: number;
  video_watched_95_p?: number;
  video_watched_100_p?: number;
  capture_attention?: number;
  hold_attention?: number;
  capture_attention_rate?: number;
  hold_attention_rate?: number;
  engagment?: number;
  engagment_percent?: number;
  click_to_website?: number;
  web_site_ctr?: number;
  link_clicks?: number;
  cpc_outbound_link_click?: number;
  clicks_all?: number;
  ipm?: number;
  cpa?: number;
  cpc_link_click?: number;
  cpm_all?: number;
  cpa_video_view?: number;
  cpa_link_click?: number;
  cost_per_3_s_plays?: number;
  video_retention_100p_3s?: number;
  video_retention_15s_3s?: number;
  thruplay?: string | null;
  thruplay_ctr?: number;
  ctr_all?: string | null;
  thumbstop?: number;
  thumbstop_clickrate?: number;
  atc?: number;
  video_play_curve_actions?: string[];
}

export interface Ad {
  name: string;
  id: string;
}

export interface TemporaryAdsetsDataProps {
  facebookAccount: FacebookAccount;
  adSets: {
    adSet: AdSet;
    insights: Insights;
    ads: Ad[];
  }[];
}

export interface ReportsTableDataProps {
  reportsTableData: SimplifiedReportsTableDataProps[];
  chosenReports?: SimplifiedReportsTableDataProps[];
  setChosenReports?: React.Dispatch<
    React.SetStateAction<SimplifiedReportsTableDataProps[]>
  >;
}

export interface ReportsChartsProps {
  chosenReports: SimplifiedReportsTableDataProps[];
}

export interface SimplifiedReportsTableDataProps {
  facebookId?: string;
  firstName?: string;
  lastName?: string;
  checked?: boolean;
  frequency?: number;
  impressions?: number;
  clicks?: number;
  reach?: number;
  spend?: number;
  date_start?: number;
  date_stop?: number;
  buying_type?: string;
  canvas_avg_view_percent?: number;
  canvas_avg_view_time?: number;
  conversion_rate_ranking?: string;
  engagement_rate_ranking?: string;
  estimated_ad_recallers?: number;
  instant_experience_clicks_to_open?: number;
  objective?: string;
  optimization_goal?: string;
  quality_ranking?: string;
  social_spend?: number;
  ad_name?: string;
  ad_id?: number;
  adset_id?: number;
  adset_name?: string;
  campaign_name?: string;
  campaign_id?: number;
  video_watched_3_s_percent?: number;
  video_watched_15_s_percent?: number;
  video_watched_30_s_percent?: number;
  video_watched_0_s_count?: number;
  video_watched_3_s_count?: number;
  video_watched_15_s_count?: number;
  video_watched_30_s_count?: number;
  video_watched_25_p_count?: number;
  video_watched_50_p_count?: number;
  video_watched_75_p_count?: number;
  video_watched_95_p_count?: number;
  video_watched_100_p_count?: number;
  first_frame_retention?: number;
  video_watched_25_p?: number;
  video_watched_50_p?: number;
  video_watched_75_p?: number;
  video_watched_95_p?: number;
  video_watched_100_p?: number;
  capture_attention?: number;
  hold_attention?: number;
  capture_attention_rate?: number;
  hold_attention_rate?: number;
  engagment?: number;
  engagment_percent?: number;
  click_to_website?: number;
  web_site_ctr?: number;
  link_clicks?: number;
  cpc_outbound_link_click?: number;
  clicks_all?: number;
  ipm?: number;
  cpa?: number;
  cpc_link_click?: number;
  cpm_all?: number;
  cpa_video_view?: number;
  cpa_link_click?: number;
  cost_per_3_s_plays?: number;
  video_retention_100p_3s?: number;
  video_retention_15s_3s?: number;
  thruplay?: string | null;
  thruplay_ctr?: number;
  ctr_all?: string | null;
  thumbstop?: number;
  thumbstop_clickrate?: number;
  atc?: number;
  video_play_curve_actions?: string[];
  [key: string]: string | number | boolean | null | undefined | string[];
}
