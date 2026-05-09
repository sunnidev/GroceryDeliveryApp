'use client'
import { Cross, Hand, LogOut, Package, Search, ShoppingCartIcon, UserIcon, X } from 'lucide-react';
import mongoose from 'mongoose';
import { AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { signOut } from 'next-auth/react';

interface IUser {
    _id?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    mobile?: string;
    role: 'user' | 'deliveryBoy' | 'admin';
    image?: string
}

const Nav = ({ user }: { user: IUser }) => {

    const [open, setOpen] = useState(false)
    const [searchBarOpen, setSearchBarOpen] = useState(false)

    const profileDropDown = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileDropDown.current && !profileDropDown.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className='w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500 to-green-700 rounded-2xl shadow-lg shadow-back/30 flex justify-between items-center px-4 h-20 md:px-8 z-50'>
            <Link href="/" className='text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:scale-105 transition-transform'>
                Snapcart
            </Link>

            <form className='hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md '>
                <Search className='text-gray-500 w-5 h-5 mr-2' />
                <input type="text" placeholder='Search groceries...' className='w-full focus:outline-none text-gray-700' />
            </form>

            <div className='flex items-center gap-3 md:gap-6 relative'>

                <div className='bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition md:hidden' onClick={() => setSearchBarOpen(prev => !prev)}>
                    <Search className='text-green-600 w-6 h-6' />
                </div>
                <Link href={""} className='relative bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition'>
                    <ShoppingCartIcon className='w-6 h-6 text-green-600' />
                    <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow'>0</span>
                </Link>

                <div className='relative' ref={profileDropDown}>
                    <div className='bg-white rounded-full w-11 h-11 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform'
                        onClick={() => setOpen(prev => !prev)}>
                        {user.image ? <Image src={user.image} alt='User' fill className='object-cover rounded-full' /> : <UserIcon />}
                    </div>
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className='absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 z-999'
                            >
                                <div className='flex items-center gap-2 px-3 py-2 border-b border-gray-100'>
                                    <div className='w-10 h-10 relative rounded-full bg-green-100 flex items-center justify-center overflow-hidden'>
                                        {user.image ? <Image src={user.image} alt='User' fill className='object-cover rounded-full' /> : <UserIcon />}
                                    </div>
                                    <div>
                                        <div className='text-gray-800 font-semibold'>{user.name}</div>
                                        <div className='text-gray-500 text-xs capitalize'>{user.role}</div>
                                    </div>
                                </div>

                                <Link href={""} className='flex items-center gap-2 px-2 py-3 hover:bg-green-50 rounded-lg text-gray-700 font-medium' onClick={() => setOpen(false)} >
                                    <Package className='w-5 h-5 text-green-600' />
                                    My Orders
                                </Link>

                                <button
                                    onClick={() => {
                                        setOpen(false)
                                        signOut({ callbackUrl: '/login' })
                                    }}
                                    className='flex items-center gap-2 w-full text-left px-3 py-3 hover:bg-red-50 rounded-lg text-gray-700 font-medium'>
                                    <LogOut className='w-5 h-5 text-red-500' />
                                    Log Out
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {
                            searchBarOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    className="fixed top-24 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-2 w-[90%]  shadow-md z-50 flex items-center" >
                                    <Search className="text-gray-500 w-5 h-5 mr-2" />
                                    <form className='grow'>
                                        <input type="text" placeholder="Search groceries..." className="w-full outline-none text-gray-700" />
                                    </form>
                                    <button>
                                        <X className="text-gray-500 w-5 h-5" onClick={() => setSearchBarOpen(false)} />
                                    </button>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>

                </div>
            </div>
        </div>
    )
}

export default Nav
