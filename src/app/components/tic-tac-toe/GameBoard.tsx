"use client"

import { useState } from "react";

const GameBoard = () => {
    const [board, setBoard] = useState<(null | string)[][]>([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]);

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
    };

    return (
        <div className='w-full h-full relative rounded-md'>

            <div className='start-row'>
                <div className='w-28 h-28 bg-black absolute z-10 rounded-none rounded-tl-md flex flex-row justify-center items-center'>
                    <span>1</span>
                </div>
                <div className='w-28 h-28 bg-black absolute z-10 left-28 flex flex-row justify-center items-center'>
                    <span>2</span>
                </div>
                <div className='w-28 h-28 bg-black absolute z-10 left-56 rounded-none rounded-tr-md flex flex-row justify-center items-center'>
                    <span>3</span>
                </div>
            </div>

            <div className='middle-row absolute top-28'>
                <div className='w-28 h-28 bg-black absolute z-10 flex flex-row justify-center items-center'>
                    <span>4</span>
                </div>
                <div className='w-28 h-28 bg-black absolute z-10 left-28 flex flex-row justify-center items-center '>
                    <span>5</span>
                </div>
                <div className='w-28 h-28 bg-black absolute z-10 left-56 flex flex-row justify-center items-center '>
                    <span>6</span>
                </div>
            </div>

            <div className='middle-row absolute top-56'>
                <div className='w-28 h-28 bg-black absolute z-10 rounded-none rounded-bl-md flex flex-row justify-center items-center'>
                    <span>7</span>
                </div>
                <div className='w-28 h-28 bg-black absolute z-10 left-28  flex flex-row justify-center items-center'>
                    <span>8</span>
                </div>
                <div className='w-28 h-28 bg-black absolute z-10 left-56 rounded-none rounded-br-md flex flex-row justify-center items-center'>
                    <span>9</span>
                </div>
            </div>

        </div>
    )
}

export default GameBoard