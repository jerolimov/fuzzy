import { IsWordStart } from "./types";
import {
  prioritizeContinualCharacters,
  prioritizeContinualCharactersAndWordStarts,
  filterStringArrayByRate,
  orderedRatedStringArrayByRate,
  orderedStringArrayByRate,
} from "./rank"

const isWordStat: IsWordStart = (_, position, textValue) => position === 0 || textValue.charAt(position - 1) === ' ';

describe('rank', () => {
  describe('prioritizeContinualCharacters', () => {
    it('should return the right number', () => {
      expect(prioritizeContinualCharacters('abc')('abc')).toBe(Number.MAX_SAFE_INTEGER);
      expect(prioritizeContinualCharacters('abc')('abcd')).toBe(6);
      expect(prioritizeContinualCharacters('abcd')('abc')).toBe(0);
      expect(prioritizeContinualCharacters('abd')('abcd')).toBe(4);
      expect(prioritizeContinualCharacters('abc')('a b c')).toBe(3);

      expect(prioritizeContinualCharacters('aaa')('abc')).toBe(0);
      expect(prioritizeContinualCharacters('abc')('aaa')).toBe(0);
      expect(prioritizeContinualCharacters('abc')('cba')).toBe(0);
    })
  })

  describe('prioritizeContinualCharactersAndWordStarts', () => {
    it('should return the right number', () => {
      expect(prioritizeContinualCharactersAndWordStarts('abc', isWordStat)('aa bb cc')).toBe(6);
      expect(prioritizeContinualCharactersAndWordStarts('abc', isWordStat)('xa xb xc')).toBe(3);

      expect(prioritizeContinualCharactersAndWordStarts('abc', isWordStat)('abc')).toBe(Number.MAX_SAFE_INTEGER);
      expect(prioritizeContinualCharactersAndWordStarts('abc', isWordStat)('abcd')).toBe(6);
      expect(prioritizeContinualCharactersAndWordStarts('abcd', isWordStat)('abc')).toBe(0);
      expect(prioritizeContinualCharactersAndWordStarts('abd', isWordStat)('abcd')).toBe(4);
      expect(prioritizeContinualCharactersAndWordStarts('abc', isWordStat)('a b c')).toBe(6);

      expect(prioritizeContinualCharactersAndWordStarts('aaa', isWordStat)('abc')).toBe(0);
      expect(prioritizeContinualCharactersAndWordStarts('abc', isWordStat)('aaa')).toBe(0);
      expect(prioritizeContinualCharactersAndWordStarts('abc', isWordStat)('cba')).toBe(0);
    })
  })

  describe('filterStringArrayByRate', () => {
    it('should return the right values', () => {
      const rateFunc = prioritizeContinualCharactersAndWordStarts('abc', isWordStat);
      const textValues = ['abc', 'abcdef', 'xyz'];
      const filteredValues = filterStringArrayByRate(rateFunc)(textValues);
      const expectedValues = ['abc', 'abcdef']; 
      expect(filteredValues).toEqual(expectedValues);
    })
  })

  describe('orderedRatedStringArrayByRate', () => {
    it('should return the values in the right order', () => {
      const rateFunc = prioritizeContinualCharactersAndWordStarts('abc', isWordStat);
      const textValues = ['aa bb cc', 'xa xb xc', 'abc', 'abcdef', 'xyz'];
      const filteredValuesWithRank = orderedRatedStringArrayByRate(rateFunc)(textValues);
      const expectedValuesWithRank = [
        { textValue: 'abc', rank: Number.MAX_SAFE_INTEGER },
        { textValue: 'aa bb cc', rank: 6 },
        { textValue: 'abcdef', rank: 6 },
        { textValue: 'xa xb xc', rank: 3 },
      ];
      expect(filteredValuesWithRank).toEqual(expectedValuesWithRank);
    })
  })

  describe('orderedStringArrayByRate', () => {
    it('should return the values in the right order', () => {
      const rateFunc = prioritizeContinualCharactersAndWordStarts('abc', isWordStat);
      const textValues = ['aa bb cc', 'xa xb xc', 'abc', 'abcdef', 'xyz'];
      const filteredValues = orderedStringArrayByRate(rateFunc)(textValues);
      const expectedValues = ['abc', 'aa bb cc', 'abcdef', 'xa xb xc'];
      expect(filteredValues).toEqual(expectedValues);
    })
  })
})
