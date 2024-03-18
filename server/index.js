import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router from './router/index.js';

mongoose
	.connect(process.env.MONGO_KEY)
	.then(() => console.log('Connected!'))
	.catch(err => console.log(err));

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

app.listen(process.env.PORT, () => {
	console.log('Server start:' + process.env.PORT);
});
