import Image from 'next/image';
import React from 'react'

type RenderGamePieceType = (
    rowIndex: number,
    colIndex: number
) => JSX.Element | null;

interface Props {
    board: ('X' | 'O' | null)[][];
    winner: string | null;
    handleButtonClick: (rowIndex: number, colIndex: number) => void;
    // renderGamePiece: RenderGamePieceType;
}
const GameBoard: React.FC<Props> = ({ board, winner, handleButtonClick }) => {

    const renderGamePiece = (rowIndex: number, colIndex: number) => {
        // this function renders a game piece based on the value of each provided coordinate
        const value = board[rowIndex]?.[colIndex];
        console.log(value)
        if (value === 'X') {
            return (
                <div className='w-[30px] h-[30px] md:w-[60px] md:h-[60px]'>
                    <GamePieceCross />
                </div>
            )
        } else if (value === 'O') {
            return (
                <div className='w-[40px] h-[40px] md:w-[80px] md:h-[80px]'>
                    <GamePieceDot />
                </div>
            )
        } else {
            return null;
        }
    };

    const GamePieceCross: React.FC = () => {
        return (
            <Image src="/game-cross.svg" width={60} height={60} alt="X" />
        );
    }

    const GamePieceDot: React.FC = () => {
        return (
            <Image src="/game-dot.svg" width={80} height={80} alt="O" />
        );
    }
    return (
        <div>
            {board && board.map((row, rowIndex) => (
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
                                className={`md:w-28 md:h-28 w-16 h-16 bg-black z-10 flex justify-center items-center ${additionalClassName} `}
                            >
                                {renderGamePiece(rowIndex, colIndex)}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    )
}

export default GameBoard