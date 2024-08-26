import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';
useGSAP

function Hero() {

    useGSAP(() => {
        gsap.from('.hero-heading', { duration: 1.5, opacity: 0, y: -80, ease: 'power3.out' });
        gsap.from('.hero-text', { duration: 1.5, opacity: 0, y: -50, ease: 'power3.out', delay: 0.2 });
        gsap.from('.hero-button', { duration: 1.5, opacity: 0, y: -30, ease: 'power3.out', delay: 0.4 });
        gsap.from('.hero-image', { duration: 1.5, opacity: 0, x: 50, ease: 'power3.out', delay: 0.6 });
        gsap.from('.dish-card', { duration: 1.5, opacity: 0, y: 20, ease: 'power3.out', delay: 0.8, stagger: 0.2 });
    }, []);

    return (
        <div className='flex items-center justify-center gap-2 flex-col lg:flex-row  xl:w-[78%] mx-auto'>
            <div className='lg:pt-10'>
                <h1 className='hero-heading text-2xl lg:text-5xl md:text-4xl font-semibold pb-5 tracking-tighter'>Dive into Delights Of Delectable <span className='text-orange-700'>Food</span></h1>
                <p className='hero-text text-[#4A4A4A] text-sm lg:text-xl font-semibold lg:w-[70%]'>
                    Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship
                </p>
                <button className='hero-button md:mt-5 mt-2 bg-orange-700 text-white px-4 py-2 rounded-xl'>Order Now</button>
            </div>
            <div className=''>
                <img className='hero-image md:w-[50%] lg:w-[70%]' src="/assets/banner.png" alt="" />
                <div className='flex items-center justify-center gap-6'>
                    <div className='dish-card flex items-center justify-center gap-4 bg-[#f2f2f2] w-fit p-2 rounded-xl'>
                        <img className='w-[30%]' src="/assets/dish1.png" alt="" />
                        <div>
                            <h1 className='text-[16px] font-semibold whitespace-nowrap'>Spicy noodles</h1>
                            <div className='flex items-center gap-2 py-2'>
                                <img src="/assets/star.png" alt="" /><img src="/assets/star.png" alt="" /><img src="/assets/star.png" alt="" />
                            </div>
                            <h1 className='font-semibold'><span className='text-red-600'>$</span>18.00</h1>
                        </div>
                    </div>
                    <div className='dish-card flex items-center justify-center gap-4 bg-[#f2f2f2] w-fit p-2 rounded-xl'>
                        <img className='w-[30%]' src="/assets/dish2.png" alt="" />
                        <div>
                            <h1 className='text-[16px] font-semibold whitespace-nowrap'>Vegetarian salad</h1>
                            <div className='flex items-center gap-2 py-2'>
                                <img src="/assets/star.png" alt="" /><img src="/assets/star.png" alt="" /><img src="/assets/star.png" alt="" />
                            </div>
                            <h1 className='font-semibold'><span className='text-red-600'>$</span>18.00</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;
