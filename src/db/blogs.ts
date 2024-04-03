import mongoose from 'mongoose';

const CommentsSchema = new mongoose.Schema({
  commenter: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});


const BlogsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
author: { type: String, required: true },
timestamp: { type: Date, default: Date.now },
    comments: [CommentsSchema],
  commentCount: { type: Number, default: 0 }

});

export const BlogsModel = mongoose.model('Blogs', BlogsSchema);

export const getBlogs = () => BlogsModel.find();
export const getBlogByTitle = (title: string) => BlogsModel.findOne({ title });
export const getBlogById = (id: string) => BlogsModel.findById(id);
export const createBlog = (values: Record<string, any>) => new BlogsModel(values).save().then((blog) => blog.toObject());
export const deleteBlogById = (id: string) => BlogsModel.findOneAndDelete({ _id: id });
export const updateBlogById = (id: string, values: Record<string, any>) => BlogsModel.findByIdAndUpdate(id, values);
