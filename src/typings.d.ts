declare namespace ECDict {
  interface WordRoot {
    synonyms: string[];
    class: string;
    example: string[];
    meaning: string;
    root: string[];
    origin: string;
  }

  interface Lemma {
    word: string;
    frequency: number;
    variations: string[];
  }

  interface Resemble {
    synonyms: string[];
    description: string;
    dict: {
      word: string;
      definition: string;
    }[];
  }

  interface Dict {
    word: string;
    phonetic: string;
    definition: string;
    translation: string;
    pos: string;
    collins: string;
    oxford: string;
    tag: string;
    bnc: string;
    frq: string;
    exchange: string;
    detail: string;
    audio: string;
  }
}
