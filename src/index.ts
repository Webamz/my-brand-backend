import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router/routes";
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "https://my-brand-christian.netlify.app",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});


mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((result) => console.log("database connected"))
  .catch((err) => console.log(err));

app.use("/api/V1", router);
