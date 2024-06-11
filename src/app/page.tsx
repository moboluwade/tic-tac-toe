import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import { signIn, auth, signOut } from "./auth";
import { ReactNode } from "react";
import Button from "./components/homepage/Button"
export default async function Home() {
  const session = await auth()



  return (
    <div className="flex flex-row h-screen w-full items-center relative">

      <main className="px-8 flex flex-col justify-center h-full w-full">
        <span className="text-6xl pb-12">Its Tic, its Tac, its Toe.</span>
        <span className="text-lg">Find out who is better at the game amongst your friends on the global leaderboard.</span>
        <span className="text-lg">Or slug it out with the computer if you&apos;re bored.</span>
      </main>

      {/* LeaderBoard and Auth */}
      <section className="h-full w-full flex flex-row justify-center items-center ">
        <nav className="bg-[#1e1e1e]  md:w-96 w-fit h-[28rem] px-4 rounded-lg flex flex-col justify-start items-center">
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
              {/* quick proof of authentication */}
              <div className="pb-4">

                {
                  !!session?.user ? (
                    <div className="flex flex-row gap-4 justify-center items-center">
                      <Image className="rounded-full w-8 h-8" src={session?.user?.image ?? ""} width={15} height={15} alt="profile" />
                      <div>{session.user?.name}</div>
                      <form action={
                        async () => {
                          "use server"
                          await signOut()
                          await console.log('logged out')
                        }
                      }>
                        <button type="submit">{"<-"}</button>
                      </form>
                    </div>
                  )
                    :
                    (
                      <form action={
                        async () => {
                          "use server"
                          await signIn("google")
                        }
                      }>
                        <button type="submit" className="bg-white text-black rounded-full w-full h-12 px-4 font-semibold tracking-wide">Sign in</button>
                      </form>
                    )
                }
              </div>
              <Button session={session}></Button>
              <Button type={"singleplayer"} session={session}></Button>
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
