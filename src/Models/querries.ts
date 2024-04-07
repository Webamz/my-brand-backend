import { Schema, model } from "mongoose";

interface IntQuery {
    email: string;
    message: string;
    createdAt?: Date; 
    updatedAt?: Date;
}

const Querychema = new Schema<IntQuery>({
    email: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

}, { timestamps: true});

export const Queries = model<IntQuery>('Queries', Querychema);
