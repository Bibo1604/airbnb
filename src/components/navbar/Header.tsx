'use client';

import Image from 'next/image'
import React, { useState } from 'react'
import PlaceholderSearchBar from './PlaceholderSearchBar';
import UserMenu from './UserMenu';
import Search from './bigsearch/Search';
import TopTabs from './bigsearch/TopTabs';

function Header() {
    const [showBigSearch, setShowBigSearch] = useState(false);

    const handleShowBigSearch = () => {
        setShowBigSearch(false);
    }

    return (
        <div>
            <header className='border-b border-neutral-300 bg-white relative z-10'>
                <div className='py-4 px-10 flex items-center justify-between text-sm font-semibold'>
                    <Image src="/images/airbnb_logo.png" alt='Logo' width={100} height={100} className='h-8' />
                    <PlaceholderSearchBar showBigSearch={showBigSearch} setShowBigSearch={setShowBigSearch} />
                    <TopTabs showBigSearch={showBigSearch} />
                    <UserMenu />
                </div>
                {showBigSearch ? <Search setShowBigSearch={setShowBigSearch}/> : null}
            </header>

            {/* When user click outside, the search bar will be closed */}
            {showBigSearch ? (
                <div
                    className='bg-black fixed top-0 left-0 h-screen w-screen bg-opacity-30'
                    onClick={handleShowBigSearch}
                ></div>
            ) : null}
        </div>
    )
}

export default Header