export interface ICell {
  id: number;
  value: string | null;
  win?: boolean;
}

export interface GameResult {
  date: string;
  winner: string;
  gamer: string[];
  duration: number;
  gridSize: number;
  time: number;
  fieldHeight: number;
}
