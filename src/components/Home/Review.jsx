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
      "dsc": "A classic Italian pasta with a creamy sauce made from eggs, cheese, pancetta, and pepper.",
      "rating": 4.7
    },
    {
      "itemName": "Margherita Pizza",
      "dsc": "A traditional pizza topped with fresh tomatoes, mozzarella cheese, and basil.",
      "rating": 4.9
    },
    {
      "itemName": "Chicken Tikka Masala",
      "dsc": "Roasted marinated chicken chunks in a spiced curry sauce.",
      "rating": 4.8
    }
  ]

function Review() {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-10">Food Reviews <FaStar className="inline text-yellow-500" /></h1>
            <div className="w-full">
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
                                <div className="bg-orange-100 text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center">
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
    );
}

export default Review;
