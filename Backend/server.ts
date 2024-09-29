import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import queuesRouter from './routes/queueRoutes';
import cors from 'cors';
// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

app.use('/api/v1', queuesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
