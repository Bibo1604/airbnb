import React, { ReactEventHandler, ReactNode } from 'react'

function SearchItemWrapper({ children, active, className = '', onClick }: { children: ReactNode, active?: boolean, className?: string, onClick?: ReactEventHandler }) {
    return (
        <div
            className={`relative p-2 px-8 rounded-full border border-transparent cursor-pointer 
            ${active ? 'bg-white shadow-2xl border-neutral-200' : 'hover:bg-neutral-300'} ${className}`}
            onClick={onClick}
        >
            <div className='abosolute w-full h-full top-0 left-0'></div>
            {children}
        </div>
    )
}

export default SearchItemWrapper