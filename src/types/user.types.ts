import type { Request } from "express";
import type { Types } from "mongoose";
import type { Document } from "mongoose";

export interface UserI extends Document {
    _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
  phone: string;
  refreshToken?: string;
  isVarified: boolean;


  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

type ResponseUserI = Omit<UserI, "password" | "refreshToken"> & {
  _id: string;
};

export interface AuthRequest extends Request {
  user: ResponseUserI;
}
