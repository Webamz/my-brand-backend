import express from "express";
import { serve, setup } from "swagger-ui-express";


const docsRouter = express.Router()

const options = {
    openapi: "3.0.0",
    info: {
        title: "My Brand backend API",
        version: "1.0.0",
        description: "My Portfolio",
    },

    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                // in: "header",
                // name: "Authorization",
            },
        },
    },

    basePath: 'http://localhost:3000/api/docs',
    security: [
        {
            bearerAuth: [],
        },
    ],

    tags: [
        {
            name: "user",
            description: "Handles APIs for Users.",
        },
        {
            name: "blog",
            description: "Handle APIs for Blogs.",
        },
        {
            name: "blogComment",
            description: "Handle APIs for BlogComments.",
        },
        {
            name: "project",
            description: "Handle APIs for Projects",
        },
        {
            name: "queries",
            description: "Handle APIs for Queries",
        },
    ]

};

docsRouter.use("/", serve, setup(options))

export default docsRouter


