export interface TemporarySubscriptionsDataProps {
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

export interface SubscriptionPlanCardProps {
  subscriptionPlan: TemporarySubscriptionsDataProps;
}
