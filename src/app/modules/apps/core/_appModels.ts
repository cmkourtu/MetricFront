export interface FacebookAccountsProps {
  facebookId: string;
  firstName: string;
  lastName: string;
}

interface AdAccountProps {
  id: string;
  name: string;
  currency: string;
}

interface FacebookAccountProps {
  facebookId: string;
  firstName: string;
  lastName: string;
}

export interface FacebookAdsProps {
  facebookAccount: FacebookAccountProps;
  adAccounts: AdAccountProps[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

export interface ReportsProps {
  id: string | null;
  name: string | null;
  description: string | null;
  metrics: string[] | [];
  adSets: number[] | [];
  viewMode: string | null;
  startDate: any | null;
  endDate: any | null;
  groupBy: string | null;
  chosenMetrics: string[] | [];
  chosenAdSets: number[] | null;
  userId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
