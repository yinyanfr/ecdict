# ecdict

[![npm](https://img.shields.io/npm/v/ecdict.svg)](https://www.npmjs.com/package/ecdict)
![license](https://img.shields.io/npm/l/ecdict.svg)
![size](https://img.shields.io/github/repo-size/yinyanfr/novelscript)

JavaScript interface for [skywind3000/ECDICT](https://github.com/skywind3000/ECDICT).

This library contains a large dataset (approx. 500M after installation).

This library is not meant to be run in the browsers.

## Search A Word

```typescript
import { searchWord } from "ecdict";

searchWord("happy", {
  withResemble: true,
  withRoot: true,
  caseInsensitive: true,
});
```

### Parameters

| Name    | Type   | Description                                 |
| ------- | ------ | ------------------------------------------- |
| entry   | string | Required. The word that you want to search. |
| options | object | Optional. See the table below.              |

#### Options

| Name            | Type    | Description                                 |
| --------------- | ------- | ------------------------------------------- |
| withResemble    | boolean | Optional. Including synonyms in the result. |
| withRoot        | boolean | Optional. Searching for word roots.         |
| caseInsensitive | boolean | Optional. Being case insensitive.           |

### Output

| Name        | Type   | Description                                                                 |
| ----------- | ------ | --------------------------------------------------------------------------- |
| entry       | string | The input word.                                                             |
| lemma       | string | It's lemma.                                                                 |
| word        | string | The matching word in the dictionary.                                        |
| definition  | string | Definition in English.                                                      |
| translation | string | Chinese Translation.                                                        |
| frequency   | number | The frequency of the word.                                                  |
| level       | number | A 1~10 difficulty level calculated from the frequency using a naïve method. |
| exchange    | number | It's exchange forms.                                                        |
| phonetic    | number | It's phonetic.                                                              |
| resemble    | object | See the table below.                                                        |
| root        | object | See the table below.                                                        |

#### resemble

| Name        | Type     | Description           |
| ----------- | -------- | --------------------- |
| synonyms    | string[] | The list of synonyms. |
| description | string   | The description.      |
| dict        | object   | See the table below   |

##### resemble.dict

| Name       | Type   | Description                 |
| ---------- | ------ | --------------------------- |
| word       | string | The word.                   |
| definition | string | The description in Chinese. |

#### root

| Name     | Type     | Description                 |
| -------- | -------- | --------------------------- |
| root     | string[] | The list of roots.          |
| synonyms | string[] | The list of synonyms.       |
| antonyms | string[] | The list of antonyms.       |
| class    | string   | The type of the root.       |
| examples | string[] | Words that has the root.    |
| meaning  | string   | It's definition in English. |
| function | string   | It's function.              |
| origin   | string   | It's origin.                |

## Find The Lemma

```typescript
import { findLemma } from "ecdict";

findLemma("burns");
```

### Parameters

| Name | Type   | Description                                 |
| ---- | ------ | ------------------------------------------- |
| word | string | Required. The word that you want to search. |

### Output

| Name      | Type   | Description                                                                 |
| --------- | ------ | --------------------------------------------------------------------------- |
| word      | string | The lemma of the input word.                                                |
| frequency | number | The frequency of the word.                                                  |
| level     | number | A 1~10 difficulty level calculated from the frequency using a naïve method. |
