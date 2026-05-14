'use client'
import { ArrowLeft, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { motion } from 'motion/react'
import axios from 'axios'

const categories = ["fruits & Vegitables", "Rice, Atta & Grains", "Snacks & Biscuits", "Dairy & Eggs", "Beverages & Drinks", "Personal Care", "Household Essentials", "Instant & Packed Foods", "Baby & Pet Care", "Spices & Masalas"]

const units = ["kg", "g", "liter", "ml", "piece", "packet"]

const AddGrocery = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [preview, setPreview] = useState<string | null>(null)
    const [category, setCategory] = useState("")
    const [unit, setUnit] = useState("")
    const [backendImage, setBackendImage] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length == 0) {
            return
        }
        const file = files[0]
        setBackendImage(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!name || !price || !category || !unit || !backendImage) {
            alert("Please fill all fields and upload an image")
            return
        }

        setLoading(true)
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("unit", unit);
            formData.append("image", backendImage);

            console.log("Adding grocery:", { name, price, category, unit }); // Log data being sent

            const result = await axios.post('/api/admin/add-grocery', formData);
            
            console.log("Success result:", result.data); // Log result

            if (result.status === 201 || result.status === 200) {
                alert("Grocery added successfully!")
                // Reset form
                setName("")
                setPrice("")
                setCategory("")
                setUnit("")
                setBackendImage(null)
                setPreview(null)
            }

        } catch (error: any) {
            console.error(error)
            alert(error.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white py-16 px-4 relative'>
            <Link href={"/"} className='absolute top-6 left-6 flex items-center gap-2 text-green-700 font-semibold bg-white px-4 py-2 rounded-full shadow-md hover:bg-green-100 hover:shadow-lg transition-all'>
                <ArrowLeft className='w-5 h-5' /> <span className='hidden md:flex'>Back to home</span>
            </Link>

            <motion.div
                initial={{
                    y: 20,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    duration: 0.5
                }}
                className='bg-white w-full max-w-2xl shadow-2xl rounded-3xl border border-green-100 p-8'
            >
                <div className='flex flex-col items-center mb-8 '>
                    <div className='flex items-center gap-2'>
                        <PlusCircle className='w-8 h-8 text-green-600' />
                        <h1 className='text-2xl font-bold text-green-600'>Add Groceries</h1>
                    </div>
                    <p className='text-gray-500 text-sm mt-2'>Fill in the details to add new grocery items</p>
                </div>

                <form className='flex flex-col gap-6 w-full animate-fade-in' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>Grocery Name <span className='text-red-500'>*</span></label>
                        <input type='text' id='name' className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' placeholder='e.g., Apple' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-1'>Category <span className='text-red-500'>*</span></label>
                            <select id='category' className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="" disabled>Select Category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor='unit' className='block text-sm font-medium text-gray-700 mb-1'>Unit <span className='text-red-500'>*</span></label>
                            <select id='unit' className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' value={unit} onChange={(e) => setUnit(e.target.value)}>
                                <option value="" disabled>Select Unit</option>
                                {units.map((unit) => (
                                    <option key={unit} value={unit}>{unit}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor='price' className='block text-sm font-medium text-gray-700 mb-1'>Price <span className='text-red-500'>*</span></label>
                        <input type='number' id='price' className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' placeholder='e.g., 100' value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div>
                            <label htmlFor='image' className='block text-sm font-medium text-gray-700 mb-1'>Upload Image <span className='text-red-500'>*</span></label>
                            <input type='file' accept='image/*' id='image' className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer' onChange={handleImageChange} />
                        </div>

                        {preview && (
                            <div className='relative w-32 h-32 rounded-xl overflow-hidden border-2 border-green-200 shadow-sm'>
                                <img src={preview} alt="Preview" className='w-full h-full object-cover' />
                                <button type='button' onClick={() => { setPreview(null); setBackendImage(null) }} className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    <button 
                        type='submit' 
                        disabled={loading}
                        className='w-full bg-green-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg shadow-green-200 hover:shadow-green-300 transition-all transform active:scale-[0.98] mt-2 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed'
                    >
                        {loading ? "Adding..." : "Add Grocery"}
                    </button>
                </form>

            </motion.div>
        </div>
    )
}

export default AddGrocery