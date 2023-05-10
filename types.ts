
export type FilterFunc = (textValue: string) => boolean;

export type RateFunc = (textValue: string) => number;

export type ValueWithRank = { textValue: string, rank: number };
