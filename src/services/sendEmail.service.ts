import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

let smtp_login = process.env.SMPT_LOGIN;
let smtp_password = process.env.SMPT_PASSWORD;

/*let transporter = nodemailer.createTransport({
  service: 'gmail',
  //host: "smtp.yandex.com",
  //port: 465,
  //secure: true, // true for 465, false for other ports*!/
  auth: {
    user: smtp_login, // generated ethereal user
    pass: smtp_password, // generated ethereal password
  },
});*/

class SendEmailService {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      //host: "smtp.yandex.com",
      //port: 465,
      //secure: true, // true for 465, false for other ports*/
      auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
      },
    });
  }
  async sendEmail(email: string, code: string) {
    await this.transporter.sendMail({
      from: 'autotest test', // sender address
      to: `${email}`, // list of receivers
      //text: `link to restore https://personal-page.staging.it-incubator.ru/?code=${code}`,
      html: `<div>
                <h1>HI MEN, YO</h1>
                <a href="https://personal-page.staging.it-incubator.ru/?code=${code}" rel="noopener noreferrer" target="_blank">
                https://personal-page.staging.it-incubator.ru/#/login
                </a>
            </div>
`,
      //html: `<div>https://personal-page.staging.it-incubator.ru/?code=${code}<div>`,
    });
  }
}

export const sendEmailService = new SendEmailService();
