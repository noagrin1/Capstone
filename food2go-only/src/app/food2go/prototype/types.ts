export type Money = number;

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  etaMinutes: number;
  deliveryFee: Money;
  priceLevel: 1 | 2 | 3;
};

export type MenuItem = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: Money;
  category: string;
};

export type CartItem = {
  id: string;
  restaurantId: string;
  name: string;
  price: Money;
  quantity: number;
};

export type OrderStatus = "received" | "preparing" | "on_the_way" | "delivered";
export type PaymentMethod = "Card" | "Cash" | "Apple Pay" | "Google Pay";

export type Order = {
  id: string;
  createdAtIso: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  deliveryFee: Money;
  subtotal: Money;
  total: Money;
  address: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  statusUpdatedAtIso: string;
  feedback?: { rating: number; comment: string; submittedAtIso: string };
};
