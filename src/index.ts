import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/routes';
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true

}))
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/')
})


// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URL);
// mongoose.connection.on('error', (error: Error) => {
//     console.log(error);
// });


mongoose.connect(process.env.MONGO_URL as string, {})
    .then(result => console.log('database connected'))
    .catch(err => console.log(err))



app.use('/api', router)
