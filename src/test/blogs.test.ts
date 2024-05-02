import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';

import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URL 

describe('Blog Tests', () => {
    let id: string;
    const token = process.env.TEST_TOKEN;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL as string)
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('Create a new blog', async () => {
        const newBlogData = {
            title: "Test Blog",
            description: "This is a test blog",
            content: "This is a blog for testing"
        };

        const response = await request(app)
            .post('/api/V1/Blog/create')
            .send(newBlogData)
            .set("Authorization", `Bearer ${token}`);

   
        expect(response.body).toHaveProperty('_id');
        id = response.body._id;
    });
});
