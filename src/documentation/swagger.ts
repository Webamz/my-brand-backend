import express from "express";
import { serve, setup } from "swagger-ui-express";

const docsRouter = express.Router();

const options = {
  openapi: "3.0.0",
  info: {
    title: "My Brand backend API",
    version: "1.0.0",
    description: "My brand (Portfolio) ",
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
        name: "Authorization",
      },
    },
  },

  basePath: "https://my-brand-backend-tfnq.onrender.com/api/V1/docs",
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
      description: "Handle APIs for Blog Comments.",
    },
    {
      name: "blogLike",
      description: "Handle APIs for Blog Likes.",
    },
    {
      name: "project",
      description: "Handle APIs for Projects",
    },
    {
      name: "querries",
      description: "Handle APIs for Querries",
    },
  ],
  paths: {
    //working with a user
    "/api/V1/users/All": {
      get: {
        tags: ["user"],
        summary: "Get All Users",
        description: "Gets all users",
        responses: {
          200: {
            description: "Users retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/users/register": {
      post: {
        tags: ["user"],
        summary: "Create User",
        description: "Creates a new user",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                  role: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "User registered successfully",
          },
          400: {
            description: "User already registered",
          },
          500: {
            description: "User data was not valid",
          },
        },
      },
    },
    "/api/V1/users/login": {
      post: {
        tags: ["user"],
        summary: "User Login",
        description: "User login",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User successfully logged in",
          },
          401: {
            description: "Email or password is not valid",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/users/find/{id}": {
      get: {
        tags: ["user"],
        summary: "Get User By ID",
        description: "Get a user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User retrieved successfully",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/users/delete/{id}": {
      delete: {
        tags: ["user"],
        summary: "Delete User",
        description: "Delete a user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    //working with blogs
    "/api/V1/blogs": {
      get: {
        tags: ["blog"],
        summary: "Get All blogs",
        description: "Gets all blogs",
        responses: {
          200: {
            description: "All blog successfully retrieved",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/blogs/create": {
      post: {
        tags: ["blog"],
        summary: "Create blog",
        description: "Creates a new blog",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },

                  description: {
                    type: "string",
                  },

                  content: {
                    type: "string",
                  },
                  image: {
                    type: "file",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Blog created successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/blogs/find/{id}": {
      get: {
        tags: ["blog"],
        summary: "Find blog By ID",
        description: "Gets a blog by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Blog retrieved successfully",
          },
          404: {
            description: "blog not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/blogs/update/{id}": {
      put: {
        tags: ["blog"],
        summary: "Update blog",
        description: "Updates an existing blog",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },

                  description: {
                    type: "string",
                  },

                  content: {
                    type: "string",
                  },
                  image: {
                    type: "file",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Blog updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Blog not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/V1/blogs/delete/{id}": {
      delete: {
        tags: ["blog"],
        summary: "Delete blog",
        description: "Deletes a blog by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Blog deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Blog not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    //working with comments
    "/api/V1/blogs/{blogId}/comments/create": {
      post: {
        tags: ["blogComment"],
        summary: "Create blogComment",
        description: "Create a new Comment of a blog",
        parameters: [
          {
            name: "blogId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Comment added successfuly",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/blogs/{blogId}/comments": {
      get: {
        tags: ["blogComment"],
        summary: "Get comments of a blog",
        description: "Gets blog comments by ID",
        parameters: [
          {
            name: "blogId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Comments retrieved successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Comments not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/comment/delete/{id}": {
      delete: {
        tags: ["blogComment"],
        summary: "Delete comment",
        description: "Delete a comment by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Comment deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Comment not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    //working with likes
    "/api/V1/like/create": {
      post: {
        tags: ["blogLike"],
        summary: "Create blogLike",
        description: "Create a new like for a blog",
        parameters: [
          {
            name: "blogId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],

        responses: {
          201: {
            description: "Like added successfuly",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/like/delete/{id}": {
      delete: {
        tags: ["blogLike"],
        summary: "Delete like",
        description: "Delete a like by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Like deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Like not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    //working with projects
    "/api/V1/projects": {
      get: {
        tags: ["project"],
        summary: "Get All projects",
        description: "Gets all projects",
        responses: {
          200: {
            description: "All projects successfully retrieved",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/projects/create": {
      post: {
        tags: ["project"],
        summary: "Create Project",
        description: "Create a new Project",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  projectName: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  githubLink: {
                    type: "string",
                  },
                  image: {
                    type: "file",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Project created successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/projects/find/{id}": {
      get: {
        tags: ["project"],
        summary: "Finds Project By ID",
        description: "Gets a Project by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Project retrieved successfully",
          },
          404: {
            description: "Project not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/projects/update/{id}": {
      put: {
        tags: ["project"],
        summary: "Update Project",
        description: "Updates an existing Project",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  projectName: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  githubLink: {
                    type: "string",
                  },

                  image: {
                    type: "file",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Project updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Project not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/projects/delete/{id}": {
      delete: {
        tags: ["project"],
        summary: "Delete Project",
        description: "Deletes a Project by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Project deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Project not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    //working with querries
    "/api/V1/querries/all": {
      get: {
        tags: ["querries"],
        summary: "Get All querries",
        description: "Get all querries",
        responses: {
          200: {
            description: "All querries are retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/querries/create": {
      post: {
        tags: ["querries"],
        summary: "Create querry",
        description: "Create a new querry",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  firstname: {
                    type: "string",
                  },
                  lastname: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  mobile: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                  review: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Message sent successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/querries/find/{id}": {
      get: {
        tags: ["querries"],
        summary: "Finds Querry By ID",
        description: "Get a Querry by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Querry retrieved successfully",
          },
          404: {
            description: "querry not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/querries/update/{id}": {
      put: {
        tags: ["querries"],
        summary: "Update Querry",
        description: "Updates an existing Querry",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  firstname: {
                    type: "string",
                  },
                  lastname: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  mobile: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                  review: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Querry updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "querry not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/V1/querries/delete/{id}": {
      delete: {
        tags: ["querries"],
        summary: "Delete querry",
        description: "Deletes a querry by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "querry deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Querry not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
};

docsRouter.use("/", serve, setup(options));

export default docsRouter;
