import { Document, Types } from "mongoose";

export interface ReviewI extends Document {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  orderId: Types.ObjectId; // Linking to order ensures "Verified Purchase"
  rating: number;
  comment: string;
  images?: { url: string; fileId: string }[];
}