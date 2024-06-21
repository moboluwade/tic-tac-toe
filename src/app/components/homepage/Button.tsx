'use client'

import { Session } from "next-auth";
import { useRouter } from "next/navigation"


interface ButtonProps {
    type?: string | null;
    session: Session | null
}


const Button: React.FC<ButtonProps> = ({ type, session }) => {
    const router = useRouter()
    const handleClick = (link: string) => {
        !!session && router.push(link)
        !session && alert('you have to Sign in first')
    }

    if (type === "singleplayer") {
        return (
            <button
                className="font-semibold tracking-wide"
                onClick={() => { handleClick('/tic-tac-toe') }}
            >SinglePlayer</button>
        )
    }
    return (
        <button
            type="submit"
            className="bg-white text-black rounded-full w-full h-12 px-4 font-semibold tracking-wide"
            onClick={() => { handleClick('/tic-tac-toe/multiplayer') }}
        >Play MultiPlayer</button>
    )
}

export default Button