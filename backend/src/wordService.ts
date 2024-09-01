import fs from 'fs';
import path from 'path';

interface WordEntry {
  word: string;
  type: string;
  cefr: string;
  phon_br: string;
  phon_n_am: string;
  definition: string;
  example: string;
  uk: string;
  us: string;
}

type Oxford5000 = {
  [key: string]: WordEntry;
};



export const getWord = (index: number): WordEntry | undefined => {
    const words: Oxford5000 = JSON.parse( fs.readFileSync(path.join(__dirname, '../data/oxford_5000.json'), 'utf-8'));
    return words[index.toString()];
};

console.log(getWord(1));