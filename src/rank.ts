import { ValueWithRank, RateFunc, CompareFunc, IsWordStart } from "./types";

export const prioritizeContinualCharacters = (searchValue: string): RateFunc => (textValue: string): number => {
  if (searchValue === textValue) {
    return Number.MAX_SAFE_INTEGER;
  }
  let result = 0;
  let searchAfterPos = 0;
  let continualCount = 0;
  for (let pos = 0; pos < searchValue.length; pos++) {
    const char = searchValue.charAt(pos);
    const foundAt = textValue.indexOf(char, searchAfterPos);
    if (foundAt === -1) {
      return 0;
    }
    if (foundAt === searchAfterPos) {
      continualCount++;
      result += continualCount;
    } else {
      continualCount = 1;
      result += continualCount;
    }
    searchAfterPos = foundAt + 1;
  }
  return result;
};



export const prioritizeContinualCharactersAndWordStarts = (searchValue: string, isWordStart: IsWordStart): RateFunc => (textValue: string): number => {
  if (searchValue === textValue) {
    return Number.MAX_SAFE_INTEGER;
  }
  let result = 0;
  let searchAfterPos = 0;
  let continualCount = 0;
  for (let pos = 0; pos < searchValue.length; pos++) {
    const char = searchValue.charAt(pos);
    const foundAt = textValue.indexOf(char, searchAfterPos);
    if (foundAt === -1) {
      return 0;
    }
    if (foundAt === searchAfterPos) {
      continualCount++;
      result += continualCount;
    } else if (isWordStart(char, foundAt, textValue)) {
      continualCount++;
      result += continualCount;
    } else {
      continualCount = 1;
      result += continualCount;
    }
    searchAfterPos = foundAt + 1;
  }
  return result;
};

export const filterStringArrayByRate = (rateFunc: RateFunc, minRate = 1) => (textValues: string[]): string[] => {
  return textValues.filter((textValue) => rateFunc(textValue) >= minRate);
}

const compareValuesWithRank: CompareFunc = (valueWithRankA: ValueWithRank, valueWithRankB: ValueWithRank) => {
  return valueWithRankB.rank - valueWithRankA.rank;
}

export const orderedRatedStringArrayByRate = (rateFunc: RateFunc, minRate = 1) => (textValues: string[]): ValueWithRank[] => {
  const unorderedFilteredValuesWithRank = textValues.reduce<ValueWithRank[]>((prev, textValue) => {
    const rank = rateFunc(textValue);
    if (rank >= minRate) {
      prev.push({
        textValue,
        rank,
      })
    }
    return prev;
  }, []);
  const orderedFilteredValuesWithRank = unorderedFilteredValuesWithRank.sort(compareValuesWithRank);
  return orderedFilteredValuesWithRank;
}

export const orderedStringArrayByRate = (rateFunc: RateFunc, minRate = 1) => (textValues: string[]): string[] => {
  const orderedFilteredValuesWithRank = orderedRatedStringArrayByRate(rateFunc, minRate)(textValues);
  const orderedValues = orderedFilteredValuesWithRank.map((valueWithRank) => valueWithRank.textValue);
  return orderedValues;
}
