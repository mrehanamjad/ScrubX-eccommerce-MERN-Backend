import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import { config } from "../config/config.js";
import type { StringValue } from "ms";
import type { UserI } from "../types/user.types.js";


const userSchema = new mongoose.Schema<UserI>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
  const payload = {
    _id: this._id,
    email: this.email,
    name: this.fullName,
    role: this.role,
    isVarified: this.isVarified,
  };

  const options: SignOptions = {
    expiresIn: config.accessTokenExpiry as StringValue,
  };

  return jwt.sign(payload, config.accessTokenSecret, options);
};

userSchema.methods.generateRefreshToken = function (): string {
  const payload = {
    _id: this._id,
  };

  const options: SignOptions = {
    expiresIn: config.refreshTokenExpiry as StringValue,
  };

  return jwt.sign(payload, config.refreshTokenSecret, options);
};

export const User = mongoose.model<UserI>("User", userSchema);