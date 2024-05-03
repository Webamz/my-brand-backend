import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router/routes";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

const allowedOrigins = [
  'https://my-brand-christian.netlify.app',
  'http://localhost:3000',
  'https://christian-my-brand.netlify.app'
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true
};

app.use(cors(corsOptions));
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

export default app;
