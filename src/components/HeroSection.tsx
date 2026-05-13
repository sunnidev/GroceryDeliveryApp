'use client'
import { Leaf, ShoppingBasket, Smartphone, Truck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const HeroSection = () => {


    const slides = [
        {
            id: 1,
            icon: <Leaf className='w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg' />,
            title: 'Fresh organic Groceries',
            subtitle: "Farm-fresh fruits,vegitables, and daily essentials delivered to you.",
            btnText: "Shop Now",
            bg: "https://images.unsplash.com/photo-1767364084218-a18f3ea7e93f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fEZyZXNoJTIwb3JnYW5pYyUyMEdyb2Nlcmllc3xlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            id: 2,
            icon: <Truck className='w-20 h-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg' />,
            title: "Fast and reliable Delivery",
            subtitle: "Get your groceries delivered to your doorstep in record time.",
            btnText: "Order Now",
            bg: "https://images.unsplash.com/photo-1607130232670-52123ba5be5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEZhc3QlMjBhbmQlMjByZWxpYWJsZSUyMERlbGl2ZXJ5fGVufDB8fDB8fHww"
        },
        {
            id: 3,
            icon: <Smartphone className='w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg' />,
            title: "Shop Anytime Anywhere",
            subtitle: "Browse and order from your favourite stores with ease.",
            btnText: "Get Started",
            bg: "https://images.unsplash.com/photo-1775385922660-fc52c2d23c8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fEZyZXNoJTIwb3JnYW5pYyUyMEdyb2Nlcmllc3xlbnwwfHwwfHx8MA%3D%3D"
        }
    ]

    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 4000)
        return () => clearInterval(timer);
    }, [])

    return (
        <div className='relative w-[98%] mx-auto mt-32 h-[80vh] rounded-3xl overflow-hidden shadow-2xl'>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className='absolute inset-0'
                >
                    <Image src={slides[current].bg} alt={slides[current].title} fill priority className='object-cover' />
                    <div className='absolute inset-0 bg-black/50 backdrop-blur-[1px' />
                </motion.div>
            </AnimatePresence>

            <div className='absolute inset-0 flex items-center justify-center text-white text-center px-6'>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                    className='flex flex-col items-center gap-6 justify-center'
                >
                    <div className='bg-white/10 backdrop-blur-md p-6 rounded-full shadow-lg'>
                        {slides[current].icon}
                    </div>
                    <h1 className='text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-tight'>
                        {slides[current].title}
                    </h1>
                    <p className='text-lg md:text-xl sm:text-xl max-w-2xl text-gray-200'>
                        {slides[current].subtitle}
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className='mt-4 px-8 py-3 bg-white text-green-700 font-semibold rounded-full shadow-lg hover:bg-green-100 duration-300 gap-2 transition-all flex items-center '>
                        <ShoppingBasket className='w-5 h-5' /> {slides[current].btnText}
                    </motion.button>
                </motion.div>
            </div>

            <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3'>
                {slides.map((_, index) => (
                    <motion.div
                        key={index}
                        onClick={() => setCurrent(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className={`w-3 h-3 rounded-full transition-all ${index === current ? 'bg-white scale-125' : 'bg-white/50'}`}
                    />
                        
                ))}
            </div>
        </div>
    )
}

export default HeroSection