import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import  type { ProductI, ProductVariantI, ImageI } from "../types/product.types.js";

// --- Sub-schema for Images (Handling File Hosting metadata like Cloudinary/ImageKit) ---
const imageSchema = new Schema<ImageI>({
  url: { type: String, required: true },
  fileId: { type: String, required: true }, // Useful for deleting files from storage later
}, { _id: false });

// --- Sub-schema for Dynamic Attribute Options ---
const attributeOptionSchema = new Schema({
  name: { type: String, required: true },
  extraCharges: { type: Number, default: 0 }
}, { _id: false });

const colorAttributeOptionSchema = new Schema({
    name: { type: String, required: true },
    colorCode: { type: String, required: true },
    extraCharges: { type: Number, default: 0 }
  }, { _id: false });

// --- Sub-schema for Product Variants ---
const variantSchema = new Schema<ProductVariantI>({
  size: [attributeOptionSchema],
  color: [colorAttributeOptionSchema],
  material: [attributeOptionSchema],
  sleeve: [attributeOptionSchema],
  other: [attributeOptionSchema],
}, { _id: false });

// --- Main Product Schema ---
const productSchema = new Schema<ProductI>(
  {
    name: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String },
    shortDescription: { type: String },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    costPerItem: { type: Number, min: 0 },
    sku: { type: String, unique: true, sparse: true }, // sparse allows multiple nulls if SKU isn't provided
    barcode: { type: String },
    quantity: { type: Number, required: true, default: 0 },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true, index: true },
    tags: [{ type: String, index: true }],
    images: [imageSchema],
    thumbnail: { type: String },
    weight: { type: Number },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    variants: variantSchema, // Nested object containing the attribute arrays
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

// Enable pagination plugin
productSchema.plugin(aggregatePaginate);

export const Product = mongoose.model<ProductI, mongoose.AggregatePaginateModel<ProductI>>(
  "Product",
  productSchema
);