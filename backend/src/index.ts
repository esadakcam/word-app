import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { getRandomWord, getWordByLevel } from './wordService';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/wordapp', (req: Request, res: Response) => {
  res.redirect('/wordapp/words');
});

app.get(['/wordapp/words', '/phrases'], (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use('/wordapp/assets', express.static(path.join(__dirname, '..', 'public', 'assets')));

app.get('/wordapp/api/words/random', (req: Request, res: Response) => {
  const word = getRandomWord();
  res.json(word);
});

app.get('/wordapp/api/words/:level', (req: Request, res: Response) => {
  const level = req.params.level as 'a1' | 'a2' | 'b1' | 'b2' | 'c1';
  const word = getWordByLevel(level);
  res.json(word);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});