import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Catagorie() {

    useGSAP(() => {
        gsap.from('.catagory-card', {
            scale: 0.2,
            opacity: 0,
            duration: 1,
            ease: 'power1.inOut',
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.catagory-card',
                start: 'top 80%',
                toggleActions: 'play none none reverse',            
            }
        });

        gsap.from('.fav', {
            y: -20,
            opacity: 0,
            duration: 1.2,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '.fav',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        })
    }, []);

    return (
        <div className='pt-20'>
            <h1 className='text-[#FF6868] font-semibold text-lg flex items-center justify-center'>Customer Favorites</h1>
            <h1 className='font-bold text-2xl md:text-4xl lg:text-5xl flex items-center justify-center py-5 fav'>Popular Categories</h1>

            <div className='flex items-center justify-center gap-5 flex-wrap pt-5'>
                {
                    data.map((item, index) => (
                        <Link to={`/catagorie/${item?.name}`} key={index} className='catagory-card flex flex-col items-center gap-5 shadow-md px-10 py-3 rounded-xl border-2 border-orange-100 cursor-pointer'>
                            <img src={item.img} alt={item.name} className='w-20 h-20' />
                            <p className='text-sm font-bold'>{item.name}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

const data = [
    {
        img: '/assets/piza.jpg',
        name: "Pizza"
    },
    {
        img: '/assets/salad.jpg',
        name: "Salad"
    },
    {
        img: '/assets/dessert.jpg',
        name: "Desserts"
    },
    {
        img: '/assets/drinks.png',
        name: "Drinks"
    }
]

export default Catagorie;
