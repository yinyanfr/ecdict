import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";

const assetsPath = path.join(__dirname, "..", "..", "assets");
const dataPath = path.join(__dirname, "..", "..", "data");

function parseWordroot(raw: string) {
  const parsed: Record<string, Record<string, string>> = JSON.parse(raw);
  return Object.values(parsed).map((e) => ({
    ...e,
    synonyms: e.synonyms?.split(/, */g),
    antonyms: e.antonyms?.split(/, */g),
    root: e.root?.split(/, */g),
  }));
}

// have/1315648 -> had,has,'ve,having,'s,'d,d,ve
function parseLemmaLine(line: string): ECDict.Lemma | null {
  // skip blank line
  if (!line?.length) return null;
  // skip comments
  if (line.match(/^;/)) return null;

  const regex = /([A-z-']+)\/([0-9]+) *-> *(([A-z-']+,?)+)/i;
  const match = line.match(regex);
  if (match) {
    const [, word, frequency, variations] = match;
    return {
      word,
      frequency: parseInt(frequency),
      variations: variations.split(/, */g),
    };
  }
  return null;
}

function parseLemma(raw: string): ECDict.Lemma[] {
  const lines = raw.split(/\n/g);
  const lemma: ECDict.Lemma[] = [];
  lines.forEach((line) => {
    const parsed = parseLemmaLine(line);
    if (parsed) {
      lemma.push(parsed);
    }
  });
  return lemma;
}

/**
  % trademark, brand
  这组词都有“商标”的意思，其区别是：(Optional)
  - trademark: 指通过合法注册而印在商品上的特殊标记，即商标。
  - brand: 指生产厂家为自己的产品所取的专用名称。
 */
function parseResembleLine(line: string): ECDict.Resemble {
  const lines = line.split(/\n/g);
  const resemble: ECDict.Resemble = {
    dict: [],
    synonyms: [],
    description: "",
  };
  lines.forEach((e) => {
    if (e.match(/^%/)) {
      resemble.synonyms = e.replace(/[% ]+/g, "").split(",");
    } else if (e.match(/^- /)) {
      const match = e.match(/([A-z-']+): *(.+)/);
      if (match) {
        const [, word, definition] = match;
        resemble.dict.push({ word, definition });
      }
    } else {
      resemble.description = e;
    }
  });
  return resemble;
}

function parseResemble(raw: string): ECDict.Resemble[] {
  const lines = raw.replace(/\r/g, "").split(/\n\n+/g);
  return lines.map(parseResembleLine);
}

// TODO: Do you guys not having rams
function parseDict(raw: string) {
  const parsed: ECDict.Dict[] = parse(raw, {
    columns: true,
    skip_empty_lines: true,
  });
  parsed.forEach((word) => {
    for (const key of Object.keys(word)) {
      if (!word[key as keyof typeof word]?.length) {
        word[key as keyof typeof word] = undefined;
      }
    }
  });
  return parsed;
}

function parser() {
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath);
  }

  const wordrootRaw = fs.readFileSync(path.join(assetsPath, "wordroot.txt"));
  const wordroot = parseWordroot(wordrootRaw.toString());
  fs.writeFileSync(
    path.join(dataPath, "wordroot.json"),
    JSON.stringify(wordroot, null, 2)
  );
  console.log("Success: wordroot");

  const lemmaRaw = fs.readFileSync(path.join(assetsPath, "lemma.en.txt"));
  const lemma = parseLemma(lemmaRaw.toString());
  fs.writeFileSync(
    path.join(dataPath, "lemma.json"),
    JSON.stringify(lemma, null, 2)
  );
  console.log("Success: lemma");

  const resembleRaw = fs.readFileSync(path.join(assetsPath, "resemble.txt"));
  const resemble = parseResemble(resembleRaw.toString());
  fs.writeFileSync(
    path.join(dataPath, "resemble.json"),
    JSON.stringify(resemble, null, 2)
  );
  console.log("Success: resemble");

  const dictRaw = fs.readFileSync(path.join(assetsPath, "ecdict.csv"));
  const dict = parseDict(dictRaw.toString());
  fs.writeFileSync(
    path.join(dataPath, "dict.json"),
    JSON.stringify(dict, null, 2)
  );
  console.log("Success: dict");
}

parser();
