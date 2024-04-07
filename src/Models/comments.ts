import { Schema, model, Document } from "mongoose";

export interface IComment extends Document {
    id: number;
    blogId: number;
    message: string;
    userId: number;
    __v?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const commentSchema: Schema = new Schema({
    blogId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },

});


export default model<IComment>('Comment', commentSchema);
