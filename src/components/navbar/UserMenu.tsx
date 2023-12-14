import React, { useState } from 'react'
import { TbWorld } from "react-icons/tb";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from '../Avatar';

const menuItems = ["Sign up", "Log in", "Gift cards", "Airbnb your home", "Help Centre"];

function UserMenu() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const toggleMenu = () => {
        setUserMenuOpen((prev) => !prev);
    }

    return (
        <div className='flex items-center space-x-1'>
            <p className='p-3 cursor-pointer rounded-full hover:bg-neutral-100 items-center'>Airbnb your home</p>
            <div className='p-3 cursor-pointer rounded-full hover:bg-neutral-100 items-center'>
                <TbWorld className='w-5 h-5' />
            </div>
            <div className='relative'>
                <div
                    className={`p-1 flex items-center rounded-full border border-neutral-300 space-x-2 cursor-pointer ${userMenuOpen ? 'shadow-md' : ''} hover:shadow-md`}
                    onClick={toggleMenu}
                >
                    <AiOutlineMenu className='w-4 h-4 ml-2' />
                    <Avatar />
                </div>
                {userMenuOpen ? (
                    <div className='absolute py-2 rounded-xl top-14 right-0 shadow-lg border w-64 z-20 bg-white'>
                        {menuItems.map((item) => (
                            <div key={item}>
                                <p
                                    className={`p-3 px-5 hover:bg-neutral-100 cursor-pointer ${item !== "Sign up" ? 'font-normal' : ""}`}
                                    onClick={toggleMenu}
                                >
                                    {item}
                                </p>
                                {item === 'Log in' ? (
                                    <div className='border-b border-b-neutral-200 my-1.5'></div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default UserMenu