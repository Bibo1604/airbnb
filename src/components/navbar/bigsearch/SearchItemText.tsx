import React, { ReactNode } from 'react'

function SearchItemText({ children }: { children: ReactNode }) {
    return (
        <p className='text-neutral-400'>{children}</p>
    )
}

export default SearchItemText