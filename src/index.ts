import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { registrationRouter } from './routes/registration.route';
import { runDb } from './helpers/runDb';

//create express app
const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5005;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello: World!!!!');
});

app.use('/api', registrationRouter);
//start app

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
  });
};

startApp();
