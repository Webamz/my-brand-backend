import { Schema, model, Document } from "mongoose";

export interface IComment extends Document {
  blogId: string;
  message: string;
  userId: string;
}

const commentSchema: Schema = new Schema(
  {
    blogId: { type: Schema.Types.ObjectId, ref: "blogs", required: true },
    message: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IComment>("Comment", commentSchema);
