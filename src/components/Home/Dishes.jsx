import React, { useState, useEffect, useRef } from 'react'
import Card from '../Card'
import useAxiosCommon from '../../Hooks/useAxiosCommon'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'


function Dishes() {
    const axiosCommon = useAxiosCommon()
    const [category, setCategory] = useState('')
    const [data, setData] = useState([])
    const cardsRef = useRef([]) 

    useEffect(() => {
        const categoryArray = ['Pizza', 'Salad', 'Desserts', 'Drinks']
        const randomCategory = categoryArray[Math.floor(Math.random() * categoryArray.length)]
        setCategory(randomCategory)
    }, [])

    useEffect(() => {
        if (category) {
            fetchData()
        }
    }, [category])

    const fetchData = async () => {
        try {
            const res = await axiosCommon.post('/subCategory', { category })
            setData(res.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useGSAP(() => {
        if (data.length > 0) {
            gsap.fromTo(cardsRef.current, {
                opacity: 0,
                scale: 0.8
            }, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            })
        }
    }, [data])

    return (
        <div className='lg:w-[90%] w-full mx-auto mt-20'>
            <h1 className='text-[#FF6868] font-semibold text-lg '>Special Dishes</h1>
            <h1 className='font-bold text-2xl md:text-4xl lg:text-5xl  py-5'>Standout Dishes <br /> From Our Menu</h1>
            <div className='flex items-center justify-start gap-5 overflow-auto 2xl:overflow-hidden'>
                {
                    data.length > 0 ?
                        data.slice(0, 4).map((item, index) => (
                            <div key={index} className="flex-shrink-0" ref={el => cardsRef.current[index] = el}>
                                <Card id={item._id} img={item.img} name={item.name} des={item.des} star={item.rating} price={item.price} />
                            </div>
                        ))
                        :
                        <h1 className='text-center text-xl'>No data found for this category.</h1>
                }
            </div>
        </div>
    )
}

export default Dishes

