export type FigureType = 'cross' | 'zero';

export type FilledSquareType = {
  row: number;
  column: number;
  figure: FigureType;
  id: string;
}