export interface AuthModel {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserAddressModel {
  addressLine: string;
  city: string;
  state: string;
  postCode: string;
}

export interface UserCommunicationModel {
  email: boolean;
  sms: boolean;
  phone: boolean;
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean;
  sendCopyToPersonalEmail?: boolean;
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean;
    youAreSentADirectMessage?: boolean;
    someoneAddsYouAsAsAConnection?: boolean;
    uponNewOrder?: boolean;
    newMembershipApproval?: boolean;
    memberRegistration?: boolean;
  };
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean;
    tipsOnGettingMoreOutOfKeen?: boolean;
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean;
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean;
    tipsOnStartBusinessProducts?: boolean;
  };
}

export interface UserSocialNetworksModel {
  linkedIn: string;
  facebook: string;
  twitter: string;
  instagram: string;
}

export interface UserModel {
  id: number;
  username: string;
  password: string | undefined;
  email: string;
  first_name: string;
  last_name: string;
  fullname?: string;
  occupation?: string;
  companyName?: string;
  phone?: string;
  roles?: Array<number>;
  pic?: string;
  language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru';
  timeZone?: string;
  website?: 'https://keenthemes.com';
  emailSettings?: UserEmailSettingsModel;
  auth?: AuthModel;
  communication?: UserCommunicationModel;
  address?: UserAddressModel;
  socialNetworks?: UserSocialNetworksModel;
}

interface UserSubscriptionPlanModel {
  createdAt: string;
  description: string;
  id: string;
  interval: 'month' | 'year';
  isActive: boolean;
  isTrialPeriodAllowed: boolean;
  name: string;
  price: number;
  stripeSubscriptionPlanId: string;
  trialPeriodDays: number;
  updatedAt: string;
}

export interface UserSubscriptionModel {
  createdAt: string;
  end: number;
  id: string;
  status: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  subscriptionPlan: UserSubscriptionPlanModel;
}

export interface UserByIdProps {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  jobTitle?: string;
  registeredAt?: string;
  subscription?: UserSubscriptionModel | null;
  avatar?: string;
}
