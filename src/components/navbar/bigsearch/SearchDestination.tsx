import Image from 'next/image';
import React from 'react'

const searhDestinationOptions = [
    {
        image: "/images/world.jpg",
        text: "I'm flexible"
    },
    {
        image: "/images/world.jpg",
        text: "Europe"
    },
    {
        image: "/images/world.jpg",
        text: "Mexico"
    },
    {
        image: "/images/world.jpg",
        text: "United States"
    },
    {
        image: "/images/world.jpg",
        text: "Italy"
    },
    {
        image: "/images/world.jpg",
        text: "South America"
    },
];

function SearchDestination() {
    return (
        <div className='absolute top-20 left-0 text-sm bg-white p-8 shadow-2xl border rounded-3xl w-max'>
            <p className='font-bold mb-5'>Search by region</p>
            <div className='grid grid-cols-3 gap-5'>
                {searhDestinationOptions.map((item) => (
                    <div key={item.text}>
                        <Image
                            src={item.image}
                            alt=''
                            width={200}
                            height={200}
                            className='border h-32 w-32 rounded-xl cursor-pointer hover:border-neutral-400'
                        />
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchDestination