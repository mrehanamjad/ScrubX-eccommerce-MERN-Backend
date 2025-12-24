import { Document, Types } from "mongoose";

export interface ProductVariantI {
  size: {
    name: string;
    extraCharges: number;
  }[];
  color: {
    name: string;
    colorCode: string;
    extraCharges: number     
  }[];
  material: {
    name: string;
    extraCharges: number;
  }[];
  sleeve: {
    name: string;
    extraCharges: number;
  }[];
  other: {
    name: string;
    extraCharges: number;
  }[];
}

export interface ImageI {
    url: string;
    fileId: string;
}

export interface ProductI extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  costPerItem?: number;
  sku?: string;
  barcode?: string;
  quantity: number;
  categoryId: Types.ObjectId;
  tags: string[];
  images: ImageI[];
  thumbnail?: string;
  weight?: number;
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  variants: ProductVariantI;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}