import Image from 'next/image'
import React from 'react'
import TicTacToe from '../components/tic-tac-toe/TicTacToe';



// needs testing
// const checkWin = (board: (string | null)[][]) => {
//   const size = board.length;
//   let rowCheck, colCheck, mainDiagonalCheck = true, antiDiagonalCheck = true;

//   for (let i = 0; i < size; i++) {
//     rowCheck = true;
//     colCheck = true;

//     for (let j = 0; j < size; j++) {
//       // Check row
//       if (board[i][j] === null || board[i][j] !== board[i][0]) {
//         rowCheck = false;
//       }

//       // Check column
//       if (board[j][i] === null || board[j][i] !== board[0][i]) {
//         colCheck = false;
//       }
//     }

//     // If a row is consistent and not null, return the winner
//     if (rowCheck && board[i][0] !== null) {
//       return board[i][0];
//     }

//     // If a column is consistent and not null, return the winner
//     if (colCheck && board[0][i] !== null) {
//       return board[0][i];
//     }

//     // Check main diagonal
//     if (board[i][i] === null || board[i][i] !== board[0][0]) {
//       mainDiagonalCheck = false;
//     }

//     // Check anti-diagonal
//     if (board[i][size - 1 - i] === null || board[i][size - 1 - i] !== board[0][size - 1]) {
//       antiDiagonalCheck = false;
//     }
//   }

//   // Check if any of the diagonals have consistent values
//   if (mainDiagonalCheck && board[0][0] !== null) {
//     return board[0][0];
//   }

//   if (antiDiagonalCheck && board[0][size - 1] !== null) {
//     return board[0][size - 1];
//   }

//   // No winner found
//   return null;

// }

const page = () => {

  return (
    <div className='flex flex-col items-center relative'>
      <h1 className='text-xl'>Tic-Tac-Toe</h1>

      {/* {checkWin(board)}
      {checkWin(board) === null && "no winner"} */}
      <section className='relative'>
        <TicTacToe />
      </section>
      {/* <Image clasfsName='w-[30rem] h-fit absolute top-0' width={200} height={200} alt='hash' src="/black-hash.svg" /> */}

      {/* Player Scores Component */}
      {/* messaging/ chat-notification component */}
      {/* Tic-Tac-Toe Game */}
      {/* Quick Chat Reactions at the bottom */}
    </div>
  )
}

export default page