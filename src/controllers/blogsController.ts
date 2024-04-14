import { Request, Response } from "express";
import Blog from "../Models/blogs";
import { uploads } from "../middleware/multerUpload";
import { uploadImageToCloudinary } from "../middleware/cloudinary";

// creating a new blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    // check if a blog exists with such a title
    const existingBlog = await Blog.findOne({ title: req.body.title });

    if (existingBlog) {
      return res
        .status(400)
        .json({ error: "Blog with this title already exists" });
    }

    // if no existing blog
    uploads.single("image")(req, res, async (err: any) => {
      if (err) {
        console.error("Error uploading the image: ", err);
        return res.status(500).json({ error: "Failed to upload the image" });
      }

      const imageResult = req.file
        ? await uploadImageToCloudinary(req.file)
        : null;

      const newBlog = new Blog({
        ...req.body,
        image: imageResult || null,
      });

      await newBlog.save();

      res.status(201).json({ message: "Blog created successfully", newBlog });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create the blog" });
  }
};

//deleting a blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedBlog = await Blog.deleteOne({ _id: req.params.id });

    if (deletedBlog.deletedCount === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).send("Blog successfully deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//updating a blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    uploads.single("image")(req, res, async (err: any) => {
      if (err) {
        console.error("Error uploading the image: ", err);
        return res.status(500).json({ error: "Failed to upload the image" });
      }

      try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
          return res.status(404).json({ error: "Blog not found" });
        }

        blog.title = req.body.title || blog.title;
        blog.description = req.body.description || blog.description;
        blog.content = req.body.content || blog.content;

        if (req.file) {
          const fileResult = await uploadImageToCloudinary(req.file);
          blog.image = fileResult;
        }

        const updatedBlog = await blog.save();

        res
          .status(200)
          .json({ message: "Blog Updated Successfully!", updatedBlog });
      } catch (error) {
        console.error("Error updating the blog:", err);
        res.status(500).json({ error: "Failed to update the blog" });
      }
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Failed to update the blog" });
  }
};

//getting all the blogs
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find(req.body);
    res.status(200).send(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

//getting one blog
export const getOneBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).send(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const BlogController = {
  createBlog,
  deleteBlog,
  updateBlog,
  getAllBlogs,
  getOneBlog,
};

export default BlogController;
