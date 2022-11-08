import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { FigureType, FilledSquareType } from './types';

export interface TicTacToeState {
  whoseTurn: FigureType;
  filledSquares: any[];
  turnNum: number;
  isGameEnded: boolean;
  winner: string;
}

const initialState: TicTacToeState = {
  whoseTurn: 'cross',
  filledSquares: [],
  turnNum: 0,
  isGameEnded: false,
  winner: '',
};


export const ticTacToeSlice = createSlice({
  name: 'ticTacToe',
  initialState,
  reducers: {
    fillSquare: (state, action: PayloadAction<FilledSquareType>) => {
      state.filledSquares = [...state.filledSquares, action.payload];
    },
    changeTurn: (state, action: PayloadAction<FigureType>) => {
      state.whoseTurn = action.payload;
    },
    changeTurnNumber: (state, action: PayloadAction<number>) => {
      state.turnNum = action.payload;
    },
    endGame: (state) => {
      state.isGameEnded = true;
    },
    setWinner: (state, action: PayloadAction<string>) => {
      state.winner = action.payload;
    },
    resetGame: (state) => {
      state.whoseTurn = 'cross';
      state.filledSquares = [];
      state.turnNum = 0;
      state.isGameEnded = false;
      state.winner = '';
    },
  },
});

export const { 
  fillSquare,
  changeTurn,
  changeTurnNumber,
  endGame,
  setWinner,
  resetGame
} = ticTacToeSlice.actions;

export const selectTicTacToe = (state: RootState) => state.ticTacToe;

export default ticTacToeSlice.reducer;
