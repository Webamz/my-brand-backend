import { Schema, model } from "mongoose";

interface IntQuery {
  email: string;
  message: string;
  firstname: string;
  lastname: string;
  mobile: string;
  review: string;
}

const Querychema = new Schema<IntQuery>(
  {
    email: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Queries = model<IntQuery>("Queries", Querychema);
