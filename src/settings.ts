export const settings = {
  MONGO_URI: process.env.mongoURI || '',
  JWT_SECRET: process.env.JWT_SECRET || '123',
  smtp_login: process.env.SMPT_LOGIN || '',
  smtp_password: process.env.SMPT_PASSWORD || '',
};
