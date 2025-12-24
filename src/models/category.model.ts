import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import type { CategoryI } from "../types/category.types.js";

const categorySchema = new Schema<CategoryI>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      fileId: {
        type: String,
        required: true,
      },
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Plugin for advanced pagination and aggregation
categorySchema.plugin(aggregatePaginate);

export const Category = mongoose.model<CategoryI, mongoose.AggregatePaginateModel<CategoryI>>(
  "Category",
  categorySchema
);