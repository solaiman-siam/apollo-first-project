import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors({}));

// handle api routes
app.use('/api/v1/students', StudentRoute)



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
