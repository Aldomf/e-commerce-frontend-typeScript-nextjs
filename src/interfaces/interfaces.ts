import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}
export interface ProductData {
  name: string;
  description: string;
  price: string;
  category: string;
  discountPercentage?: string;
  discountActive: boolean;
  imageFile: File | null;
  imageUrl: string | null;
  inStock: boolean;
  hot: boolean;
  sale: boolean;
  new: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: string;
  inStock: boolean;
  hot: boolean;
  sale: boolean;
  new: boolean;
  imageUrl: string;
  discountPercentage: number;
  priceWithDiscount: string;
  discountActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    description?: string; // Optional field
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  cartList: CartItem[]
}

export interface HamburguerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
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

export interface ProductQuantities {
  [productId: number]: number;
}

export interface ProductWithoutCategory {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  price: string;
  priceWithDiscount: string;
  discountActive: boolean;
  discountPercentage: number;
  hot: boolean;
  inStock: boolean;
  new: boolean;
  sale: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  mobile: string;
}


export interface Categories {
  id: number;
  name: string;
  description?: string;
}
export interface Category {
  id: number;
  name: string;
  description?: string;
  products: ProductWithoutCategory[]
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
