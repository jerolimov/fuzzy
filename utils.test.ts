import {
  containsExactString,
  containsEveryCharactersAnywhere,
  containsEveryCharactersBehind,
  countExistingCharactersAnywhere,
  countExistingCharactersBehind,
  prioritizeContinualCharacters,
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
      expect(prioritizeContinualCharacters('abc')('abc')).toBe(6);
      expect(prioritizeContinualCharacters('abc')('abcd')).toBe(6);
      expect(prioritizeContinualCharacters('abcd')('abc')).toBe(0);
      expect(prioritizeContinualCharacters('abd')('abcd')).toBe(4);
      expect(prioritizeContinualCharacters('abc')('a b c')).toBe(3);

      expect(prioritizeContinualCharacters('aaa')('abc')).toBe(0);
      expect(prioritizeContinualCharacters('abc')('aaa')).toBe(0);
      expect(prioritizeContinualCharacters('abc')('cba')).toBe(0);
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
      const rateFunc = prioritizeContinualCharacters('abc');
      const textValues = ['abc', 'abcdef', 'xyz'];
      const filteredValues = filterStringArrayByRate(rateFunc)(textValues);
      const expectedValues = ['abc', 'abcdef']; 
      expect(filteredValues).toEqual(expectedValues);
    })
  })

  describe('orderedRatedStringArrayByRate', () => {
    it('should return the values in the right order', () => {
      const rateFunc = prioritizeContinualCharacters('abc');
      const textValues = ['a b c', 'abc', 'abcdef', 'xyz'];
      const filteredValuesWithRank = orderedRatedStringArrayByRate(rateFunc)(textValues);
      const expectedValuesWithRank = [
        { textValue: 'abc', rank: 6 },
        { textValue: 'abcdef', rank: 6 },
        { textValue: 'a b c', rank: 3 },
      ];
      expect(filteredValuesWithRank).toEqual(expectedValuesWithRank);
    })
  })

  describe('orderedStringArrayByRate', () => {
    it('should return the values in the right order', () => {
      const rateFunc = prioritizeContinualCharacters('abc');
      const textValues = ['a b c', 'abc', 'abcdef', 'xyz'];
      const filteredValues = orderedStringArrayByRate(rateFunc)(textValues);
      const expectedValues = ['abc', 'abcdef', 'a b c'];
      expect(filteredValues).toEqual(expectedValues);
    })
  })
})
