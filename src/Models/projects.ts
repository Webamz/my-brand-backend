import { Schema, model } from "mongoose";

export interface IntProject {
  projectname: string;
  githubLink: string;
  image: string;
  description: string;
}

const ProjectSchema = new Schema<IntProject>(
  {
    projectname: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Projects = model<IntProject>("Projects", ProjectSchema);
