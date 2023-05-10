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

### roadmap:

* [x] prioritize when the search string matches word starts

  a "word" is **_configable_**, so that the search value `FS` can rank the words **_above_**, for example, `fantastic`:

  * [x] fuzzy search
  * [x] fuzzy-search
  * [x] fuzzy_search
  * [x] FUZZY_SEARCH
  * [x] fuzzySearch
  * [x] FuzzySearch

* [ ] setup a build script
* [ ] linter, formatter
* [ ] test the result with npm, yarn, in the browser and with other JS VMs like deno
* [ ] cleanup the low level api (utils as shown above) and create a new high level api (one liner)
* [ ] make it available on npm
* [ ] small website to demo it?
