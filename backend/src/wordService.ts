import fs from 'fs';
import path from 'path';
import { WordEntry } from '../../types/global';

type Oxford5000 = {
  [key: string]: WordEntry;
};

export const getWord = (index: number): WordEntry | undefined => {
    const words: Oxford5000 = JSON.parse( fs.readFileSync(path.join(__dirname, '../data/oxford_5000.json'), 'utf-8'));
    return words[index.toString()];
};
