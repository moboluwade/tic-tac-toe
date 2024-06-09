import React from 'react'
import Link from 'next/link'
const Footer = () => {
    return (
        <div className='absolute bottom-0 px-8 pb-2 text-xs'>
            <span>
                by {' '}
                <Link href="">
                    <span className='opacity-60 hover:underline underline-offset-4'>
                         mob_codes
                    </span>
                </Link>
            </span>
        </div>
    )
}

export default Footer