import { Document } from "mongoose";

export interface CouponI extends Document {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g., 10 for 10% or 500 for Rs. 500
  minOrderAmount: number;
  maxDiscountAmount?: number; // Only used for percentage types
  startDate: Date;
  expiryDate: Date;
  usageLimit: number; // Total times this coupon can be used
  usedCount: number; // Track how many times it has been used
  isActive: boolean;
}