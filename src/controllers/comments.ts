import express from "express";
import { getBlogById } from "../db/blogs";

export const getAllComments = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const blog = await getBlogById(id);
    
    if (!blog) {
      return res.sendStatus(404);
    }

    return res.status(200).json(blog.comments).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}


export const addComment = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { commenter, content } = req.body;

    if (!commenter || !content) {
      return res.sendStatus(400);
    }

    const blog = await getBlogById(id);
    
    if (!blog) {
      return res.sendStatus(404);
    }

      blog.comments.push({ commenter, content });
      blog.commentCount += 1;
    await blog.save();

    return res.status(200).json(blog).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export const deleteComment = async (req: express.Request, res: express.Response) => {
  try {
    const { id, commentId } = req.params;

    const blog = await getBlogById(id);
    
    if (!blog) {
      return res.sendStatus(404);
    }

    const commentIndex = blog.comments.findIndex(comment => comment._id?.toString() === commentId);

    if (commentIndex === -1) {
      return res.sendStatus(404);
    }

    blog.comments.splice(commentIndex, 1);
    blog.commentCount -= 1;
    await blog.save();

    return res.status(200).json(blog).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
