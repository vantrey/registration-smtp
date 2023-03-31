import { app, port } from './app';
import { runDb } from './helpers/runDb';

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
  });
};

startApp();
