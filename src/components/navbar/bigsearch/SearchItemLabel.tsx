import React, { ReactNode } from 'react'

function SearchItemLabel({ children }: { children: ReactNode }) {
    return (
        <p className='text-sm font-bold'>{children}</p>
    )
}

export default SearchItemLabel