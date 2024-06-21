'use client'
import { useEffect, useState } from "react";
import Multiplayer from "./gameMode/Multiplayer";
import Image from "next/image";
import Singleplayer from "./gameMode/Singleplayer";

interface Props {
    mode: string;
}

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

const GameBoard: React.FC<Props> = ({ mode }) => {
    const [gameMode, setGameMode] = useState<null | string>(mode ?? '')
    const [board, setBoard] = useState<(null | string)[][]>([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]);

    useEffect(() => {
        console.log(gameMode);
    },[gameMode])
    return (
        <div>
            {gameMode === 'singleplayer' && < Singleplayer board={board} setBoard={setBoard} GamePieceCross={GamePieceCross} GamePieceDot={GamePieceDot} />}
            {gameMode === 'multiplayer' && < Multiplayer board={board} setBoard={setBoard} GamePieceCross={GamePieceCross} GamePieceDot={GamePieceDot} />}
        </div>
    )
}

export default GameBoard