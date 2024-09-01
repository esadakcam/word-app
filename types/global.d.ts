declare global {
}
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

export {WordEntry};