'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Apple, Baby, Box, ChevronLeft, Coffee, Cookie, Egg, Flame, Heart, Home, Wheat } from 'lucide-react'
import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'

const CategorySlider = () => {

    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)

    const categories = [
        { id: 1, name: "fruits & Vegitables", icon: Apple, color: "bg-green-100" },
        { id: 2, name: "Rice, Atta & Grains", icon: Wheat, color: "bg-orange-100" },
        { id: 3, name: "Snacks & Biscuits", icon: Cookie, color: "bg-pink-100" },
        { id: 4, name: "Dairy & Eggs", icon: Egg, color: "bg-white" },
        { id: 5, name: "Beverages & Drinks", icon: Coffee, color: "bg-blue-100" },
        { id: 6, name: "Personal Care", icon: Heart, color: "bg-purple-100" },
        { id: 7, name: "Household Essentials", icon: Home, color: "bg-lime-100" },
        { id: 8, name: "Instant & Packed Foods", icon: Box, color: "bg-teal-100" },
        { id: 9, name: "Baby & Pet Care", icon: Baby, color: "bg-rose-100" },
        { id: 10, name: "Spices & Masalas", icon: Flame, color: 'bg-red-100' }]

    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const scrollAmount = direction === 'left' ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth <= scrollWidth - 5);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (!scrollRef.current) return;
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            if (scrollLeft + clientWidth >= scrollWidth - 5) {
                scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
            } else {
                scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
            }
        }, 4000)
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        scrollRef.current?.addEventListener('scroll', checkScroll);
        checkScroll(); // Initial check

        return () => {
            scrollRef.current?.removeEventListener('scroll', checkScroll);
        }
    }, [])

    return (
        <motion.div className='w-[90%] md:w-[80%] mx-auto mt-10 relative overflow-hidden'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.5 }}
        >
            <h2 className='text-2xl md:text-3xl  font-bold text-green-700 mb-6 text-center'>🛒 Shop by Category</h2>

            {showLeftArrow && (
                <button onClick={() => scroll('left')} className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-green-100 rounded-full w-10 h-10 flex items-center justify-center transition-all'>
                    <ChevronLeft className='w-6 h-6 text-green-700' />
                </button>
            )}

            <div className='flex gap-6 overflow-x-auto px-10 pb-4 scrollbar-hide scroll-smooth' ref={scrollRef}>
                {categories.map((category) => {
                    const Icon = category.icon
                    return (
                        <motion.div key={category.id} className={`flex flex-col items-center justify-center min-w-[150px] md:min-w-[180px] rounded-2xl ${category.color} cursor-pointer shadow-md hover:shadow-xl transition-all p-4`}>
                            <Icon className='w-10 h-10 text-green-700' />
                            <p className='text-center md:text-base text-sm font-semibold text-gray-700 mt-2'>{category.name}</p>
                        </motion.div>
                    )

                })}
            </div>
            {showRightArrow && (
                <button onClick={() => scroll('right')} className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-green-100 rounded-full w-10 h-10 flex items-center justify-center transition-all'>
                    <ChevronRight className='w-6 h-6 text-green-700' />
                </button>
            )}
        </motion.div>
    )
}

export default CategorySlider