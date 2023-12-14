import React, { Dispatch, SetStateAction } from 'react'
import { BiSearch } from "react-icons/bi";

const placeholderSearchBar = ["Anywhere", "Any Week", "Add guests"];

function PlaceholderSearchBar({ showBigSearch, setShowBigSearch } : {showBigSearch: boolean, setShowBigSearch: Dispatch<SetStateAction<boolean>>}) {
    const handleShowBigSearch = () => {
        setShowBigSearch(true);
    }

    return (
        <div
            className={`flex items-center rounded-full border shadow p-2 transition-all cursor-pointer absolute bg-white left-1/2 -translate-x-1/2 hover:shadow-md
            ${!showBigSearch ? 'scale-100' : 'scale-0'}`}
            onClick={handleShowBigSearch}
        >
            {placeholderSearchBar.map((item) => (
                <p key={item} className={`px-4 py-1 border-r ${item === "Add guests" ? "border-transparent" : "border-neutral-300"}`}>
                    {item}
                </p>
            ))}
            <BiSearch className='w-8 h-8 p-2 rounded-full text-white bg-red-500' />
        </div>
    )
}

export default PlaceholderSearchBar