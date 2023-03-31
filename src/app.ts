import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import { registrationRouter } from './routes/registration.route';
import { clearAllData } from './routes/clearAllData.route';

export const app = express();
app.use(cookieParser());

app.set('trust proxy', true);

app.use(cors());
app.use(bodyParser.json());

export const port = process.env.PORT || 5005;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello: World!!!!');
});

app.use('/auth', registrationRouter);
app.use('/testing', clearAllData);
