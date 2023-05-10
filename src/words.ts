import { IsWordStart } from "./types";

const isWhitespace = (char: string) => {
  return char === ' ' ||
      char === '\n' ||
      char === '\t' ||
      char === '\r' ||
      char === '\f' ||
      char === '\v' ||
      char === '\u00a0' ||
      char === '\u1680' ||
      char === '\u2000' ||
      char === '\u200a' ||
      char === '\u2028' ||
      char === '\u2029' ||
      char === '\u202f' ||
      char === '\u205f' ||
      char === '\u3000' ||
      char === '\ufeff';
}

export const whitespaceWordStart: IsWordStart = (_, position, textValue) =>
    position === 0 ||
    isWhitespace(textValue.charAt(position - 1));

export const kebapCaseWordStart: IsWordStart = (_, position, textValue) =>
    position === 0 || textValue.charAt(position - 1) === '-';

export const underscoreWordStart: IsWordStart = (_, position, textValue) =>
    position === 0 || textValue.charAt(position - 1) === '_';

export const pascalCaseWordStart: IsWordStart = (char, position, textValue) =>
    position === 0 && char >= 'a' && char <= 'z' ||
    position !== 0 && char >= 'A' && char <= 'Z' && !(textValue.charAt(position - 1) >= 'A' && textValue.charAt(position - 1) <= 'Z');

export const CamelCaseWordStart: IsWordStart = (char, position, textValue) =>
    char >= 'A' && char <= 'Z' && !(textValue.charAt(position - 1) >= 'A' && textValue.charAt(position - 1) <= 'Z');
