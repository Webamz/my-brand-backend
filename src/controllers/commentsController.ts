import { Request, Response } from "express";
import comments from "../Models/comments";

//help to retrieve userId
interface CustomRequest extends Request {
  userData?: { [key: string]: any };
}

// creating a comment
export const createComment = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userData?.id;
    const message = req.body.message;
    const blogId = req.body.blogId;
    const username = req.body.username;

    const newComment = await comments.create({
      blogId,
      message,
      userId,
      username,
    });

    res
      .status(201)
      .json({ message: "Comment Created Successfully!", newComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to Add Comment" });
  }
};

//comments by blogId
export const getCommentsByBlogId = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const postComments = await comments.find({ blogId: blogId });
    if (postComments == null) {
      res.status(404).json({ message: "No comments found for this post" });
    } else {
      res.status(200).json(postComments);
    }
  } catch (error) {
    console.error("Error fetching comments by blogID:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

//getting comment by Id
export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const the_comment = await comments.findById(id);
    if (!the_comment) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.json(the_comment);
    }
  } catch (error) {
    console.error("Error fetching comment by ID:", error);
    res.status(500).json({ error: "Failed to fetch comment" });
  }
};

//deleting a comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedComment = await comments.findByIdAndDelete(id);
    if (!deletedComment) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res
        .status(200)
        .json({ message: "Comment deleted successfully", deletedComment });
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

//getting all the comments
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const the_comments = await comments.find();
    const number_Comments = await comments.countDocuments({ the_comments });
    res
      .status(200)
      .json({ the_comments, "number of comments": number_Comments + 1 });
  } catch (error) {
    console.error("Error fetching all comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

const CommentController = {
  createComment,
  getCommentById,
  deleteComment,
  getAllComments,
  getCommentsByBlogId,
};

export default CommentController;
