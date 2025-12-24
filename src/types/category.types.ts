import { Document, Types } from "mongoose";

export interface CategoryI extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  image: {
    url: string;
    fileId: string;
  }
  parentCategory?: Types.ObjectId | CategoryI; // For sub-categories
}