import { ArrowLeft, Eye, EyeOff, Leaf, Loader2, Lock, LogIn, Mail, User } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import React, { useState } from 'react'
import GoogleImage from '@/src/assets/GoogleIcon.png'
import axios from 'axios'

type propType = {
    prevStep: (s: number) => void
}

const RegisterForm = ({ prevStep }: propType) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleRegister = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault();
        try {
            const result = await axios.post('/api/auth/register', { name, email, password })
            console.log(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative'>
            <div className='absolute top-6 left-6 flex items-center gap-1 text-green-700 hover:text-green-800 transition-colors cursor-pointer' onClick={() => prevStep(1)} >
                <ArrowLeft className='w-5 h-5' />
                <span className='font-medium'>Back</span>
            </div>

            <motion.h1 className='text-4xl font-extrabold text-green-700 mb-2'
                initial={{
                    opacity: 0,
                    y: -10
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.6
                }}
            >
                Create Account
            </motion.h1>
            <p className='text-gray-600 mb-8 flex items-center'>Join snapcart today <Leaf className='w-5 h-5 text-green-600' /></p>

            <motion.form
                onSubmit={handleRegister}
                initial={{
                    opacity: 0,
                    // y: 10
                }}
                animate={{
                    opacity: 1,
                    // y: 0
                }}
                transition={{
                    duration: 0.6,
                    delay: 0.5
                }}
                className='w-full flex flex-col gap-4 max-w-sm'
            >
                <div className='relative'>
                    <User className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' />
                    <input type="text" placeholder='Full Name' className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div className='relative'>
                    <Mail className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' />
                    <input type="email" placeholder='Email Address' className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className='relative'>
                    <Lock className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' />
                    <input type={showPassword ? "text" : "password"} placeholder='Password' className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {showPassword ? <EyeOff className='absolute right-3 top-3.5 w-5 h-5 text-gray-400 cursor-pointer' onClick={() => setShowPassword(false)} /> : <Eye className='absolute right-3 top-3.5 w-5 h-5 text-gray-400 cursor-pointer' onClick={() => setShowPassword(true)} />}

                </div>

                {
                    (() => {
                        const formValid = name !== '' && email !== '' && password !== ''
                        return <button disabled={!formValid || loading} className={`inline-flex items-center gap-2 w-full rounded-xl font-semibold justify-center transition-all shadow-md duration-200  py-3 ${formValid ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}>
                            {loading ? <Loader2 className='w-5 h-5 animate-spin' /> : "Register"}
                        </button>
                    })()
                }

                <div className='flex items-center gap-2 text-gray-400 text-sm mt-2'>
                    <span className='flex-1 h-px bg-gray-200'></span>
                    OR
                    <span className='flex-1 h-px bg-gray-200'></span>
                </div>

                <button className='w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200'>
                    <Image src={GoogleImage} alt="Google Logo" width={20} height={20} className='inline-block mr-2' />
                    Continue with Google
                </button>

            </motion.form>

            <p className='text-gray-600 mt-6 text-sm flex items-center gap-1'>
                already have an account? <LogIn className='w-4 h-4 inline-block mb-0.5 text-green-600' /> <span className='text-green-700 font-medium cursor-pointer hover:underline' onClick={() => prevStep(1)}>Sign in </span>
            </p> 

        </div>
    )
}

export default RegisterForm
