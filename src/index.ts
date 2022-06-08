import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { registrationRouter } from './routes/registration.route';
import { runDb } from './helpers/runDb';
import { clearAllData } from './routes/clearAllData.route';
import rateLimit from 'express-rate-limit';

//create express app
const app = express();

const limiter = rateLimit({
  windowMs: 100000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  statusCode: 429,
  message: '!@#!@#!@#!@#!@#!@#!@#!@#',
});

app.use(cors());
app.use(bodyParser.json());
app.use(limiter);

const port = process.env.PORT || 5005;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello: World!!!!');
});

app.use('/api', registrationRouter);
app.use('/api/testing', clearAllData);
//start app

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
  });
};

startApp();
