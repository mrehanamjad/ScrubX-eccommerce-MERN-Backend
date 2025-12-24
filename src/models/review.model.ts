import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import type { ReviewI } from "../types/review.types.js";

const reviewSchema = new Schema<ReviewI>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    images: [{
      url: { type: String },
      fileId: { type: String }
    }],
  },
  { timestamps: true }
);

reviewSchema.plugin(aggregatePaginate);

export const Review = mongoose.model<ReviewI, mongoose.AggregatePaginateModel<ReviewI>>(
  "Review",
  reviewSchema
);