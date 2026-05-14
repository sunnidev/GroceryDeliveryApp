'use client'
import { Boxes, ClipboardCheck, Cross, Hand, LogOut, Menu, Package, Plus, PlusCircle, Search, ShoppingCartIcon, UserIcon, X } from 'lucide-react';
import mongoose from 'mongoose';
import { AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { signOut } from 'next-auth/react';
import { createPortal } from 'react-dom';

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
    const [menuOpen, setMenuOpen] = useState(false)

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

    const sideBar = menuOpen ? createPortal(
        <AnimatePresence>
            <motion.div
                initial={{
                    x: -100,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                }}
                exit={{
                    x: -100,
                    opacity: 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 14
                }}
                className='fixed top-0 left-0 h-full w-[75%] sm:w-[60%] bg-linear-to-b from-green-800/90 via-green-700/80 to-green-900/90 backdrop-blur-xl border-r border-green-400/20 shadow-[0_0_50px_-10px_rgba(0,255,100,0.3)] flex flex-col p-6 text-white z-999'
            >
                <div className='flex justify-between items-center mb-2'>
                    <h1 className='text-2xl font-extrabold tracking-wide text-white/90 '>Admin Panel</h1>
                    <button className='text-white/80 hover:text-red-400 text-2xl font-bold transition' onClick={() => setMenuOpen(false)}><X /></button>
                </div> 

                <div className='flex items-center gap-3 p-3 mt-3 rounded-xl bg-white/10 hover:bg-white/15 shadow-inner'>
                    <div className='relative w-12 h-12 rounded-full overflow-hidden border-2 border-green-400/60 shadow-lg shrink-0'>
                        {user.image ? <Image src={user.image} alt='User' fill className='object-cover rounded-full' /> : <UserIcon className='w-full h-full p-2' />} 
                        <div className='absolute right-0 bottom-0 h-4 w-4 rounded-full bg-green-400 border-2 border-white'></div>
                    </div>
                    <div>
                        <h2 className='text-lg font-semibold text-white leading-tight'>{user.name}</h2>
                        <p className='text-sm text-green-200 capitalize tracking-wide '>{user.role}</p>
                    </div>
                </div>


                <div className='mt-8 flex flex-col gap-2 grow'>
                    <Link href={""} className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors'>
                        <PlusCircle className='w-5 h-5 text-green-400' />
                        <span className='font-medium text-lg'>Add Grocery</span>
                    </Link>
                    <Link href={""} className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors'>
                        <Boxes className='w-5 h-5 text-green-400' />
                        <span className='font-medium text-lg'>View Grocery</span>
                    </Link>
                    <Link href={""} className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors'>
                        <ClipboardCheck className='w-5 h-5 text-green-400' />
                        <span className='font-medium text-lg'>Manage Orders</span>
                    </Link>
                </div>

                <div className='mt-auto border-t border-white/10 pt-4'>
                    <button 
                        onClick={async() => await signOut({ callbackUrl: '/' })}
                        className='flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-200 transition-colors'
                    >
                        <LogOut className='w-5 h-5' />
                        <span className='font-medium text-lg'>Log Out</span>
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>, document.body
    ) : null

    return (
        <div className='w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500 to-green-700 rounded-2xl shadow-lg shadow-back/30 flex justify-between items-center px-4 h-20 md:px-8 z-50'>
            <Link href="/" className='text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:scale-105 transition-transform'>
                Snapcart
            </Link>

            {user.role == 'user' && (
                <form className='hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md '>
                    <Search className='text-gray-500 w-5 h-5 mr-2' />
                    <input type="text" placeholder='Search groceries...' className='w-full focus:outline-none text-gray-700' />
                </form>
            )}

            <div className='flex items-center gap-3 md:gap-6 relative'>

                {user.role == 'user' && <>
                    <div className='bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition md:hidden' onClick={() => setSearchBarOpen(prev => !prev)}>
                        <Search className='text-green-600 w-6 h-6' />
                    </div>
                    <Link href={""} className='relative bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition'>
                        <ShoppingCartIcon className='w-6 h-6 text-green-600' />
                        <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow'>0</span>
                    </Link>
                </>
                }

                {user.role == 'admin' && <>
                    <div className='hidden md:flex items-center gap-4'>
                        <Link href={""} className='flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all'><PlusCircle className='w-5 h-5' /> Add Grocery</Link>
                        <Link href={""} className='flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all'><Boxes className='w-5 h-5' /> View Grocery</Link>
                        <Link href={""} className='flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all'><ClipboardCheck className='w-5 h-5' /> Manage Orders</Link>
                    </div>
                    <div className='md:hidden bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:scale-105 transition' onClick={() => setMenuOpen(prev => !prev)}>
                        <Menu className='text-green-600 w-6 h-6' />
                    </div>
                </>}

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
                                {user.role == 'user' &&
                                    <Link href={""} className='flex items-center gap-2 px-2 py-3 hover:bg-green-50 rounded-lg text-gray-700 font-medium' onClick={() => setOpen(false)} >
                                        <Package className='w-5 h-5 text-green-600' />
                                        My Orders
                                    </Link>}


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
            {sideBar}
        </div>
    )
}

export default Nav
