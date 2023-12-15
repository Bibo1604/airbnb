import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function loading() {
    return (
        <div className='max-w-7xl mx-auto xl:px-20 md:px-10 sm:px-2 px-4'>
            <div className='mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8'>
                {[...Array(20)].map((_, i) => (
                    <Skeleton className='w-52 h-52 rounded-3xl' />
                ))}
            </div>
        </div>
    )
}

export default loading