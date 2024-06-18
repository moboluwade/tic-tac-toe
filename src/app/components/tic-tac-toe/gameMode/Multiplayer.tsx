"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from 'next/image';


interface MultiplayerProps {
    board: (string | null)[][];
    setBoard: Dispatch<SetStateAction<(string | null)[][]>>;
    GamePieceCross: React.FC;
    GamePieceDot: React.FC;
}

const Multiplayer: React.FC<MultiplayerProps> = ({ board, setBoard, GamePieceCross, GamePieceDot }) => {
    // state management
    const [winner, setWinner] = useState<null | string>(null)
    const [turnCount, setTurnCount] = useState<number>(0);

    // Function to update a specific position on the board
    const updatePosition = (row: number, col: number, value: string | null) => {
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

    const renderGamePiece = (rowIndex: number, colIndex: number) => {
        const value = board[rowIndex][colIndex];
        if (value === 'X') {
            return <GamePieceCross />;
        } else if (value === 'O') {
            return <GamePieceDot />;
        } else {
            return null;
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
            <div>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className={`flex ${winner !== null && 'opacity-50'}`}>
                        {row.map((cell, colIndex) => {
                            // Define additional class names for specific button positions
                            const additionalClassName =
                                (rowIndex === 0 && colIndex === 0) ? 'rounded-tl-md' :
                                    (rowIndex === 0 && colIndex === 2) ? 'rounded-tr-md' :
                                        (rowIndex === 2 && colIndex === 0) ? 'rounded-bl-md' :
                                            (rowIndex === 2 && colIndex === 2) ? 'rounded-br-md' : '';

                            return (
                                <button
                                    disabled={winner !== null}
                                    key={colIndex}
                                    onClick={() => handleButtonClick(rowIndex, colIndex)}
                                    className={`w-28 h-28 bg-black z-10 flex justify-center items-center ${additionalClassName} `}
                                >
                                    {renderGamePiece(rowIndex, colIndex)}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="w-full flex flex-row justify-start">
                <button onClick={resetBoard} className="mt-4 p-2 bg-red-500 text-white rounded">Reset Board</button>
            </div>
        </div>
    );
}

export default Multiplayer;
