import React from 'react'

function Catagorie() {
    return (
        <div className='pt-20'>
            <h1 className='text-[#FF6868] font-semibold text-lg flex items-center justify-center'>Customer Favorites</h1>
            <h1 className='font-bold text-5xl flex items-center justify-center py-5'>Popular Catagories</h1>

            <div className='flex items-center justify-center gap-5 flex-wrap pt-5'>
                    {
                        data.map((item, index) => (
                            <div key={index} className='flex flex-col items-center gap-5 shadow-md px-10 py-3 rounded-xl border-2 border-orange-100 cursor-pointer'>
                                <img src={item.img} alt={item.name} className='w-20 h-20' />
                                <p className='text-sm font-bold'>{item.name}</p>
                            </div>
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
        name: "Dessert"
    },
    {
        img: '/assets/drinks.png',
        name: "Drinks"
    }
]
export default Catagorie