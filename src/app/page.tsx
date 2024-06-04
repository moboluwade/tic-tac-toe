import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Header />

      <h1>Tc-Tac-Toe</h1>
      <Link className="text-blue-600 underline" href="/tic-tac-toe">
        <button>
          Play Game
        </button>
      </Link>
    </div>
  );
}
