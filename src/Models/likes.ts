import mongoose, { Schema, Document } from 'mongoose';

export interface ILike extends Document {
    blogId: string;
    userId: string;
    
}

const likeSchema: Schema = new Schema({
    blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Like = mongoose.model<ILike>('Like', likeSchema);
