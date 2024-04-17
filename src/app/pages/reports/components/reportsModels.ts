import { ReportsProps } from '../../../modules/apps/core/_appModels';

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
  isActiveToken: boolean;
}

export interface AdSet {
  name: string;
  account_id: string;
  campaign_id: string;
  id: string;
}

export interface Insights {
  frequency?: number | null;
  impressions?: number | null;
  clicks?: number | null;
  reach?: number | null;
  cpc?: number | null;
  cpm?: number | null;
  spend?: number | null;
  date_start?: number | null;
  date_stop?: number | null;
  buying_type?: string | null;
  canvas_avg_view_percent?: number | null;
  canvas_avg_view_time?: number | null;
  conversion_rate_ranking?: string | null;
  cost_per_inline_link_click?: number | null;
  cost_per_unique_inline_link_click?: number | null;
  cost_per_inline_post_engagement?: number | null;
  cost_per_unique_click?: number | null;
  cpp?: number | null;
  engagement_rate_ranking?: string | null;
  inline_post_engagement?: number | null;
  inline_link_click_ctr?: number | null;
  inline_link_clicks?: number | null;
  estimated_ad_recallers?: number | null;
  instant_experience_clicks_to_open?: number | null;
  objective?: string | null;
  optimization_goal?: string | null;
  quality_ranking?: string | null;
  social_spend?: number | null;
  ad_name?: string | null;
  ad_id?: number | null;
  adset_id?: number | null;
  adset_name?: string | null;
  campaign_name?: string | null;
  campaign_id?: number | null;
  video_watched_3_s_percent?: number | null;
  video_watched_15_s_percent?: number | null;
  video_watched_30_s_percent?: number | null;
  video_watched_0_s_count?: number | null;
  video_watched_3_s_count?: number | null;
  video_watched_15_s_count?: number | null;
  video_watched_30_s_count?: number | null;
  video_watched_25_p_count?: number | null;
  video_watched_50_p_count?: number | null;
  video_watched_75_p_count?: number | null;
  video_watched_95_p_count?: number | null;
  video_watched_100_p_count?: number | null;
  first_frame_retention?: number | null;
  video_watched_25_p?: number | null;
  video_watched_50_p?: number | null;
  video_watched_75_p?: number | null;
  video_watched_95_p?: number | null;
  video_watched_100_p?: number | null;
  capture_attention?: number | null;
  hold_attention?: number | null;
  capture_attention_rate?: number | null;
  hold_attention_rate?: number | null;
  engagment?: number | null;
  engagment_percent?: number | null;
  click_to_website?: number | null;
  web_site_ctr?: number | null;
  link_clicks?: number | null;
  cpc_outbound_link_click?: number | null;
  clicks_all?: number | null;
  ipm?: number | null;
  cpa?: number | null;
  cpc_link_click?: number | null;
  cpm_all?: number | null;
  cpa_video_view?: number | null;
  cpa_link_click?: number | null;
  cost_per_3_s_plays?: number | null;
  video_retention_100p_3s?: number | null;
  video_retention_15s_3s?: number | null;
  thruplay?: number | null;
  thruplay_ctr?: number | null;
  ctr_all?: number | null;
  thumbstop?: number | null;
  thumbstop_clickrate?: number | null;
  atc?: number | null;
  video_avg_play_time?: number | null;
  video_play_curve_actions?: number[];
}

export interface Ad {
  name: string;
  id: string;
}

export interface TemporaryAdsetsDataProps {
  facebookAccount?: FacebookAccount;
  adSets?: {
    adSet: AdSet;
    insights: Insights;
    ads: Ad[];
    icon?: string;
  }[];
  updatedAt?: string;
}

