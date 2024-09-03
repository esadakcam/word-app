import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { getWord } from './wordService';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get(['/wordapp/words', '/phrases'], (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use('/wordapp/assets', express.static(path.join(__dirname, '..', 'public', 'assets')));

app.get('/wordapp/api/words/random', (req: Request, res: Response) => {
  const randomIndex = Math.floor(Math.random() * 5942);
  const word = getWord(randomIndex);
  res.json(word);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});