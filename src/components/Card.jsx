import React, { useContext, useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { AuthContext } from '../Auth/ContextProvider';

function Card({ id, img, price, star, name, des }) {
    const [favArray, setFavArray] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const item = {
        _id: id,
        img: img,
        price: price,
        rating: star,
        name: name,
        des: des,
        email: user?.email
    };

    const handleFav = async () => {
        const isFavorite = favArray?.some(favItem => favItem === id);
        
        try {

            if (isFavorite) {
                await axiosSecure.post('/changeFav', { item });
                toast.success("Removed from Favorite List");
            } else {
                await axiosSecure.post('/changeFav', { item });
                toast.success("Added to Favorite List");
            }

            setRefresh(!refresh);
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    const getFav = async () => {
        try {
            const res = await axiosSecure.get(`/fav`);
            setFavArray(res.data);
        } catch (error) {
            console.error("Error fetching favorite status:", error);
        }
    };

    useEffect(() => {
        if (user) {
            getFav();
        }
    }, [refresh]);

    return (
        <div>
            <div className='bg-[#f2f2f2] w-fit px-10 py-5 rounded-2xl shadow-lg'>
                <div onClick={handleFav} className='relative cursor-pointer'>
                    {favArray?.some(favItem => favItem === id) ?
                        <FaHeart className='absolute -right-9 -top-4 p-2 bg-orange-600 rounded-tr-2xl rounded-bl-2xl' color='#fff' size={35} />
                        :
                        <FaRegHeart className='absolute -right-9 -top-4 p-2 bg-orange-600 rounded-tr-2xl rounded-bl-2xl' color='#fff' size={35} />
                    }
                </div>
                <Link to={`/itemDetails/${id}`}>
                    <div>
                        <img
                            className='w-40 h-40 md:w-60 md:h-60 rounded-xl pt-4 object-cover'
                            src={img}
                            alt="Product"
                        />
                        <div className='flex flex-col gap-2 pt-3'>
                            <h1 className='font-semibold text-xl'>{name}</h1>
                            <h1 className='font-semibold text-sm'>{des?.slice(0, 40)}</h1>
                            <div className='flex justify-between'>
                                <h1 className='font-semibold text-lg'><span className='text-red-600'>$</span> {price}</h1>
                                <h1 className='flex items-center gap-2 font-semibold'><img src="/assets/star.png" alt="" />{star}</h1>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Card;
