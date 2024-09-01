import express, {Express, Request, Response} from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});