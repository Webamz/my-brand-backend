import express from "express"
import { getBlogByTitle, getBlogs, createBlog, deleteBlogById, getBlogById } from "../db/blogs"

export const getAllBlogs = async (req: express.Request, res: express.Response) => {
    try {
        const blogs = await getBlogs()

        return res.status(200).json(blogs)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export const createNewBlog = async (req: express.Request, res: express.Response) => {
  try {
    const { title, description, content, author } = req.body;

    if (!title || !description || !content || !author) {
      return res.sendStatus(400);
    }

    const existingBlog = await getBlogByTitle(title);
  
    if (existingBlog) {
      return res.sendStatus(400);
    }

    const blog = await createBlog({ title, description, content, author });

    return res.status(200).json(blog).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export const deleteBlog = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        
        const deletedUser = await deleteBlogById(id)

        return res.json(deletedUser)

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}


export const updateBlog = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { title, description, content, author } = req.body;

    if (!title && !description && !content && !author) {
      return res.sendStatus(400);
    }

    const blog = await getBlogById(id);
    
    if (!blog) {
      return res.sendStatus(404);
    }

    if (title) {
      blog.title = title;
    }
    if (description) {
      blog.description = description;
    }
    if (content) {
      blog.content = content;
    }
    if (author) {
      blog.author = author;
    }

    await blog.save();

    return res.status(200).json(blog).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export const getBlog = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const blog = await getBlogById(id);

    if (!blog) {
      return res.sendStatus(404);
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
