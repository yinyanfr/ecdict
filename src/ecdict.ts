import fs from "node:fs";
import path from "node:path";

const dataPath = path.join(__dirname, "..", "data");

const dictRaw = fs.readFileSync(path.join(dataPath, "dict.json")).toString();
const dict: ECDict.Dict[] = JSON.parse(dictRaw);
console.log(dict.find((e) => e.word === "hood"));
