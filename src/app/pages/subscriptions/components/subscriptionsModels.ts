import {
  SubscriptionPlansDataProps,
  PaymentMethodProps,
} from '../../../modules/apps/core/_appModels';

export type { SubscriptionPlansDataProps, PaymentMethodProps };

export interface SubscriptionPlanCardProps {
  subscriptionPlan: SubscriptionPlansDataProps;
  paymentMethodData: PaymentMethodProps[];
}

export interface PaymentMethodComponentProps {
  paymentMethodData: PaymentMethodProps[];
  setPaymentMethodData: (paymentMethodData: PaymentMethodProps[]) => void;
}

export interface SummarySubscriptionCardProps {
  paymentMethodData: PaymentMethodProps[];
}

export interface SubscriptionDetailsProps {
  paymentMethodData: PaymentMethodProps[];
  setPaymentMethodData: (paymentMethodData: PaymentMethodProps[]) => void;
}

export interface SubscriptionPlansProps {
  paymentMethodData: PaymentMethodProps[];
  setPaymentMethodData: (paymentMethodData: PaymentMethodProps[]) => void;
}

export interface AddNewCardModalProps {
  closeModal: () => void;
}
