import Image from 'next/image'
import React from 'react'

function Avatar() {
    return (
        <Image className='rounded-full' height={30} width={30} alt='Avatar' src="/images/placeholder.jpg"/>
    )
}

export default Avatar