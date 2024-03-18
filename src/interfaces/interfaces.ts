import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface HamburguerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  description?: string; // Optional field
  price: string;
  priceWithDiscount: string;
  category: {
    id: number;
    name: string;
    description?: string; // Optional field
  };
  discountActive: boolean;
  discountPercentage: number;
  hot: boolean;
  inStock: boolean;
  new: boolean;
  sale: boolean;
}

export interface Order {
  id: number;
  userId: number;
  quantity: number;
  totalPrice: string;
  orderStatus: string;
  shippingAddress: string;
  billingAddress: string;
  paymentInformation: string;
  orderDate: Date;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
}

export enum Status {
  Pending = 'pending',
  Processing = 'processing',
  Shipped = 'shipped',
  Cancelled = 'cancelled',
  Delivered = 'delivered',
}

export interface OrderStatus {
  status: Status;
}
