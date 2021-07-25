import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts';
import userRouter from './routes/user';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();

app.set('trust proxy', 1);

app.use('/uploads', express.static('uploads'));
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());

const origin =
  process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:3000';

app.use(
  cors({
    credentials: true,
    origin,
  }),
);

app.use('/posts', postRoutes);
app.use('/user', userRouter);

const CONNECTION_URL = process.env.CONNECTION_URL as string;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)),
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
