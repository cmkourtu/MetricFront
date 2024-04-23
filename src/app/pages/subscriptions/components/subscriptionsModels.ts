import {
  SubscriptionPlansDataProps,
  PaymentMethodProps,
} from '../../../modules/apps/core/_appModels';

export type { SubscriptionPlansDataProps, PaymentMethodProps };

export interface SubscriptionPlanCardProps {
  subscriptionPlan: SubscriptionPlansDataProps;
}

export interface PaymentMethodComponentProps {
  paymentMethodData: PaymentMethodProps[];
  setPaymentMethodData: (paymentMethodData: PaymentMethodProps[]) => void;
}

export interface SummarySubscriptionCardProps {
  paymentMethodData: PaymentMethodProps[];
}
