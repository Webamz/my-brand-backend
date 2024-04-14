import { Schema, model } from "mongoose";

interface IntUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

const Userchema = new Schema<IntUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model<IntUser>("User", Userchema);
