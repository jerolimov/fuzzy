import { IsWordStart } from "./types"
import {
    whitespaceWordStart,
    kebapCaseWordStart,
    underscoreWordStart,
    pascalCaseWordStart,
    CamelCaseWordStart,
} from "./words"

const count = (isWordStart: IsWordStart, textValue: string) => {
  let result = 0;
  for (let position = 0; position < textValue.length; position++) {
    const char = textValue[position];
    if (isWordStart(char, position, textValue)) {
      result++;
    }
  }
  return result;
}

describe('words', () => {
  describe('whitespaceWordStart', () => {
    it('counts the right number of characters behind a whitespace', () => {
      expect(count(whitespaceWordStart, 'fuzzysearch')).toBe(1);
      expect(count(whitespaceWordStart, 'fuzzy-search')).toBe(1);
      expect(count(whitespaceWordStart, 'fuzzy search')).toBe(2);
      expect(count(whitespaceWordStart, 'fuzzy search works')).toBe(3);
      // FIXME:
      // expect(count(whitespaceWordStart, 'fuzzy  search')).toBe(2);
      // expect(count(whitespaceWordStart, ' fuzzy  search ')).toBe(2);
    })
  })

  describe('kebapCaseWordStart', () => {
    it('counts the right number of characters behind a dash', () => {
      expect(count(kebapCaseWordStart, 'fuzzysearch')).toBe(1);
      expect(count(kebapCaseWordStart, 'fuzzy search')).toBe(1);
      expect(count(kebapCaseWordStart, 'fuzzy-search')).toBe(2);
      expect(count(kebapCaseWordStart, 'fuzzy-search-works')).toBe(3);
      // FIXME:
      // expect(count(kebapCaseWordStart, 'fuzzy--search')).toBe(2);
      // expect(count(kebapCaseWordStart, '-fuzzy--search-')).toBe(2);
    })
  })

  describe('underscoreWordStart', () => {
    it('counts the right number of characters behind a underscore', () => {
      expect(count(underscoreWordStart, 'fuzzysearch')).toBe(1);
      expect(count(underscoreWordStart, 'fuzzy search')).toBe(1);
      expect(count(underscoreWordStart, 'fuzzy_search')).toBe(2);
      expect(count(underscoreWordStart, 'fuzzy_search_works')).toBe(3);
      // FIXME:
      // expect(count(underscoreWordStart, 'fuzzy__search')).toBe(2);
      // expect(count(underscoreWordStart, '_fuzzy__search_')).toBe(2);
    })
  })

  describe('pascalCaseWordStart', () => {
    it('counts the right number of characters behind a underscore', () => {
      expect(count(pascalCaseWordStart, 'fuzzysearch')).toBe(1);
      expect(count(pascalCaseWordStart, 'fuzzy search')).toBe(1);
      expect(count(pascalCaseWordStart, 'fuzzySearch')).toBe(2);
      expect(count(pascalCaseWordStart, 'fuzzySearchWorks')).toBe(3);
      expect(count(pascalCaseWordStart, 'FuzzySearch')).toBe(1); // FIXME: uzzySearch, hmmm, not perfect

      expect(count(pascalCaseWordStart, 'fuzzySEARCH')).toBe(2);
      expect(count(pascalCaseWordStart, 'FUZZYSEARCH')).toBe(0);
    })
  })

  describe('CamelCaseWordStart', () => {
    it('counts the right number of characters behind a underscore', () => {
      expect(count(CamelCaseWordStart, 'fuzzysearch')).toBe(0);
      expect(count(CamelCaseWordStart, 'fuzzy search')).toBe(0);
      expect(count(CamelCaseWordStart, 'fuzzySearch')).toBe(1);
      expect(count(CamelCaseWordStart, 'FuzzySearch')).toBe(2);
      expect(count(CamelCaseWordStart, 'FuzzySearchWorks')).toBe(3);

      expect(count(CamelCaseWordStart, 'fuzzySEARCH')).toBe(1); // SEARCH
      expect(count(CamelCaseWordStart, 'FuzzySEARCH')).toBe(2);
      expect(count(CamelCaseWordStart, 'FUZZYSEARCH')).toBe(1);
    })
  })
})
