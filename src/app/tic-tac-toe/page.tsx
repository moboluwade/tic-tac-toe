import Image from 'next/image'
import React from 'react'
import TicTacToe from '../components/tic-tac-toe/TicTacToe';





const page = () => {

  return (
    <div className='flex flex-col items-center relative'>
      <h1 className='text-xl'>Tic-Tac-Toe</h1>

      <section className='relative'>
        <TicTacToe />
      </section>
      {/* <Image clasfsName='w-[30rem] h-fit absolute top-0' width={200} height={200} alt='hash' src="/black-hash.svg" /> */}

      {/* Player Scores Component */}
      {/* messaging/ chat-notification component */}
      {/* Tic-Tac-Toe Game */}
      {/* Quick Chat Reactions at the bottom */}
    </div>
  )
}

export default page