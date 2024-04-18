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
  id: string;
  stripeSubscriptionPlanId: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  createdAt: string;
  updatedAt: string;
}

export interface UserSubscriptionModel {
  id: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  isGroupSubscription: boolean;
  userId: string;
  status: string;
  end: number;
  subscriptionPlan: UserSubscriptionPlanModel;
  createdAt: string;
  updatedAt: string;
}

export interface UserByIdProps {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  jobTitle?: string;
  registeredAt?: string;
  subscription?: UserSubscriptionModel;
  avatar?: string;
}
