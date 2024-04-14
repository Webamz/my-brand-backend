import { Request, Response } from "express";
import { User } from "../Models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//creating a new user
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const saltRounds = 10;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User Created Successfully!", user: newUser });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to create the user" });
  }
};

//deleting a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    await User.deleteOne({ _id: req.params.id });
    res.status(200).send("Successfully Deleted User");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Error in deletion" });
  }
};

//login a user
export const LoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const userToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY as string,
      { expiresIn: "7d" }
    );

    // Set the token as a cookie
    res.cookie("token", userToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userData } = user.toObject();
    res.status(200).json({ ...userData, token: userToken });
  } catch (error) {
    console.error("Error occurred while logging in:", error);
    res.status(500).send(error);
  }
};

//updating a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Successfully Updated User", user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//get all the users
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find(req.body);
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

//find one user
export const FindOneUser = async (req: Request, res: Response) => {
  let user = User.findOne({ _id: req.params.id }).then((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(user);
    }
  });
};

//logout a user
export const logoutUser = (req: Request, res: Response) => {
  try {
    res.status(200).clearCookie("token").json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const UserController = {
  createUser,
  deleteUser,
  updateUser,
  getAllUser,
  FindOneUser,
  LoginUser,
  logoutUser,
};

export default UserController;
