# 🚧 just another library to fuzzy search (filter) and show ranked, maybe highlighted results, wip/under construction 🏗️

### Not yet available on npm. Let me know if you are interested in this. 🤷‍♂️

### v0.0.1

```ts
const searchValue = 'abc';
const textValues = ['a b c', 'abc', 'abcdef', 'xyz'];

const rateFunc = prioritizeContinualCharacters(searchValue);
const filteredValues = orderedStringArrayByRate(rateFunc)(textValues);

//    filteredValues: ['abc', 'abcdef', 'a b c']
```

### roadmap:

* [ ] prioritize strings where words starts with a search character, and a "word" will be configable, so that the search value `FS` will rank all this words **_above_** `fantastic`:
      * fuzzy search
      * fuzzy-search
      * fuzzy_search
      * FUZZY_SEARCH
      * fuzzySearch
      * FuzzySearch
* [ ] setup a build script
* [ ] linter, formatter
* [ ] test the result with npm, yarn, in the browser and with other JS VMs like deno
* [ ] create a low level (utils as shown above) and high level api (one liner)
* [ ] make it available on npm...
* [ ] small website to demo it?
