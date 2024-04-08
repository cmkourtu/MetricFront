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
  id: string;
  name: string;
  description: string;
  metrics: any | null;
  adSets: any | null;
  viewMode: any | null;
  startDate: any | null;
  endDate: any | null;
  groupBy: any | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
