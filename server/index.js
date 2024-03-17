import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

mongoose
	.connect(process.env.MONGO_KEY)
	.then(() => console.log('Connected!'))
	.catch(err => console.log(err));

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json({ message: 'Hello User!' });
});

app.listen(process.env.PORT, () => {
	console.log('Server start:' + process.env.PORT);
});
