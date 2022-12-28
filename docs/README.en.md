# ecdict

[![npm](https://img.shields.io/npm/v/ecdict.svg)](https://www.npmjs.com/package/ecdict)
![license](https://img.shields.io/npm/l/ecdict.svg)
![size](https://img.shields.io/github/repo-size/yinyanfr/ecdict)

ECDict: The Free English to Chinese Dictionary Dataset.

A JavaScript interface for [skywind3000/ECDICT](https://github.com/skywind3000/ECDICT).

This library contains a large dataset (approx. 200M after installation).

This library is not meant to be run in the browsers.

## :green_book: Table of Contents

1. [Quick Start](#quick-start)
2. [Search For A Word](#search-for-a-word)
3. [Find The Lemma](#find-the-lemma)

## Quick Start

```bash
npm i ecdict
```

The dataset will be generated in JSON format upon installation in `node_modules/ecdict/data`.

## Search For A Word

```js
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

| Name        | Type   | Description                                                                          |
| ----------- | ------ | ------------------------------------------------------------------------------------ |
| entry       | string | The input word.                                                                      |
| lemma       | string | It's lemma.                                                                          |
| word        | string | The matching word in the dictionary.                                                 |
| definition  | string | Definition in English.                                                               |
| translation | string | Chinese Translation.                                                                 |
| frequency   | number | The frequency of the word.                                                           |
| level       | number | A 1~10 difficulty level calculated from the frequency using a naïve method.          |
| exchange    | string | It's exchange forms.                                                                 |
| phonetic    | string | It's phonetic.                                                                       |
| pos         | string | Position of the word, splitted by "/"                                                |
| collins     | string | Collins level                                                                        |
| oxford      | string | If the word is among Oxford's 3000 core vocabularies                                 |
| tag         | string | Tags: zk: junior high school level; gk/ college entrance exam level; cet: cet4 level |
| bnc         | string | BNC (British National Corpus) frequency                                              |
| frq         | string | Frequency in contemporary English                                                    |
| resemble    | object | See the table below.                                                                 |
| root        | object | See the table below.                                                                 |

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

```js
import { findLemma } from "ecdict";

findLemma("burns", true);
```

### Parameters

| Name            | Type    | Description                                 |
| --------------- | ------- | ------------------------------------------- |
| word            | string  | Required. The word that you want to search. |
| caseInsensitive | boolean | Optional. Being case insensitive.           |

### Output

| Name      | Type   | Description                                                                 |
| --------- | ------ | --------------------------------------------------------------------------- |
| word      | string | The lemma of the input word.                                                |
| frequency | number | The frequency of the word.                                                  |
| level     | number | A 1~10 difficulty level calculated from the frequency using a naïve method. |
