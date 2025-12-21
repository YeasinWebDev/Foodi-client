import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';

function Hero() {
    useGSAP(() => {
        gsap.from('.hero-content', {
            duration: 1.2,
            opacity: 0,
            y: 30,
            ease: 'power3.out'
        });
        gsap.from('.hero-image-container', {
            duration: 1.5,
            opacity: 0,
            x: 50,
            ease: 'power3.out',
            delay: 0.3
        });
        gsap.from('.dish-card', {
            duration: 1,
            opacity: 0,
            y: 30,
            ease: 'back.out(1.7)',
            delay: 0.6,
            stagger: 0.15
        });
        gsap.from('.feature-item', {
            duration: 1,
            opacity: 0,
            y: 20,
            ease: 'power3.out',
            delay: 0.9,
            stagger: 0.1
        });
    }, []);

    return (
        <div className="min-h-screen overflow-hidden relative">
            <div className="container mx-auto px-2 lg:px-4 relative py-5  md:py-8 lg:py-10 z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Left Content - Text and CTA */}
                    <div className="hero-content lg:w-1/2 lg:pr-8 xl:pr-16 flex flex-col items-start">
                        {/* Badge */}
                        <div className="md:inline-flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-md mb-8 border border-orange-100 hidden">
                            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-pulse"></div>
                            <span className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                <span className="text-2xl">🚚</span> Free delivery on first order
                            </span>
                            <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-0">
                            Savor the
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 block mt-2">
                                Finest Cuisine
                            </span>
                            Crafted with Passion
                        </h1>

                        {/* Description */}
                        <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
                            Where every dish is a masterpiece, blending traditional flavors with modern culinary innovation. Experience food that tells a story.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col md:flex-row gap-5 mb-12">
                            <button className="group relative bg-gradient-to-r from-orange-600 to-amber-600 text-white px-5 py-3 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-300/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden">
                                <span className="relative z-10">Order Now</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                            <button className="group border-2 border-gray-300 text-gray-800 px-5 py-3 rounded-2xl font-semibold text-lg hover:border-orange-500 hover:text-orange-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                Explore Menu
                            </button>
                        </div>
                    </div>

                    {/* Right Content - Visual Elements */}
                    <div className="lg:w-1/2 relative">
                        {/* Main Image Container */}
                        <div className="relative hero-image-container">
                            {/* Decorative Orbs */}
                            <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-2xl opacity-30 z-0"></div>
                            <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full blur-2xl opacity-20 z-0"></div>

                            {/* Main Food Image */}
                            <div className="relative z-10">
                                <div className="bg-gradient-to-br from-white via-orange-50 to-amber-50 p-4 rounded-3xl shadow-2xl">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-500/15 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
                                    <img
                                        src="/assets/banner.png"
                                        alt="Premium Gourmet Dish"
                                        className="w-full h-auto md:h-[30rem] lg:h-[40rem] object-contain rounded-2xl transform hover:scale-[1.02] transition-transform duration-700 shadow-inner"
                                    />
                                </div>
                            </div>

                            {/* Floating Dish Cards */}
                            <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 dish-card z-20">
                                <div className="bg-white p-2 md:p-5 rounded-2xl shadow-2xl max-w-[280px] border border-gray-100 hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-2 flex items-center justify-center">
                                                <img src="/assets/dish1.png" alt="Spicy Noodles" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                HOT
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-lg">Spicy Noodles</h3>
                                            <div className="flex items-center gap-1 my-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                ))}
                                                <span className="text-sm text-gray-500 ml-2 font-medium">4.8</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-2xl font-bold text-orange-600 ml-2">$18.00</span>
                                                </div>
                                                <button className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center hover:from-orange-600 hover:to-amber-600 hover:scale-110 transition-all duration-300 shadow-md">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -top-24 -right-4 lg:-top-6 lg:-right-6 dish-card z-20">
                                <div className="bg-white p-2 md:p-5 rounded-2xl shadow-2xl max-w-[280px] border border-gray-100 hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl p-2 flex items-center justify-center">
                                                <img src="/assets/dish2.png" alt="Vegetarian Salad" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                NEW
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-lg">Garden Salad</h3>
                                            <div className="flex items-center gap-1 my-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                ))}
                                                <span className="text-sm text-gray-500 ml-2 font-medium">4.9</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-2xl font-bold text-orange-600">$18.00</span>
                                                    <span className="text-xs text-gray-500 block">per serving</span>
                                                </div>
                                                <button className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center hover:from-orange-600 hover:to-amber-600 hover:scale-110 transition-all duration-300 shadow-md">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;