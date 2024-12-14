import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors({}));

// handle api routes
app.use('/api/v1/students', StudentRoute)
app.use('/api/v1/users', UserRoutes)



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});



app.use((err: any, req: Request, res: Response , next: NextFunction) => {
  const status = 500
  const message =  err.message

  res.status(status).json({
    success: false,
    message: message,
    error: err
  })



})
export default app;
