import mongoose from 'mongoose';

const BlogsSchema = new mongoose.Schema({
  email: { type: String, required: true },
  blogname: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const BlogsModel = mongoose.model('Blogs', BlogsSchema);

export const getBlogs = () => BlogsModel.find();
export const getBlogByEmail = (email: string) => BlogsModel.findOne({ email });
export const getBlogBySessionToken = (sessionToken: string) => BlogsModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getBlogById = (id: string) => BlogsModel.findById(id);
export const createBlog = (values: Record<string, any>) => new BlogsModel(values).save().then((blog) => blog.toObject());
export const deleteBlogById = (id: string) => BlogsModel.findOneAndDelete({ _id: id });
export const updateBlogById = (id: string, values: Record<string, any>) => BlogsModel.findByIdAndUpdate(id, values);
