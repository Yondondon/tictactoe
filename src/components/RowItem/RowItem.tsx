import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../config/hooks';
import { fillSquare, changeTurnNumber } from '../../config/reducer';

type RowItemProps = {
  rowId: number;
  colId: number;
}

export const RowItem: FC<RowItemProps> = ({ rowId, colId}) => {

  const dispatch = useAppDispatch();
  const ticTacToe = useAppSelector(state => state.ticTacToe);

  const handleClick = () => {
    const item = {
      row: rowId,
      column: colId,
      figure: ticTacToe.whoseTurn,
      id: rowId.toString() + colId.toString(),
    }
    //check if the square has been clicked
    const isClicked = ticTacToe.filledSquares.find(elem => {
      return elem.column === item.column && elem.row === item.row
    })
    
    if(!isClicked && !ticTacToe.isGameEnded) {
      dispatch(fillSquare(item))
      dispatch(changeTurnNumber(ticTacToe.turnNum + 1))
    }
  }

  const isFilled = () => {
    const currentItem = ticTacToe.filledSquares.filter(item => item.column === colId && item.row === rowId)[0]
    return currentItem ? currentItem.figure : '';
  }

  return <div className={`square ${isFilled()}`} onClick={handleClick} />
}