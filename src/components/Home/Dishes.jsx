import React, { useState, useEffect, useRef } from 'react'
import Card from '../Card'
import useAxiosCommon from '../../Hooks/useAxiosCommon'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Sparkles, ChefHat } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function Dishes() {
    const axiosCommon = useAxiosCommon()
    const [category, setCategory] = useState('')
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const containerRef = useRef(null)
    const cardsRef = useRef([])

    const categories = ['Pizza', 'Salad', 'Desserts', 'Drinks']

    useEffect(() => {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)]
        setCategory(randomCategory)
    }, [])

    useEffect(() => {
        if (category) {
            fetchData()
        }
    }, [category])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const res = await axiosCommon.post('/subCategory', { category })
            setData(res.data.slice(0, 6)) // Show up to 6 items
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory)
        setCurrentIndex(0)
    }

    const handleNext = () => {
        if (data.length > 4) {
            setCurrentIndex(prev => Math.min(prev + 1, data.length - 4))
        }
    }

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0))
    }

    useGSAP(() => {
        // Title animation
        gsap.fromTo('.section-title',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.dishes-section',
                    start: "top 80%",
                    once: true
                }
            }
        )

        gsap.fromTo('.section-subtitle',
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: '.dishes-section',
                    start: "top 80%",
                    once: true
                }
            }
        )

        // Category buttons animation
        gsap.fromTo('.category-btn',
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.category-selector',
                    start: "top 85%",
                    once: true
                }
            }
        )

        // Cards animation
        if (data.length > 0 && cardsRef.current) {
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.fromTo(card, {
                        opacity: 0,
                        y: 50,
                        scale: 0.9
                    }, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: index * 0.15,
                        ease: "back.out(1.4)",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            once: true
                        }
                    })
                }
            })
        }
    }, [data])

    return (
        <div className='dishes-section py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-white to-gray-50'>
            <div className='max-w-9xl mx-auto'>
                {/* Header Section */}
                <div className='text-center mb-12'>
                    <div className='inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full mb-6 section-subtitle'>
                        <Sparkles className='w-4 h-4' />
                        <span className='font-semibold'>Special Dishes</span>
                        <Sparkles className='w-4 h-4' />
                    </div>

                    <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl mb-6 section-title'>
                        Standout <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600'>Dishes</span>
                    </h1>

                    <p className='text-gray-600 max-w-2xl mx-auto text-lg mb-2'>
                        Chef's special recommendations from our exquisite menu
                    </p>
                    <div className='flex items-center justify-center gap-2 text-orange-600'>
                        <ChefHat className='w-5 h-5' />
                        <span className='text-sm font-medium'>Curated by Master Chefs</span>
                    </div>
                </div>

                {/* Category Selector */}
                <div className='category-selector flex flex-wrap items-center justify-center gap-3 mb-12'>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`category-btn px-6 py-3 rounded-full font-semibold transition-all duration-300 ${category === cat
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-200'
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:text-orange-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Current Category Display */}
                <div className='flex items-center justify-between mb-8'>
                    <div>
                        <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>
                            {category} <span className='text-orange-600'>Selection</span>
                        </h2>
                        <p className='text-gray-600 mt-2'>
                            Showing 4 of our finest {category.toLowerCase()} options
                        </p>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className='flex items-center justify-center py-20'>
                        <div className='text-center'>
                            <div className='w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4'></div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Dishes Grid */}
                        <div
                            ref={containerRef}
                            className='relative'
                        >
                            <div
                                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 transition-transform duration-500'
                                style={{
                                    transform: data.length > 4 ? `translateX(-${currentIndex * (100 / 4)}%)` : 'none'
                                }}
                            >
                                {data.length > 0 ? (
                                    data.slice(0, 4).map((item, index) => (
                                        <div
                                            key={item._id || index}
                                            ref={el => cardsRef.current[index] = el}
                                            className='flex-shrink-0'
                                        >
                                            <Card
                                                id={item._id}
                                                img={item.img}
                                                name={item.name}
                                                des={item.des}
                                                star={item.rating}
                                                price={item.price}
                                                category={category}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className='col-span-full text-center py-12'>
                                        <div className='inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-4'>
                                            <ChefHat className='w-10 h-10 text-orange-500' />
                                        </div>
                                        <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                                            Coming Soon!
                                        </h3>
                                        <p className='text-gray-600 max-w-md mx-auto'>
                                            We're preparing some amazing {category.toLowerCase()} options. Check back soon!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>


                    </>
                )}


            </div>
        </div>
    )
}

export default Dishes