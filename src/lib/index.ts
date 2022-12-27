import fs from "node:fs";
import path from "node:path";

const dataPath = path.join(__dirname, "..", "..", "data");

const lemma: ECDict.Lemma[] = JSON.parse(
  fs.readFileSync(path.join(dataPath, "lemma.json")).toString()
);
const dict: ECDict.Dict[] = JSON.parse(
  fs.readFileSync(path.join(dataPath, "dict.json")).toString()
);
const resemble: ECDict.Resemble[] = JSON.parse(
  fs.readFileSync(path.join(dataPath, "resemble.json")).toString()
);
const wordroot: ECDict.WordRoot[] = JSON.parse(
  fs.readFileSync(path.join(dataPath, "wordroot.json")).toString()
);

const mostFreq = lemma.reduce(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (a, b) => ({ frequency: Math.max(a.frequency, b.frequency) } as any)
).frequency;
function getLevel(frequency: number) {
  return Math.ceil((frequency / mostFreq) * 10);
}

export function findLemma(word: string, caseInsensitive?: boolean) {
  if (!word.length) return null;

  const result = caseInsensitive
    ? lemma.find(
        (e) =>
          e.word.toLowerCase() === word.toLowerCase() ||
          e.variations.find((e) => e.toLowerCase() === word.toLowerCase())
      )
    : lemma.find((e) => e.word === word || e.variations.includes(word));
  if (result) {
    return {
      word: result.word,
      frequency: result.frequency,
      level: getLevel(result.frequency),
    };
  }
  return null;
}

interface SearchOptions {
  withResemble?: boolean;
  withRoot?: boolean;
  caseInsensitive?: boolean;
}

export function searchWord(entry: string, options?: SearchOptions) {
  if (!entry?.length) return null;

  const { withResemble, withRoot, caseInsensitive } = options || {};
  const hasLemma = findLemma(entry, caseInsensitive);
  const lemma = hasLemma?.word || entry;
  const level = hasLemma?.level;
  const frequency = hasLemma?.frequency;
  const word = caseInsensitive
    ? dict.find((e) => e.word.toLowerCase() === lemma.toLowerCase())
    : dict.find((e) => e.word === lemma);
  if (word) {
    const additional: Record<string, unknown> = {};
    if (withResemble) {
      const hasResemble = resemble.find((e) => e.synonyms.includes(lemma));
      additional.resemble = hasResemble;
    }
    if (withRoot) {
      const hasRoot = wordroot.find((e) => e.root?.includes(entry));
      additional.root = hasRoot;
    }
    return {
      ...word,
      entry,
      lemma,
      level,
      frequency,
      ...additional,
    };
  }
  return null;
}
