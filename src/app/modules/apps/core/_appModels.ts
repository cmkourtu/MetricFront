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

export interface SubscriptionPlansDataProps {
  id: string;
  stripeSubscriptionPlanId: string;
  name: string;
  description: string | null;
  price: string;
  interval: 'month' | 'year';
  userLimit: number | null;
  isActive: boolean;
  trialPeriodDays: number | null;
  isTrialPeriodAllowed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SelectedRangeProps {
  startDate: Date | null;
  endDate: Date | null;
  key: string;
}

export interface PaymentMethodProps {
  id: string;
  object: string;
  allow_redisplay: string;
  billing_details: {
    address: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      state: string | null;
    };
    email: string | null;
    name: string | null;
    phone: string | null;
  };
  card: {
    brand: string;
    checks: {
      address_line1_check: string | null;
      address_postal_code_check: string | null;
      cvc_check: string | null;
    };
    country: string;
    display_brand: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: string | null;
    last4: string;
    networks: {
      available: string[];
      preferred: string | null;
    };
    three_d_secure_usage: {
      supported: boolean;
    };
    wallet: string | null;
  };
  created: number;
  customer: string;
  livemode: boolean;
  metadata: Record<string, any>;
  radar_options: Record<string, any>;
  type: string;
  isDefault: boolean;
  name: string | null;
}
