import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
import {Server} from 'http'

let server : Server ;

// main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

   server =  app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}


main();

process.on('unhandledRejection', () => {
  console.log('unhandle rejects is detected!!');
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
});


process.on('uncaughtException', () => {
  console.log('unhandle rejects is detected!!');
  process.exit(1)
})