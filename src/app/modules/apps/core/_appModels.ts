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
