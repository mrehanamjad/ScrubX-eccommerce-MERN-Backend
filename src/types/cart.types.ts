import { Document, Types } from "mongoose";

export interface CartItemI {
  productId: Types.ObjectId;
  varient: {
    color?: string; // If user selected a specific size/color
    size?: string;
    sleeve?: string;
    material?: string;
    other?: string;
  };
  quantity: number;
}

export interface CartI extends Document {
  userId: Types.ObjectId;
  items: CartItemI[];
}
