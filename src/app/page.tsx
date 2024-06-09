import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-row h-screen w-full items-center relative">

      <main className="px-8 flex flex-col justify-center h-full w-full">
        <span className="text-6xl pb-12">Its Tic, its Tac, its Toe.</span>
        <span className="text-lg">Find out who is better at the game amongst your friends on the global leaderboard.</span>
        <span className="text-lg">Or slug it out with the computer if you&apos;re bored.</span>
      </main>

      {/* LeaderBoard and Auth */}
      <section className="h-full w-full flex flex-row justify-center items-center ">
        <nav className="border-2 border-white md:w-96 w-fit h-[28rem] px-4 rounded-lg flex flex-col justify-start items-center">
          <div className=" py-4 flex flex-col items-center h-full justify-around">
            {/* LeaderBoard */}
            <div className="flex flex-col items-center h-full">
              <h3 className="text-2xl pb-2">LeaderBoard</h3>
              <span>
                Leaderboard will be available after 15 registered players.
              </span>
            </div>

            {/* Requires authentication */}
            <div className="flex flex-col items-center gap-4 pb-4">
              <button className="bg-white text-black rounded-full w-full h-12 px-4 font-semibold tracking-wide">Play MultiPlayer</button>
              <button className="font-semibold tracking-wide">SinglePlayer</button>
            </div>
          </div>
        </nav>

      </section>

      {/* <Header />

      <h1>Tic-Tac-Toe</h1>
      <Link className="text-blue-600 underline" href="/tic-tac-toe">
        <button>
          Play Game
        </button>
      </Link> */}
    </div>
  );
}
