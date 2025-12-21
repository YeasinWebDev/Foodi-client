import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const data = [
    {
        "itemName": "Spaghetti Carbonara",
        "dsc": "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper. This creamy and savory dish is a favorite among pasta lovers",
        "rating": 4.7,
        "customer": "Maria Rodriguez",
        "avatar": "MR"
    },
    {
        "itemName": "Margherita Pizza",
        "dsc": "A traditional Italian pizza with fresh tomatoes, mozzarella cheese, and basil. This iconic pizza is known for its simplicity and deliciousness",
        "rating": 4.9,
        "customer": "John Smith",
        "avatar": "JS"
    },
    {
        "itemName": "Chicken Tikka Masala",
        "dsc": "Chunks of roasted marinated chicken in a spiced curry sauce. This popular dish combines the flavors of Indian and British cuisine.",
        "rating": 4.8,
        "customer": "Sarah Chen",
        "avatar": "SC"
    },
    {
        "itemName": "Beef Wellington",
        "dsc": "An exquisite dish featuring beef tenderloin wrapped in puff pastry. Perfectly cooked and beautifully presented every time.",
        "rating": 5.0,
        "customer": "Robert Johnson",
        "avatar": "RJ"
    }
];

function Review() {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const swiperRef = useRef(null);

    useGSAP(() => {
        // Animate title
        gsap.from('.review-title', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.review-section',
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
            }
        });

        // Animate subtitle
        gsap.from('.review-subtitle', {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.review-section',
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
            }
        });

    }, []);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <FaStar
                key={index}
                className={`w-4 h-4 md:w-5 md:h-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    // Handle swiper initialization
    const handleSwiperInit = (swiper) => {
        swiperRef.current = swiper;
        
        // Add animation on slide change
        swiper.on('slideChange', () => {
            const activeSlide = document.querySelector('.swiper-slide-active .review-card');
            if (activeSlide) {
                gsap.fromTo(activeSlide,
                    { scale: 0.95, opacity: 0.8 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
                );
            }
        });
    };

    return (
        <div className="review-section py-12 md:py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-white to-orange-50 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8 md:mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 md:px-6 py-2 rounded-full mb-4 md:mb-6 review-subtitle">
                        <FaStar className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="font-semibold text-sm md:text-base">Customer Reviews</span>
                        <FaStar className="w-3 h-3 md:w-4 md:h-4" />
                    </div>
                    
                    <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-6 review-title px-4">
                        What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Customers Say</span>
                    </h1>
                    
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
                        Discover why thousands of food lovers trust us for their culinary experiences
                    </p>
                </div>

                {/* Swiper Section */}
                <div className="relative mt-6 md:mt-12">
                    <Swiper
                        onSwiper={handleSwiperInit}
                        spaceBetween={20}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }}
                        modules={[Autoplay, Navigation, EffectFade]}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        speed={800}
                        className="reviewSwiper"
                        onInit={(swiper) => {
                            // Initialize navigation after swiper is mounted
                            setTimeout(() => {
                                swiper.params.navigation.prevEl = navigationPrevRef.current;
                                swiper.params.navigation.nextEl = navigationNextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            });
                        }}
                        breakpoints={{
                            // when window width is >= 320px
                            320: {
                                spaceBetween: 16
                            },
                            // when window width is >= 640px
                            640: {
                                spaceBetween: 20
                            },
                            // when window width is >= 768px
                            768: {
                                spaceBetween: 24
                            },
                            // when window width is >= 1024px
                            1024: {
                                spaceBetween: 30
                            }
                        }}
                    >
                        {data.map((review, index) => (
                            <SwiperSlide key={index}>
                                <div className="review-card bg-white rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg md:shadow-xl overflow-hidden border border-orange-100 mx-2 md:mx-0">
                                    <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                                        {/* Quote Icon */}
                                        <div className="text-orange-400 mb-4 md:mb-6">
                                            <FaQuoteLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                                        </div>
                                        
                                        {/* Review Content */}
                                        <div className="mb-4 md:mb-8">
                                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-4 leading-tight">
                                                "{review.itemName}"
                                            </h3>
                                            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 line-clamp-3 md:line-clamp-none">
                                                {review.dsc}
                                            </p>
                                            
                                            {/* Rating */}
                                            <div className="flex items-center gap-2 mb-6 md:mb-8">
                                                <div className="flex items-center gap-1">
                                                    {renderStars(review.rating)}
                                                </div>
                                                <span className="ml-2 text-base sm:text-lg md:text-xl font-bold text-gray-800">
                                                    {review.rating}/5.0
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Customer Info */}
                                        <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6 border-t border-gray-100">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg md:text-xl">
                                                {review.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 truncate">
                                                    {review.customer}
                                                </h4>
                                                <p className="text-gray-500 text-xs sm:text-sm">
                                                    Regular Customer
                                                </p>
                                            </div>
                                            <div className="ml-auto">
                                                <FaQuoteRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-orange-200" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-full -translate-y-8 md:-translate-y-10 lg:-translate-y-16 translate-x-8 md:translate-x-10 lg:translate-x-16 -z-10 opacity-30" />
                                    <div className="absolute bottom-0 left-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-tr from-orange-100 to-yellow-100 rounded-full translate-y-6 md:translate-y-8 lg:translate-y-12 -translate-x-6 md:-translate-x-8 lg:-translate-x-12 -z-10 opacity-30" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8 lg:mt-12">
                        <button
                            ref={navigationPrevRef}
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border-2 border-orange-300 text-orange-600 hover:bg-orange-50 hover:shadow-lg transition-all duration-300 hover:-translate-x-1"
                            aria-label="Previous review"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </button>
                        
                        <button
                            ref={navigationNextRef}
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border-2 border-orange-300 text-orange-600 hover:bg-orange-50 hover:shadow-lg transition-all duration-300 hover:translate-x-1"
                            aria-label="Next review"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </button>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-8 md:mt-10 px-4">
                    <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
                        Join our community of satisfied customers
                    </p>
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg hover:shadow-xl md:hover:shadow-2xl hover:shadow-orange-200 hover:scale-105 active:scale-95 transition-all duration-300">
                        Write a Review
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Review;