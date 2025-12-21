import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function Catagorie() {

    useGSAP(() => {
        gsap.from('.catagory-card', {
            scale: 0.8,
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.catagories-container',
                start: 'top 75%',
                toggleActions: 'play none none none',
                once: true
            }
        });

        gsap.from('.fav', {
            y: -30,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.fav-container',
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true
            }
        });

        gsap.from('.subtitle', {
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.fav-container',
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true
            }
        });
    }, []);

    return (
        <div className='pt-20 pb-16 px-4 md:px-8 lg:px-12'>
            <div className='fav-container max-w-9xl mx-auto'>
                {/* Header Section */}
                <div className='text-center mb-12'>
                    <div className='inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4 subtitle'>
                        <Star className='w-4 h-4 fill-orange-500' />
                        <span className='font-semibold text-sm'>Customer Favorites</span>
                        <Star className='w-4 h-4 fill-orange-500' />
                    </div>

                    <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl mb-4 fav'>
                        Popular <span className='text-orange-600'>Categories</span>
                    </h1>

                    <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
                        Discover our most loved dishes, handpicked by our community
                    </p>
                </div>

                {/* Categories Grid */}
                <div className='catagories-container mx-auto'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-5 xl:gap-8'>
                        {data.map((item, index) => (
                            <Link
                                to={`/category/${item?.name}`}
                                key={index}
                                className='catagory-card group relative'
                            >
                                <div className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-orange-100 overflow-hidden h-full'>
                                    {/* Image Container */}
                                    <div className='relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-orange-50 to-pink-50'>
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                                        />
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                                        {/* Popular Badge */}
                                        <div className='absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1'>
                                            <Star className='w-3 h-3 fill-white' />
                                            Popular
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className='p-6 h-40 relative'>
                                        <div className='flex items-center justify-between mb-3'>
                                            <h3 className='text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors'>
                                                {item.name}
                                            </h3>
                                            <ChevronRight className='w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300' />
                                        </div>

                                        <p className='text-gray-600 text-sm mb-4'>
                                            Explore our delicious {item.name.toLowerCase()} selection
                                        </p>

                                        <div className='flex items-center justify-between w-[82%] absolute bottom-3'>
                                            <span className='text-sm font-medium text-gray-500'>
                                                {item.count}+ Items
                                            </span>
                                            <span className='text-xs px-3 py-1 bg-orange-100 text-orange-600 rounded-full font-medium'>
                                                View All
                                            </span>
                                        </div>
                                    </div>

                                    {/* Hover Effect Border */}
                                    <div className='absolute inset-0 border-2 border-transparent group-hover:border-orange-400 rounded-2xl transition-all duration-500 pointer-events-none' />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* View All Button */}
                <div className='text-center mt-12'>
                    <Link
                        to="/menu"
                        className='inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-200 hover:scale-105 transition-all duration-300'
                    >
                        View Full Menu
                        <ChevronRight className='w-5 h-5' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

const data = [
    {
        img: '/assets/piza.jpg',
        name: "Pizza",
        count: 25
    },
    {
        img: '/assets/salad.jpg',
        name: "Salad",
        count: 18
    },
    {
        img: '/assets/dessert.jpg',
        name: "Desserts",
        count: 32
    },
    {
        img: '/assets/drinks.png',
        name: "Drinks",
        count: 45
    }
]

export default Catagorie;