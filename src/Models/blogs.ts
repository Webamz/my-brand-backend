import { model, Schema } from "mongoose";

interface BlogInt {
  title: string,
  description: string,
  content: string,
  image: string,
  createdAt: Date
}

const BlogSchema = new Schema<BlogInt>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
})

export default model<BlogInt>('Blog', BlogSchema)
