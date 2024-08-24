import React, { useContext, useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { AuthContext } from '../Auth/ContextProvider';
import UpdateModal from './UpdateModal ';

function Card({ id, img, price, star, name, des, email,items,category,num,setReload,reload,fav }) {
    const [favArray, setFavArray] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    const item = {
        _id: id,
        img: img,
        price: price,
        rating: star,
        name: name,
        des: des,
        num:num,
        email: user?.email
    };
    const updateItem = {
        img: img,
        price: price,
        rating: star,
        name: name,
        des: des,
        items: items, 
        email: user?.email,
        num:num,
        category:category,
        addedBy: user?.displayName,
        addedByEmail:user?.email
    };

    const handleFav = async () => {
        const isFavorite = favArray?.some(favItem => favItem.num === num);
        
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
            const res = await axiosSecure.get(`/fav`, {params:{email:user?.email}});
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

    const handleUpdateClick = () => {
        setCurrentItem(updateItem);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleUpdate = async (updatedItem) => {
        try {
            await axiosSecure.put(`/updateItem/${id}`, updatedItem);
            toast.success("Food updated successfully!");
            setReload(!reload)
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Failed to update the item.");
        }
    };

    const handelDelete = async () => {
        try {
            await axiosSecure.delete(`/deletefood/${id}`);
            toast.success("Food deleted successfully!");
            setReload(!reload)
        } catch (error) {
            toast.error("Failed to delete the item.");
        }
    }

    return (
        <div>
            <div className='bg-[#f2f2f2] w-fit px-10 py-5 rounded-2xl shadow-lg'>
                {
                    fav === 'no'? <></> : <div onClick={handleFav} className='relative cursor-pointer'>
                    {favArray?.some(favItem => favItem.num === num) ?
                        <FaHeart className='absolute -right-9 -top-4 p-2 bg-orange-600 rounded-tr-2xl rounded-bl-2xl' color='#fff' size={35} />
                        :
                        <FaRegHeart className='absolute -right-9 -top-4 p-2 bg-orange-600 rounded-tr-2xl rounded-bl-2xl' color='#fff' size={35} />
                    }
                </div>
                }
                <Link to={`/itemDetails/${id}`}>
                    <div>
                        <img
                            className='w-48 h-48 md:w-60 md:h-60 rounded-xl pt-4 object-cover'
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
                {
                    user?.email === email && <div className='flex justify-between items-center pt-3'>
                        <button onClick={() => handleUpdateClick()} className='bg-orange-600 px-3 py-2 rounded-lg text-white cursor-pointer'>Update</button>
                        <button onClick={() => handelDelete()} className='bg-orange-600 px-3 py-2 rounded-lg text-white cursor-pointer'>Delete</button>
                    </div>
                }
            </div>
            <UpdateModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                itemData={currentItem}
                onUpdate={handleUpdate}
            />
        </div>
    );
}

export default Card;
