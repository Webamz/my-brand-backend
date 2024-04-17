import { Router } from "express";
import { middleware } from "../authorize/auth";
import BlogController from "../controllers/blogsController";
import CommentController from "../controllers/commentsController";
import LikeController from "../controllers/likesController";
import QuerryController from "../controllers/querriesController";
import UserController from "../controllers/usersController";
import { isAdmin, isUser } from "../middleware/isAuthorized";
import ProjectsController from "../controllers/projectsController";
import docsRouter from "../documentation/swagger";


const router = Router()

// users
router.get("/users/all",middleware,isAdmin, UserController.getAllUser);
router.get("/users/find/:id", middleware,isAdmin,UserController.FindOneUser);
router.post("/users/register", UserController.createUser);
router.post("/users/login", UserController.LoginUser);
router.post("/users/logout", UserController.logoutUser);
router.delete("/users/delete/:id", middleware,isAdmin,UserController.deleteUser);
router.put("/users/update/:id",middleware,isAdmin, UserController.updateUser);


//blogs
router.get("/blogs", BlogController.getAllBlogs);
router.get("/blogs/find/:id", BlogController.getOneBlog);
router.post("/blogs/create", middleware,isAdmin,BlogController.createBlog);
router.delete("/blogs/delete/:id",middleware,isAdmin, BlogController.deleteBlog);
router.put("/blogs/update/:id", middleware,isAdmin,BlogController.updateBlog);


//comments
router.get('/blogs/:blogId/comments',CommentController.getCommentsByBlogId)
router.post('/blogs/:blogId/comments/create',CommentController.createComment);
router.get('/comment/getOne/:id',middleware,isAdmin, CommentController.getCommentById);
router.delete('/comment/delete/:id',middleware,isAdmin, CommentController.deleteComment);
router.get('/comments/All', middleware,isAdmin,CommentController.getAllComments);


//likes
router.post('/like/create', LikeController.createLike);
router.get('/like/get/:id', LikeController.getLikeById);
router.delete('/like/delete/:id',middleware,isAdmin, LikeController.deleteLike);
router.get('/likes/all',middleware,isAdmin, LikeController.getAllLikes);

//queries
router.get("/querries/all",middleware,isAdmin, QuerryController.getAllQuerry);
router.get("/querries/find/:id", middleware,isAdmin,QuerryController.getOneQuerry);
router.post("/querries/create",QuerryController.createQuerry);
router.delete("/querries/delete/:id", middleware, isAdmin, QuerryController.deleteQuerry);
router.put("/querries/update/:id", middleware,isAdmin,QuerryController.updateQuerry);


//projects
router.get("/projects", ProjectsController.getAllProjects);
router.get("/projects/find/:id", ProjectsController.getOneProject);
router.post("/projects/create",middleware,isAdmin, ProjectsController.createProject);
router.delete("/projects/delete/:id", middleware,isAdmin,ProjectsController.deleteProject);
router.put("/projects/update/:id",middleware,isAdmin, ProjectsController.updateProject);


router.use("/docs",docsRouter );

export default router
