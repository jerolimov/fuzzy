
type FilterFunc = (textValue: string) => boolean;

type RateFunc = (textValue: string) => number;

type ValueWithRank = { textValue: string, rank: number };

export const containsExactString = (searchValue: string) => (textValue: string): boolean => {
  return textValue.includes(searchValue);
};

export const containsEveryCharactersAnywhere = (searchValue: string) => (textValue: string): boolean => {
  for (let searchCharPos = 0; searchCharPos < searchValue.length; searchCharPos++) {
    const char = searchValue.charAt(searchCharPos);
    if (!textValue.includes(char)) {
      return false;
    }
  }
  return true;
};

export const containsEveryCharactersBehind = (searchValue: string) => (textValue: string): boolean => {
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

export const countExistingCharactersAnywhere = (searchValue: string) => (textValue: string): number => {
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

export const countExistingCharactersBehind = (searchValue: string) => (textValue: string): number => {
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

export const prioritizeContinualCharacters = (searchValue: string) => (textValue: string): number => {
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

export const filterStringArray = (filterFunc: FilterFunc) => (textValues: string[]): string[] => {
  return textValues.filter(filterFunc);
}

export const filterStringArrayByRate = (rateFunc: RateFunc, minRate = 1) => (textValues: string[]): string[] => {
  return textValues.filter((textValue) => rateFunc(textValue) >= minRate);
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

  const orderedFilteredValuesWithRank = unorderedFilteredValuesWithRank.sort((valueWithRankA, valueWithRankB) => {
    return valueWithRankB.rank - valueWithRankA.rank;
  });

  return orderedFilteredValuesWithRank;
}

export const orderedStringArrayByRate = (rateFunc: RateFunc, minRate = 1) => (textValues: string[]): string[] => {
  const orderedFilteredValuesWithRank = orderedRatedStringArrayByRate(rateFunc, minRate)(textValues);
  const orderedValues = orderedFilteredValuesWithRank.map((valueWithRank) => valueWithRank.textValue);
  return orderedValues;
}