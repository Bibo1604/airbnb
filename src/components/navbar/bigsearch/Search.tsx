'use client';

import React, { useState } from 'react'
import SearchItemWrapper from './SearchItemWrapper'
import SearchItemLabel from './SearchItemLabel'
import SearchItemText from './SearchItemText'
import { BiSearch } from "react-icons/bi";
import SearchDestination from './SearchDestination';
import { useRouter } from 'next/navigation';

function Search() {
    const [bigSearchItem, setBigSearchItem] = useState("destination");
    const router = useRouter();

    const handleSelectItem = (item: string) => {
        setBigSearchItem(item);
    }

    function onSubmit() {

    }

    return (
        <div className='relative pb-3 pt-2 flex justify-center'>
            {/* <div className='absolute top-0 left-0 w-full h-full'></div> */}
            <div className='z-10'>
                <div className={`border border-neutral-300 rounded-full flex items-center bg-neutral-200`}>
                    {/* Destination input */}
                    <div className='relative'>
                        <SearchItemWrapper active={bigSearchItem === "destination"} onClick={() => handleSelectItem("destination")}>
                            <SearchItemLabel>Where</SearchItemLabel>
                            <input type='text' className='outline-none bg-transparent' placeholder='Search Destination' />
                        </SearchItemWrapper>
                        {bigSearchItem === "destination" ? <SearchDestination /> : null}
                    </div>

                    {/* Check in date input */}
                    <div className='relative'>
                        <SearchItemWrapper active={bigSearchItem === "checkin"} onClick={() => handleSelectItem("checkin")}>
                            <SearchItemLabel>Check In</SearchItemLabel>
                            <SearchItemText>Any Dates</SearchItemText>
                        </SearchItemWrapper>
                    </div>

                    {/* Check out date input */}
                    <div className='relative'>
                        <SearchItemWrapper active={bigSearchItem === "checkout"} onClick={() => handleSelectItem("checkout")}>
                            <SearchItemLabel>Check Out</SearchItemLabel>
                            <SearchItemText>Any Dates</SearchItemText>
                        </SearchItemWrapper>
                    </div>

                    {/* Who input */}
                    <div className='relative'>
                        <SearchItemWrapper active={bigSearchItem === "who"} className='pr-2' onClick={() => handleSelectItem("who")}>
                            <div className='flex items-center'>
                                <div className='pr-10'>
                                    <SearchItemLabel>Who</SearchItemLabel>
                                    <SearchItemText>Add guests</SearchItemText>
                                </div>

                                <div className='flex items-center bg-red-500 rounded-full text-white font-bold hover:bg-red-600'>
                                    <BiSearch className='w-11 h-11 p-3 rounded-full' />
                                    <p className='pr-8'>Search</p>
                                </div>
                            </div>
                        </SearchItemWrapper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search