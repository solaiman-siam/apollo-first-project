import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globarError from './app/middleware/globalerror';
import notFound from './app/middleware/notFound';
import router from './app/routes';
import { promise } from 'zod';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors({}));

// handle api routes
app.use('/api/v1', router);

const test = async (req: Request , res: Response) => {
  Promise.reject()
}

app.get('/', test)

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });

app.use(globarError)
app.use(notFound)
export default app;
