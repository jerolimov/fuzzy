# 🚧 just another library to fuzzy search (filter) and show ranked, maybe highlighted results, wip/under construction 🏗️

### Not yet available on npm. Let me know if you are interested in this. 🤷‍♂️

### v0.0.1

```ts
const searchValue = 'abc';
const textValues = ['aa bb cc', 'abc', 'abcdef', 'xyz', 'xa xb xc', 'cba'];

const rateFunc = prioritizeContinualCharactersAndWordStarts(searchValue, whitespaceWordStart);
const filteredValues = orderedStringArrayByRate(rateFunc)(textValues);

// [ 'abc',         // exact match
//   'aa bb cc',    // each word starts with one of the searched character (a b c)
//   'abcdef',      // contains all characters, close together
//   'xa xb xc'     // contains also all characters, but seperated
// ]
```

### roadmap:

* [x] prioritize strings where words starts with a search character, and a "word" will be configable, so that the search value `FS` will rank all this words **_above_** `fantastic`:
  * [x] fuzzy search
  * [x] fuzzy-search
  * [x] fuzzy_search
  * [x] FUZZY_SEARCH
  * [x] fuzzySearch
  * [x] FuzzySearch
* [ ] setup a build script
* [ ] linter, formatter
* [ ] test the result with npm, yarn, in the browser and with other JS VMs like deno
* [ ] create a low level (utils as shown above) and high level api (one liner)
* [ ] make it available on npm...
* [ ] small website to demo it?
