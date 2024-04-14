import { Request, Response } from "express";
import { Projects, IntProject } from "../Models/projects";
import { uploads } from "../middleware/multerUpload";
import { uploadImageToCloudinary } from "../middleware/cloudinary";

//creating a project
export const createProject = async (req: Request, res: Response) => {
  try {
    const existingProject = await Projects.findOne({
      projectname: req.body.projectname,
    });
    if (existingProject) {
      return res
        .status(400)
        .json({ error: "Project with the same name already exists" });
    }

    uploads.single("image")(req, res, async (err: any) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ error: "Failed to upload the file" });
      }

      const fileResult = req.file
        ? await uploadImageToCloudinary(req.file)
        : null;
      const project = new Projects({
        ...req.body,
        image: fileResult || null,
      });

      await project.save();

      res
        .status(201)
        .json({ message: "Project Created Successfully!", project });
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Failed to create the Blog" });
  }
};

//getting all the projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Projects.find();
    res.status(200).send(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

//updating a project
export const updateProject = async (req: Request, res: Response) => {
  try {
    uploads.single("image")(req, res, async (err: any) => {
      if (err) {
        console.error("Error uploading the image: ", err);
        return res.status(500).json({ error: "Failed to upload the image" });
      }

      try {
        const project = await Projects.findById(req.params.id);

        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }

        project.projectname = req.body.projectname || project.projectname;
        project.description = req.body.description || project.description;
        project.githubLink = req.body.githubLink || project.githubLink;

        if (req.file) {
          const fileResult = await uploadImageToCloudinary(req.file);
          project.image = fileResult;
        }

        const updatedProject = await project.save();

        res
          .status(200)
          .json({ message: "Project Updated Successfully!", updatedProject });
      } catch (error) {
        console.error("Error updating the project:", err);
        res.status(500).json({ error: "Failed to update the project" });
      }
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Failed to update the blog" });
  }
};

//get only one project
export const getOneProject = async (req: Request, res: Response) => {
  try {
    const project = await Projects.findOne({ _id: req.params.id });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).send(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//deleting a project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const deletedProject = await Projects.deleteOne({ _id: req.params.id });

    if (deletedProject.deletedCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).send("Project successfully deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const ProjectsController = {
  createProject,
  deleteProject,
  updateProject,
  getAllProjects,
  getOneProject,
};

export default ProjectsController;
