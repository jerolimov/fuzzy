import { RateFunc } from "./types";

export const countExistingCharactersAnywhere = (searchValue: string): RateFunc => (textValue: string): number => {
  let result = 0;
  for (let searchCharPos = 0; searchCharPos < searchValue.length; searchCharPos++) {
    const char = searchValue.charAt(searchCharPos);
    if (!textValue.includes(char)) {
      return 0;
    }
    result++;
  }
  return result;
};

export const countExistingCharactersBehind = (searchValue: string): RateFunc => (textValue: string): number => {
  let result = 0;
  let searchAfterPos = 0;
  for (let searchCharPos = 0; searchCharPos < searchValue.length; searchCharPos++) {
    const char = searchValue.charAt(searchCharPos);
    searchAfterPos = textValue.indexOf(char, searchAfterPos);
    if (searchAfterPos === -1) {
      return 0;
    }
    searchAfterPos++;
    result++;
  }
  return result;
};
