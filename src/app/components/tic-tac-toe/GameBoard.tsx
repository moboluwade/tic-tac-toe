'use client'
import { useState } from "react";
import Multiplayer from "./gameMode/Multiplayer";
import Image from "next/image";
import Singleplayer from "./gameMode/Singleplayer";

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

const GameBoard = () => {
    const [gameMode, setGameMode] = useState<null | string>(null)
    const [board, setBoard] = useState<(null | string)[][]>([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]);

    return (
        <div>
            {gameMode === 'singleplayer' && < Singleplayer board={board} setBoard={setBoard} GamePieceCross={GamePieceCross} GamePieceDot={GamePieceDot} />}
            {gameMode === 'multiplayer' && < Multiplayer board={board} setBoard={setBoard} GamePieceCross={GamePieceCross} GamePieceDot={GamePieceDot} />}
        </div>
    )
}

export default GameBoard