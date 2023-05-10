import {
  countExistingCharactersAnywhere,
  countExistingCharactersBehind,
} from "./count"

describe('count', () => {
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
})
