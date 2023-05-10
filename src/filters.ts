import { FilterFunc } from "./types";

export const containsExactString = (searchValue: string): FilterFunc => (textValue: string): boolean => {
  return textValue.includes(searchValue);
};

export const containsEveryCharactersAnywhere = (searchValue: string): FilterFunc => (textValue: string): boolean => {
  for (let searchCharPos = 0; searchCharPos < searchValue.length; searchCharPos++) {
    const char = searchValue.charAt(searchCharPos);
    if (!textValue.includes(char)) {
      return false;
    }
  }
  return true;
};

export const containsEveryCharactersBehind = (searchValue: string): FilterFunc => (textValue: string): boolean => {
  let searchAfterPos = 0;
  for (let searchCharPos = 0; searchCharPos < searchValue.length; searchCharPos++) {
    const char = searchValue.charAt(searchCharPos);
    searchAfterPos = textValue.indexOf(char, searchAfterPos);
    if (searchAfterPos === -1) {
      return false;
    }
    searchAfterPos++;
  }
  return true;
};

export const filterStringArray = (filterFunc: FilterFunc) => (textValues: string[]): string[] => {
  return textValues.filter(filterFunc);
}
