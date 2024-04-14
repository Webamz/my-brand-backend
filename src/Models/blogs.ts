import { model, Schema } from "mongoose";

interface BlogInt {
  title: string;
  description: string;
  content: string;
  image: string;
}

const BlogSchema = new Schema<BlogInt>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<BlogInt>("Blog", BlogSchema);
