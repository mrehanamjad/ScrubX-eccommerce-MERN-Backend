import { Document, Types } from "mongoose";

export interface OrderItem {
  productId: Types.ObjectId;
  name: string;
  sku: string;
  quantity: number;
  price: number; // Price at time of purchase
}
export interface AddressI {
    streetAddress: string;
    apartment?: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }

export interface PaymentMethodI {
    name: string | "cod" | "JazzCash" | "EasyPaisa" | "Bank Transfer" | "SadaPay";
    details: string | null; 
}

export interface discountI {
    couponCode: Types.ObjectId | null;
    discountAmount: number;
}

export interface OrderI extends Document {
  orderNumber: string;
  userId: Types.ObjectId;
  items: OrderItem[];
  addressType: 'shipping' | 'billing' | 'both';
  shippingAddress: AddressI; 
  billingAddress: AddressI | null;  
  paymentMethod: PaymentMethodI;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: discountI;
  total: number;
  trackingNumber?: string;
  notes?: string;
}