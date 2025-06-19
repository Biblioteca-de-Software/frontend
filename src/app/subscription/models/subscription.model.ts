export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceFormatted: string;
  features: string[];
}
