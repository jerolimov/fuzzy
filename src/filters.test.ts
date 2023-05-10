import {
  containsExactString,
  containsEveryCharactersAnywhere,
  containsEveryCharactersBehind,
  filterStringArray,
} from "./filters"

describe('filters', () => {
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

  describe('filterStringArray', () => {
    it('should return the right values', () => {
      const filterFunc = containsEveryCharactersBehind('abc');
      const textValues = ['abc', 'abcdef', 'xyz'];
      const filteredValues = filterStringArray(filterFunc)(textValues);
      const expectedValues = ['abc', 'abcdef'];
      expect(filteredValues).toEqual(expectedValues);
    })
  })
})
