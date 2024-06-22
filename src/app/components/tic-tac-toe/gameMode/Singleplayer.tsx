"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface SinglePlayerProps {
    board: (string | null)[][];
    setBoard: Dispatch<SetStateAction<(string | null)[][]>>;
    GamePieceCross: React.FC;
    GamePieceDot: React.FC;
}

const SinglePlayer: React.FC<SinglePlayerProps> = ({ board, setBoard, GamePieceCross, GamePieceDot }) => {
    const [winner, setWinner] = useState<null | string>(null);
    const [turnCount, setTurnCount] = useState<number>(0);
    const epsilon = 0.1; // Probability of making a random move

    const updatePosition = (row: number, col: number, value: string | null) => {
        // fills up the coordinates (row, col) provided and returns a new board object
        if (row >= 0 && row < board.length && col >= 0 && col < board[0].length) {
            const updatedBoard = [...board];
            updatedBoard[row][col] = value;
            setBoard(updatedBoard);
        } else {
            console.log('Invalid position');
        }
    };

    const resetBoard = () => {
        // sets all sub-elements in the board object to null
        setBoard([
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]);
        setTurnCount(0);
        setWinner(null);
    };

    const handleButtonClick = (rowIndex: number, colIndex: number) => {
        // sets an X value to a coordinate within the board object
        if (board[rowIndex][colIndex] === null && winner === null) {
            setBoard(prevBoard => {
                const newBoard = prevBoard.map((row, rIndex) =>
                    row.map((cell, cIndex) =>
                        rIndex === rowIndex && cIndex === colIndex ? 'X' : cell
                    )
                );
                return newBoard;
            });
            setTurnCount(prevTurnCount => prevTurnCount + 1);
        }
    };

    const renderGamePiece = (rowIndex: number, colIndex: number) => {
        // this function renders a game piece based on the value of each provided coordinate
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
        const checkWin = (board: (string | null)[][]) => {
            // check if the current game has been won by 'X' or 'O'
            const size = board.length;
            let rowCheck, colCheck, mainDiagonalCheck = true, antiDiagonalCheck = true;

            for (let i = 0; i < size; i++) {
                rowCheck = true;
                colCheck = true;

                for (let j = 0; j < size; j++) {
                    if (board[i][j] === null || board[i][j] !== board[i][0]) {
                        rowCheck = false;
                    }

                    if (board[j][i] === null || board[j][i] !== board[0][i]) {
                        colCheck = false;
                    }
                }

                if (rowCheck && board[i][0] !== null) {
                    return board[i][0];
                }

                if (colCheck && board[0][i] !== null) {
                    return board[0][i];
                }

                if (board[i][i] === null || board[i][i] !== board[0][0]) {
                    mainDiagonalCheck = false;
                }

                if (board[i][size - 1 - i] === null || board[i][size - 1 - i] !== board[0][size - 1]) {
                    antiDiagonalCheck = false;
                }
            }

            if (mainDiagonalCheck && board[0][0] !== null) {
                return board[0][0];
            }

            if (antiDiagonalCheck && board[0][size - 1] !== null) {
                return board[0][size - 1];
            }

            return null;
        };

        const minimax = (board: (string | null)[][], depth: number, isMaximizing: boolean, alpha: number, beta: number): number => {
            const score = evaluate(board);

            if (score === 10) return score - depth;
            if (score === -10) return score + depth;
            if (!isMovesLeft(board)) return 0;

            if (Math.random() < epsilon) {
                const availableMoves = getAvailableMoves(board);
                const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
                board[randomMove[0]][randomMove[1]] = isMaximizing ? 'X' : 'O';
                const result = minimax(board, depth + 1, !isMaximizing, alpha, beta);
                board[randomMove[0]][randomMove[1]] = null;
                return result;
            }

            if (isMaximizing) {
                let best = -1000;
                for (let i = 0; i < board.length; i++) {
                    for (let j = 0; j < board[i].length; j++) {
                        if (board[i][j] === null) {
                            board[i][j] = 'X';
                            best = Math.max(best, minimax(board, depth + 1, false, alpha, beta));
                            board[i][j] = null;
                            alpha = Math.max(alpha, best);
                            if (beta <= alpha) break;
                        }
                    }
                }
                return best;
            } else {
                let best = 1000;
                for (let i = 0; i < board.length; i++) {
                    for (let j = 0; j < board[i].length; j++) {
                        if (board[i][j] === null) {
                            board[i][j] = 'O';
                            best = Math.min(best, minimax(board, depth + 1, true, alpha, beta));
                            board[i][j] = null;
                            beta = Math.min(beta, best);
                            if (beta <= alpha) break;
                        }
                    }
                }
                return best;
            }
        };

        const evaluate = (board: (string | null)[][]) => {
            const size = board.length;
            let rowCheck, colCheck, mainDiagonalCheck = true, antiDiagonalCheck = true;

            for (let i = 0; i < size; i++) {
                rowCheck = true;
                colCheck = true;

                for (let j = 0; j < size; j++) {
                    if (board[i][j] === null || board[i][j] !== board[i][0]) {
                        rowCheck = false;
                    }

                    if (board[j][i] === null || board[j][i] !== board[0][i]) {
                        colCheck = false;
                    }
                }

                if (rowCheck && board[i][0] !== null) {
                    return board[i][0] === 'X' ? 10 : -10;
                }

                if (colCheck && board[0][i] !== null) {
                    return board[0][i] === 'X' ? 10 : -10;
                }

                if (board[i][i] === null || board[i][i] !== board[0][0]) {
                    mainDiagonalCheck = false;
                }

                if (board[i][size - 1 - i] === null || board[i][size - 1 - i] !== board[0][size - 1]) {
                    antiDiagonalCheck = false;
                }
            }

            if (mainDiagonalCheck && board[0][0] !== null) {
                return board[0][0] === 'X' ? 10 : -10;
            }

            if (antiDiagonalCheck && board[0][size - 1] !== null) {
                return board[0][size - 1] === 'X' ? 10 : -10;
            }

            return 0;
        };

        const isMovesLeft = (board: (string | null)[][]) => {
            return board.some(row => row.includes(null));
        };

        const getAvailableMoves = (board: (string | null)[][]) => {
            const moves: [number, number][] = [];
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === null) {
                        moves.push([i, j]);
                    }
                }
            }
            return moves;
        };

        const computerMove = () => {
            const bestMove = findBestMove(board);
            if (bestMove !== -1) {
                const [row, col] = bestMove;
                setBoard(prevBoard => {
                    const newBoard = prevBoard.map((r, rIndex) =>
                        r.map((cell, cIndex) =>
                            rIndex === row && cIndex === col ? 'O' : cell
                        )
                    );
                    return newBoard;
                });
                setTurnCount(prevTurnCount => prevTurnCount + 1);
            }
        };

        const findBestMove = (board: (string | null)[][]) => {
            let bestVal = 1000;
            let bestMove: [number, number] | -1 = -1;

            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === null) {
                        board[i][j] = 'O';
                        const moveVal = minimax(board, 0, true, -1000, 1000);
                        board[i][j] = null;

                        if (moveVal < bestVal) {
                            bestMove = [i, j];
                            bestVal = moveVal;
                        }
                    }
                }
            }
            return bestMove;
        };

        const winnerCheck = checkWin(board);
        if (winnerCheck !== null) {
            setWinner(winnerCheck);
        } else if (turnCount % 2 !== 0 && winner === null) {
            computerMove();
        }

    }, [turnCount, board, winner, setBoard]);

    return (
        <div className={`w-full h-full relative rounded-md flex flex-col justify-start items-center`}>
            <div className="absolute">
                {winner && `${winner} wins!`}
                {!winner && turnCount === 9 && "It's a draw!"}
            </div>
            <div>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className={`flex ${winner !== null && 'opacity-50'}`}>
                        {row.map((cell, colIndex) => {
                            const additionalClassName =
                                (rowIndex === 0 && colIndex === 0) ? 'rounded-tl-md' :
                                    (rowIndex === 0 && colIndex === 2) ? 'rounded-tr-md' :
                                        (rowIndex === 2 && colIndex === 0) ? 'rounded-bl-md' :
                                            (rowIndex === 2 && colIndex === 2) ? 'rounded-br-md' : '';

                            return (
                                <button
                                    disabled={winner !== null || board[rowIndex][colIndex] !== null}
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
};

export default SinglePlayer;
