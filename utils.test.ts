import { IsWordStart } from "./types";
import {
  containsExactString,
  containsEveryCharactersAnywhere,
  containsEveryCharactersBehind,
  countExistingCharactersAnywhere,
  countExistingCharactersBehind,
  prioritizeContinualCharacters,
  prioritizeContinualCharactersAndWordStarts,
  filterStringArray,
  filterStringArrayByRate,
  orderedRatedStringArrayByRate,
  orderedStringArrayByRate,
} from "./utils"

describe('utils', () => {
  describe('containsFullString', () => {
    it('should return the right boolean', () => {
      expect(containsExactString('abc')('abc')).toBe(true);
      expect(containsExactString('abc')('abcd')).toBe(true);
      expect(containsExactString('abcd')('abc')).toBe(false);
    })
  })

  describe('containsEveryCharactersAnywhere', () => {
    it('should return the right boolean', () => {
      expect(containsEveryCharactersAnywhere('abc')('abc')).toBe(true);
      expect(containsEveryCharactersAnywhere('abc')('abcd')).toBe(true);
      expect(containsEveryCharactersAnywhere('abcd')('abc')).toBe(false);

      expect(containsEveryCharactersAnywhere('aaa')('abc')).toBe(true); // hmmm
      expect(containsEveryCharactersAnywhere('abc')('aaa')).toBe(false);
      expect(containsEveryCharactersAnywhere('abc')('cba')).toBe(true); // hmmm
    })
  })

  describe('containsEveryCharactersBehind', () => {
    it('should return the right boolean', () => {
      expect(containsEveryCharactersBehind('abc')('abc')).toBe(true);
      expect(containsEveryCharactersBehind('abc')('abcd')).toBe(true);
      expect(containsEveryCharactersBehind('abcd')('abc')).toBe(false);

      expect(containsEveryCharactersBehind('aaa')('abc')).toBe(false);
      expect(containsEveryCharactersBehind('abc')('aaa')).toBe(false);
      expect(containsEveryCharactersBehind('abc')('cba')).toBe(false);
    })
  })

  describe('countExistingCharactersAnywhere', () => {
    it('should return the right number', () => {
      expect(countExistingCharactersAnywhere('abc')('abc')).toBe(3);
      expect(countExistingCharactersAnywhere('abc')('abcd')).toBe(3);
      expect(countExistingCharactersAnywhere('abcd')('abc')).toBe(0);
      expect(countExistingCharactersAnywhere('abd')('abcd')).toBe(3);

      expect(countExistingCharactersAnywhere('aaa')('abc')).toBe(3);
      expect(countExistingCharactersAnywhere('abc')('aaa')).toBe(0);
      expect(countExistingCharactersAnywhere('abc')('cba')).toBe(3);
    })
  })

  describe('countExistingCharactersBehind', () => {
    it('should return the right number', () => {
      expect(countExistingCharactersBehind('abc')('abc')).toBe(3);
      expect(countExistingCharactersBehind('abc')('abcd')).toBe(3);
      expect(countExistingCharactersBehind('abcd')('abc')).toBe(0);
      expect(countExistingCharactersBehind('abd')('abcd')).toBe(3);

      expect(countExistingCharactersBehind('aaa')('abc')).toBe(0);
      expect(countExistingCharactersBehind('abc')('aaa')).toBe(0);
      expect(countExistingCharactersBehind('abc')('cba')).toBe(0);
    })
  })

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
      const isWordStat: IsWordStart = (_, position, textValue) => position === 0 || textValue.charAt(position - 1) === ' ';

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

  describe('filterStringArray', () => {
    it('should return the right values', () => {
      const filterFunc = containsEveryCharactersBehind('abc');
      const textValues = ['abc', 'abcdef', 'xyz'];
      const filteredValues = filterStringArray(filterFunc)(textValues);
      const expectedValues = ['abc', 'abcdef'];
      expect(filteredValues).toEqual(expectedValues);
    })
  })

  describe('filterStringArrayByRate', () => {
    it('should return the right values', () => {
      const isWordStat: IsWordStart = (_, position, textValue) => position === 0 || textValue.charAt(position - 1) === ' ';

      const rateFunc = prioritizeContinualCharactersAndWordStarts('abc', isWordStat);
      const textValues = ['abc', 'abcdef', 'xyz'];
      const filteredValues = filterStringArrayByRate(rateFunc)(textValues);
      const expectedValues = ['abc', 'abcdef']; 
      expect(filteredValues).toEqual(expectedValues);
    })
  })

  describe('orderedRatedStringArrayByRate', () => {
    it('should return the values in the right order', () => {
      const isWordStat: IsWordStart = (_, position, textValue) => position === 0 || textValue.charAt(position - 1) === ' ';

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
      const isWordStat: IsWordStart = (_, position, textValue) => position === 0 || textValue.charAt(position - 1) === ' ';

      const rateFunc = prioritizeContinualCharactersAndWordStarts('abc', isWordStat);
      const textValues = ['aa bb cc', 'xa xb xc', 'abc', 'abcdef', 'xyz'];
      const filteredValues = orderedStringArrayByRate(rateFunc)(textValues);
      const expectedValues = ['abc', 'aa bb cc', 'abcdef', 'xa xb xc'];
      expect(filteredValues).toEqual(expectedValues);
    })
  })
})
