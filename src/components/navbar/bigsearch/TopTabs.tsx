import React from 'react'

const topTabItems = ["Stays", "Experiences", "Online Experiences"];

function TopTabs({ showBigSearch }: { showBigSearch: boolean }) {
    return (
        <div className={`flex items-center p-2 transition-all absolute left-1/2 -translate-x-1/2 space-x-8 text-base font-medium
            ${showBigSearch ? 'scale-100' : 'scale-0'}`}>
            {topTabItems.map((item) => (
                <div
                    key={item}
                    className={`cursor-pointer group border-b-2 border-transparent ${item !== 'Stays' ? 'hover:opacity-60' : ''}`}
                >
                    <p className='py-2'>{item}</p>
                    <div
                        className={`h-0.5 transition-all bg-black group-hover:max-w-full group-hover:opacity-60
                        ${item === 'Stays' ? 'max-w-full' : 'max-w-0'}`}
                    ></div>
                </div>
            ))}
        </div>
    )
}

export default TopTabs