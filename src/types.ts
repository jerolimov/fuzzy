
export type ValueWithRank = { textValue: string, rank: number };

export type FilterFunc = (textValue: string) => boolean;

export type RateFunc = (textValue: string) => number;

export type CompareFunc = (valueWithRankA: ValueWithRank, valueWithRankB: ValueWithRank) => number;

export type IsWordStart = (char: string, position: number, textValue: string) => boolean;
