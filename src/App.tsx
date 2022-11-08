import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './config/hooks';
import { changeTurn, endGame, setWinner, resetGame } from './config/reducer';
import { Row } from './components/Row/Row';

import './App.css';

const winOptions = [
  ['11', '12', '13'],
  ['21', '22', '23'],
  ['31', '32', '33'],
  ['11', '21', '31'],
  ['12', '22', '32'],
  ['13', '23', '33'],
  ['11', '22', '33'],
  ['13', '22', '31']
] as any;

function App() {
  const dispatch = useAppDispatch();
  const ticTacToe = useAppSelector(state => state.ticTacToe);

  const buildRows = () => {
    const rowsArr = [];
    for(let i = 1; i <= 3; i++) {
      rowsArr.push(<Row key={Math.random()} rowId={i}/>)
    }
    return rowsArr;
  }

  const checkWin = () => {
    const coords = [] as any;

    //transformation of array for easy to compare
    ticTacToe.filledSquares.filter(item => item.figure === ticTacToe.whoseTurn).map(item => {
      coords.push(item.id);
    })

    //check if coords matches any of win options
    const result = winOptions.find((item: any[]) => {
      return item.every((val: string) => coords.includes(val))
    })
    return result;
  }

  const handleResetGame = () => {
    dispatch(resetGame())
  }

  useEffect(() => {
    if(ticTacToe.filledSquares.length > 0 && ticTacToe.turnNum > 0) {
      const nextTurn = ticTacToe.whoseTurn === 'cross' ? 'zero' : 'cross';
      dispatch(changeTurn(nextTurn))
    }
    if(ticTacToe.turnNum === 9 && !checkWin()) {
      dispatch(endGame())
      dispatch(setWinner('draw'))
    }
  }, [ticTacToe.turnNum])

  useEffect(() => {
    if(ticTacToe.turnNum >= 5) {
      if(checkWin()) {
        dispatch(endGame())
        dispatch(setWinner(ticTacToe.whoseTurn))
      }
    }
  }, [ticTacToe.filledSquares, ticTacToe.turnNum])

  return (
    <div className='main-wrapper'>
      <h1>Tic Tac Toe</h1>
      {!ticTacToe.isGameEnded && <p className='centered-text'>Whose turn: {ticTacToe.whoseTurn}</p>}
      {ticTacToe.isGameEnded && (
        <p className='centered-text'>
          {ticTacToe.winner === 'draw' ? 'It\'s a draw!' : `Winner is: ${ticTacToe.winner}`}
        </p>
      )}
      <div className='field-wrapper'>
        {buildRows()}
      </div>
      <button className='resetBtn' onClick={handleResetGame}>
        {`${ticTacToe.isGameEnded ? 'New game' : 'Reset game'}`}
      </button>
    </div>
  );
}

export default App;