export interface ReportsTableDataProps {
  reportsTableData: SimplifiedReportsTableDataProps[];
  setChosenReports?: React.Dispatch<
    React.SetStateAction<SimplifiedReportsTableDataProps[]>
  >;
  handleSort: (key: string) => void;
  sortOrder: string;
  sortColumn: string;
  checkedColumnTitles: string[];
  setCheckedColumnTitles: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ReportsChartsProps {
  chosenReports: SimplifiedReportsTableDataProps[];
}

export interface SimplifiedReportsTableDataProps {
  facebookId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  checked?: boolean | null;
  frequency?: number | null;
  impressions?: number | null;
  clicks?: number | null;
  reach?: number | null;
  spend?: number | null;
  date_start?: number | null;
  date_stop?: number | null;
  buying_type?: string | null;
  canvas_avg_view_percent?: number | null;
  canvas_avg_view_time?: number | null;
  conversion_rate_ranking?: string | null;
  engagement_rate_ranking?: string | null;
  estimated_ad_recallers?: number | null;
  instant_experience_clicks_to_open?: number | null;
  objective?: string | null;
  optimization_goal?: string | null;
  quality_ranking?: string | null;
  social_spend?: number | null;
  ad_name?: string | null;
  ad_id?: number | null;
  adset_id?: number | null;
  adset_name?: string | null;
  campaign_name?: string | null;
  campaign_id?: number | null;
  video_watched_3_s_percent?: number | null;
  video_watched_15_s_percent?: number | null;
  video_watched_30_s_percent?: number | null;
  video_watched_0_s_count?: number | null;
  video_watched_3_s_count?: number | null;
  video_watched_15_s_count?: number | null;
  video_watched_30_s_count?: number | null;
  video_watched_25_p_count?: number | null;
  video_watched_50_p_count?: number | null;
  video_watched_75_p_count?: number | null;
  video_watched_95_p_count?: number | null;
  video_watched_100_p_count?: number | null;
  first_frame_retention?: number | null;
  video_watched_25_p?: number | null;
  video_watched_50_p?: number | null;
  video_watched_75_p?: number | null;
  video_watched_95_p?: number | null;
  video_watched_100_p?: number | null;
  capture_attention?: number | null;
  hold_attention?: number | null;
  capture_attention_rate?: number | null;
  hold_attention_rate?: number | null;
  engagment?: number | null;
  engagment_percent?: number | null;
  click_to_website?: number | null;
  web_site_ctr?: number | null;
  link_clicks?: number | null;
  cpc_outbound_link_click?: number | null;
  clicks_all?: number | null;
  ipm?: number | null;
  cpa?: number | null;
  cpc_link_click?: number | null;
  cpm_all?: number | null;
  cpa_video_view?: number | null;
  cpa_link_click?: number | null;
  cost_per_3_s_plays?: number | null;
  video_retention_100p_3s?: number | null;
  video_retention_15s_3s?: number | null;
  thruplay?: number | null;
  thruplay_ctr?: number | null;
  ctr_all?: number | null;
  thumbstop?: number | null;
  thumbstop_clickrate?: number | null;
  atc?: number | null;
  icon?: string | null;
  updatedAt?: string | null;
  ads_id?: string | null;
  //video_play_curve_actions?: number[];
  [key: string]: string | number | boolean | null | undefined | string[];
}

export interface AvailableAdsProps {
  ad_name: string;
  ad_id: number;
}

export interface ReportsHeaderProps {
  reportById: ReportsProps;
  setDateFilter: React.Dispatch<React.SetStateAction<string | null>>;
  availableAds: AvailableAdsProps[];
  savedAdId: string[];
  setStartDateFilter: React.Dispatch<React.SetStateAction<Date | null>>;
  startDateFilter: Date | null;
  setEndDateFilter: React.Dispatch<React.SetStateAction<Date | null>>;
  endDateFilter: Date | null;
}

export interface CreateReportModalProps {
  closeCreateReportModal: () => void;
  isUpdate: boolean;
  reportId?: string;
  previousTitle?: string;
  previousDescription?: string;
  availableAds?: AvailableAdsProps[];
  savedAdId?: string[];
  startDateFilter?: Date | null;
  endDateFilter?: Date | null;
}

export interface PDFContentProps {
  chosenReports: SimplifiedReportsTableDataProps[];
}

export interface ReportsTableConfigProps {
  key: number;
  title: string;
  value: string;
  checkbox: boolean;
}

export interface ReportsToolbarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  generatePDF: () => void;
  checkedColumnTitles: string[];
  setCheckedColumnTitles: React.Dispatch<React.SetStateAction<string[]>>;
  updatedAt: string;
}
