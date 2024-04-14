import { Request, Response } from "express";
import { ILike, Like } from "../Models/likes";

//creating a like
export const createLike = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.body;
    const likeCount = await Like.countDocuments({ blogId });

    const newLike = await Like.create({ blogId });
    res
      .status(201)
      .json({ message: "Like Created Successfully!", newLike, likeCount });
  } catch (error) {
    console.error("Error creating like:", error);
    res.status(500).json({ error: "Failed to create like" });
  }
};

//deleting a like
export const deleteLike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedLike = await Like.findByIdAndDelete(id);
    if (!deletedLike) {
      res.status(404).json({ message: "Like not found" });
    } else {
      res
        .status(200)
        .json({ message: "Like deleted successfully", deletedLike });
    }
  } catch (error) {
    console.error("Error deleting like:", error);
    res.status(500).json({ error: "Failed to delete like" });
  }
};

//getting all the likes
export const getAllLikes = async (req: Request, res: Response) => {
  try {
    const likes = await Like.find();
    res.status(200).json(likes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ error: "Failed to fetch likes" });
  }
};

//getting like by id
export const getLikeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const like = await Like.find({ blogId: id });
    if (!like) {
      res.status(404).json({ message: "Like not found" });
    } else {
      res.status(200).json(like);
    }
  } catch (error) {
    console.error("Error fetching like by ID:", error);
    res.status(500).json({ error: "Failed to fetch like" });
  }
};

const LikeController = {
  createLike,
  deleteLike,
  getAllLikes,
  getLikeById,
};

export default LikeController;
