import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center relative'>
      <h1 className='text-xl'>Tic-Tac-Toe</h1>

      <section className='relative'>
        <div className='w-[21rem] h-[21rem] relative bg-white rounded-md'>

          <div className='start-row'>
            <div className='w-28 h-28 bg-black absolute z-10 rounded-none rounded-tl-md flex flex-row justify-center items-center'>
              <span className='text-'>1</span>
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