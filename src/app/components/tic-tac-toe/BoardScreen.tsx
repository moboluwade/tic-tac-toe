'use client'
import { useEffect, useState } from "react";
import Multiplayer from "./gameMode/Multiplayer";
import Image from "next/image";
import Singleplayer from "./gameMode/Singleplayer";

interface Props {
    mode: string;
}

const BoardScreen: React.FC<Props> = ({ mode }) => {
    const [gameMode, setGameMode] = useState<null | string>(mode ?? '')
    const [board, setBoard] = useState<(null | 'X' | 'O')[][]>([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]);

    return (
        <div>
            {gameMode === 'singleplayer' && < Singleplayer board={board} setBoard={setBoard} />}
            {gameMode === 'multiplayer' && < Multiplayer board={board} setBoard={setBoard} />}
        </div>
    )
}

export default BoardScreen