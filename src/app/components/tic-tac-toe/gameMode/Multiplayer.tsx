"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GameMode from "../GameBoard";

interface MultiplayerProps {
    board: ('X' | 'O' | null)[][];
    setBoard: Dispatch<SetStateAction<('X' | 'O' | null)[][]>>;
}

const Multiplayer: React.FC<MultiplayerProps> = ({ board, setBoard }) => {
    // state management
    const [winner, setWinner] = useState<null | string>(null)
    const [turnCount, setTurnCount] = useState<number>(0);

    // Function to update a specific position on the board
    const updatePosition = (row: number, col: number, value: 'X' | 'O' | null) => {
        if (row >= 0 && row < board.length && col >= 0 && col < board[0].length) {
            const updatedBoard = [...board];
            updatedBoard[row][col] = value;
            setBoard(updatedBoard);
        } else {
            console.log('Invalid position');
        }
    };

    // Function to reset the board to its initial state
    const resetBoard = () => {
        setBoard([
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]);
        setTurnCount(0);
        setWinner(null);
    };

    const handleButtonClick = (rowIndex: number, colIndex: number) => {
        if (board[rowIndex][colIndex] === null) {
            setBoard(prevBoard => {
                const newBoard = prevBoard.map((row, rIndex) =>
                    row.map((cell, cIndex) =>
                        rIndex === rowIndex && cIndex === colIndex ? (turnCount % 2 === 0 ? 'X' : 'O') : cell
                    )
                );
                return newBoard;
            });
            setTurnCount(prevTurnCount => prevTurnCount + 1);
        }
    };

    useEffect(() => {
        //turn logic, at the stat of the game start counting turns


        // needs testing
        const checkWin = (board: (string | null)[][]) => {
            const size = board.length;
            let rowCheck, colCheck, mainDiagonalCheck = true, antiDiagonalCheck = true;

            for (let i = 0; i < size; i++) {
                rowCheck = true;
                colCheck = true;

                for (let j = 0; j < size; j++) {
                    // Check row
                    if (board[i][j] === null || board[i][j] !== board[i][0]) {
                        rowCheck = false;
                    }

                    // Check column
                    if (board[j][i] === null || board[j][i] !== board[0][i]) {
                        colCheck = false;
                    }
                }

                // If a row is consistent and not null, return the winner
                if (rowCheck && board[i][0] !== null) {
                    return board[i][0];
                }

                // If a column is consistent and not null, return the winner
                if (colCheck && board[0][i] !== null) {
                    return board[0][i];
                }

                // Check main diagonal
                if (board[i][i] === null || board[i][i] !== board[0][0]) {
                    mainDiagonalCheck = false;
                }

                // Check anti-diagonal
                if (board[i][size - 1 - i] === null || board[i][size - 1 - i] !== board[0][size - 1]) {
                    antiDiagonalCheck = false;
                }
            }

            // Check if any of the diagonals have consistent values
            if (mainDiagonalCheck && board[0][0] !== null) {
                return board[0][0];
            }

            if (antiDiagonalCheck && board[0][size - 1] !== null) {
                return board[0][size - 1];
            }

            // No winner found
            return null;

        }

        turnCount > 4 && console.log(checkWin(board), setWinner(checkWin(board)))
    }, [turnCount, board])
    return (
        <div className={`w-full h-full relative rounded-md flex flex-col justify-start items-center `}>
            {/* winner chicken dinner banner */}
            <div className="absolute">

                {/* {checkWin(board)}
            {checkWin(board) === null && "no winner"} */}
            </div>
            <GameMode board={board} winner={winner} handleButtonClick={handleButtonClick} />
            <div className="w-full flex flex-row justify-start">
                <button onClick={resetBoard} className="mt-4 p-2 bg-red-500 text-white rounded">Reset Board</button>
            </div>
        </div>
    );
}

export default Multiplayer;
