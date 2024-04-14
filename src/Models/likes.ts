import mongoose, { Schema, Document } from "mongoose";

export interface ILike extends Document {
  blogId: string;
}

const likeSchema: Schema = new Schema({
  blogId: { type: Schema.Types.ObjectId, ref: "blogs", required: true },
});

export const Like = mongoose.model<ILike>("Like", likeSchema);
