import express from 'express'
import { createNewBlog, deleteBlog, getAllBlogs, updateBlog } from '../controllers/blogs'
import { addComment, deleteComment, getAllComments } from '../controllers/comments'


export default (router: express.Router) => {
    router.post('/blogs/new', createNewBlog)
    router.get('/blogs', getAllBlogs)
    router.delete('/blogs/:id/delete', deleteBlog)
    router.patch('/blogs/:id/update', updateBlog)
    
    //working on comments
    router.get('/blogs/:id/comments', getAllComments);
    router.patch('/blogs/:id/comment', addComment)
    router.delete('/blogs/:id/comments/:commentId/delete', deleteComment)
}
