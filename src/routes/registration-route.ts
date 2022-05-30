import { Request, Response, Router } from 'express';
import { sendEmailService } from '../services/sendEmail.service';

export const registrationRouter = Router({});

registrationRouter.post('/registration', async (req: Request, res: Response) => {
  const email = req.body.email;
  console.log('email', email);
  try {
    await sendEmailService.sendEmail(email);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
