import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import type { OrderI, OrderItem, AddressI, PaymentMethodI, discountI } from "../types/order.types.js";

// --- Sub-schemas (Internal Use Only) ---

const orderItemSchema = new Schema<OrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
}, { _id: false });

const addressSchema = new Schema<AddressI>({
  streetAddress: { type: String, required: true },
  apartment: { type: String },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
}, { _id: false });

const paymentMethodSchema = new Schema<PaymentMethodI>({
  name: { 
    type: String, 
    required: true,
    enum: ["cod", "jazz_cash", "easy_paisa", "bank_transfer", "sada_pay"]
  },
  details: { type: String, default: null } // Can store transaction ID or account last 4 digits
}, { _id: false });

const discountSchema = new Schema<discountI>({
  couponCode: { type: Schema.Types.ObjectId, ref: "Coupon", default: null },
  discountAmount: { type: Number, default: 0 }
}, { _id: false });

// --- Main Order Schema ---

const orderSchema = new Schema<OrderI>(
  {
    orderNumber: { 
      type: String, 
      required: true, 
      unique: true, 
      uppercase: true,
      index: true 
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    items: [orderItemSchema],
    addressType: { 
      type: String, 
      enum: ['shipping', 'billing', 'both'], 
      default: 'shipping' 
    },
    shippingAddress: { type: addressSchema, required: true },
    billingAddress: { type: addressSchema, default: null },
    paymentMethod: { type: paymentMethodSchema, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    subtotal: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, default: 0 },
    shippingCost: { type: Number, required: true, default: 0 },
    discount: { type: discountSchema, required: true },
    total: { type: Number, required: true, min: 0 },
    trackingNumber: { type: String, trim: true },
    notes: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

// Plugin for admin dashboard pagination
orderSchema.plugin(aggregatePaginate);

export const Order = mongoose.model<OrderI, mongoose.AggregatePaginateModel<OrderI>>(
  "Order",
  orderSchema
);