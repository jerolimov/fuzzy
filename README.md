# 🚧 just another library to fuzzy search (filter) and show a ranked, maybe highlighted result, wip/under construction 🏗️

### Not yet available on npm. Let me know if you are interested in this. 🤷‍♂️

### v0.0.1

```ts
const searchValue = 'abc';
const textValues = ['aa bb cc', 'abc', 'abcdef', 'xyz', 'xa xb xc', 'cba'];

const rateFunc = prioritizeContinualCharactersAndWordStarts(searchValue, whitespaceWordStart);

const filteredAndOrderedValues = orderedStringArrayByRate(rateFunc)(textValues);

// [ 'abc',         // exact match
//   'aa bb cc',    // each word starts with one of the searched character (a b c)
//   'abcdef',      // contains all characters, close together
//   'xa xb xc'     // contains also all characters, but seperated
// ]
```

### features

* [x] super tiny (just a few kb)
* [x] no dependencies
* [x] works in the browser and on the server
* [x] highly customizable for your use case, for example:
  * [x] prioritize when the search matches a word start,

    so that a search `FS` can rank the words **_higher_** then e.g. `fantastic`:

    * [x] fuzzy search (whitespaces)
    * [x] fuzzy-search (kebab-case)
    * [x] fuzzy_search (underscore)
    * [x] FUZZY_SEARCH (underscore)
    * [x] fuzzySearch (pascalCase)
    * [x] FuzzySearch (CamelCase)
    * [x] any other custom schema

### roadmap:

* [ ] setup a build script
* [ ] linter, formatter
* [ ] test the result with npm, yarn, in the browser and with other JS VMs like deno
* [ ] cleanup the low level api (utils as shown above) and create a new high level api (one liner)
* [ ] make it available on npm
* [ ] small website to demo it?
