import fs from 'fs';
import path from 'path';
import { WordEntry } from '../../types/global';

type CefrLevel = 'a1' | 'a2' | 'b1' | 'b2' | 'c1';
type WordList = {
  length: number;
  words: WordEntry[];
};

export const getWordByLevel = (level: CefrLevel): WordEntry => {
  const wordList: WordList = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'data', `${level}.json`), 'utf-8')
  );
  return wordList.words[Math.floor(Math.random() * wordList.length)];
};

export const getRandomWord = (): WordEntry => {
  const level: CefrLevel = ['a1', 'a2', 'b1', 'b2', 'c1'][Math.floor(Math.random() * 5)] as CefrLevel;
  const wordList: WordList = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'data', `${level}.json`), 'utf-8')
  );
  return wordList.words[Math.floor(Math.random() * wordList.length)];
};