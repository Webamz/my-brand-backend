import { Request, Response } from "express";
import { Queries } from "../Models/querries";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//create a querry and send email
export const createQuerry = async (req: Request, res: Response) => {
  const { firstname, lastname, email, mobile, message, review } = req.body;
  try {
    const newquerry = new Queries({
      firstname,
      lastname,
      email,
      mobile,
      message,
      review,
    });

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // my email data
    let mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: "New Querry from MyBrand",
      text: `Name: ${firstname} ${lastname}\nMobile: ${mobile}\nMessage: ${message} \nEmail: ${email}`,
    };

    //user email data
    let mailOptions2 = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email received",
      text: `Hello ${firstname} ${lastname},
            \nGreetings from Christian Iradukunda,\n
            \nYou just contacted through my website 'MYBRAND' and your message/email has been received.
            \nWe will contact you shortly.
            \nBest regards,
            \nChristian Iradukunda`,
    };

    const info = await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions2);
    await newquerry.save();
    res
      .status(201)
      .json({ message: "Query Created Successfully!", Queries: newquerry });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to create the Queries" });
  }
};

//delete a querry
export const deleteQuerry = async (req: Request, res: Response) => {
  try {
    const deletedQuerry = await Queries.deleteOne({ _id: req.params.id });

    if (deletedQuerry.deletedCount === 0) {
      return res.status(404).json({ error: "Querry not found" });
    }

    res.status(200).send("Querry successfully deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update the querry
export const updateQuerry = async (req: Request, res: Response) => {
  try {
    const querry = await Queries.findById(req.params.id);

    if (!querry) {
      return res.status(404).json({ error: "Querry not found" });
    }

    console.log('The whole body: ', req.body)
    console.log('The review value from req: ', req.body.review)
    querry.firstname = querry.firstname;
    querry.lastname = querry.lastname;
    querry.email = querry.email;
    querry.mobile = querry.mobile;
    querry.message = querry.message;
    querry.review = req.body.review || querry.review;

    const updatedQuerry = await querry.save();

    return res
      .status(200)
      .json({ message: "Successfully Updated Queries", updatedQuerry });
  } catch (error) {
    console.error("Error updating Queries:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//get all the querries
export const getAllQuerry = async (req: Request, res: Response) => {
  try {
    const querry = await Queries.find(req.body);
    res.status(200).send(querry);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

//get a single querry
export const getOneQuerry = async (req: Request, res: Response) => {
  try {
    const query = await Queries.findOne({ _id: req.params.id });

    if (!query) {
      return res.status(404).json({ error: "Querry not found" });
    }
    res.status(200).send(query);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const QuerryController = {
  createQuerry,
  deleteQuerry,
  updateQuerry,
  getAllQuerry,
  getOneQuerry,
};

export default QuerryController;
