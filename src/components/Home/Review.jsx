import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';

const data = [
    {
        "itemName": "Spaghetti Carbonara",
        "dsc": "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper. This creamy and savory dish is a favorite among pasta lovers",
        "rating": 4.7
    },
    {
        "itemName": "Margherita Pizza",
        "dsc": "A traditional Italian pizza with fresh tomatoes, mozzarella cheese, and basil. This iconic pizza is known for its simplicity and deliciousness",
        "rating": 4.9
    },
    {
        "itemName": "Chicken Tikka Masala",
        "dsc": "Chunks of roasted marinated chicken in a spiced curry sauce. This popular dish combines the flavors of Indian and British cuisine.",
        "rating": 4.8
    }
]

function Review() {
    return (
        <div className="container mx-auto px-4 pt-10">
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-10">Food Reviews <FaStar className="inline text-yellow-500" /></h1>
            <div className='flex flex-col md:flex-row items-center justify-center'>
                <img src="/assets/chef.png" alt="Chef" className="w-1/2 md:w-1/3 mb-6 md:mb-0" />
                <div className="w-full md:w-2/3">
                    <h1 className='font-semibold text-xl md:text-2xl lg:text-3xl xl:text-4xl flex items-center justify-center pb-3'>What Our Customers Say About Us</h1>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        navigation={true}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper"
                    >
                        {
                            data.map((review, index) => (
                                <SwiperSlide key={index}>
                                    <div className="bg-orange-100 text-black shadow-lg rounded-lg px-6 py-10 mx-5 flex flex-col items-center">
                                        <div className="flex items-center mb-2">
                                            {Array(Math.floor(review.rating)).fill().map((_, i) => (
                                                <FaStar key={i} className="text-yellow-500" />
                                            ))}
                                        </div>
                                        <h2 className="text-black text-2xl font-semibold mb-2">{review.itemName}</h2>
                                        <p className="text-gray-600 text-center">{review.dsc}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default Review;
