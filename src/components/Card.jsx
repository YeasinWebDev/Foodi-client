import React, { useContext, useEffect, useState } from 'react';
import { FaRegHeart, FaHeart, FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { AuthContext } from '../Auth/ContextProvider';
import UpdateModal from './UpdateModal ';

function Card({ id, img, price, star, name, des, email = '', items, category, num, setReload, reload, fav }) {
    const [favArray, setFavArray] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
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
        num: num,
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
        num: num,
        category: category,
        addedBy: user?.displayName,
        addedByEmail: user?.email
    };

    const handleFav = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isFavorite = favArray?.some(favItem => favItem.num === num);

        try {
            if (isFavorite) {
                await axiosSecure.post('/changeFav', { item });
                toast.success("Removed from Favorites");
            } else {
                await axiosSecure.post('/changeFav', { item });
                toast.success("Added to Favorites");
            }
            setRefresh(!refresh);
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    const getFav = async () => {
        try {
            const res = await axiosSecure.get(`/fav`, { params: { email: user?.email } });
            setFavArray(res.data);
        } catch (error) {
            console.error("Error fetching favorite status:", error);
        }
    };

    useEffect(() => {
        if (user) {
            getFav();
        }
    }, [refresh, user]);

    const handleUpdateClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
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

    const handelDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await axiosSecure.delete(`/deletefood/${id}`);
                toast.success("Food deleted successfully!");
                setReload(!reload)
            } catch (error) {
                toast.error("Failed to delete the item.");
            }
        }
    }

    const renderStars = () => {
        return Array.from({ length: 5 }).map((_, index) => (
            <FaStar
                key={index}
                className={`w-4 h-4 ${index < Math.round(star) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <>
            <div
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Card Header with Image */}
                <div className="relative">
                    <Link to={`/itemDetails/${id}`}>
                        <div className="relative h-60 md:h-72 overflow-hidden">
                            <img
                                className={`w-full h-full object-cover overflow-hidden transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                                src={img}
                                alt={name}
                            />

                            {/* Category Badge */}
                            {category && (
                                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-bold">
                                    {category}
                                </span>
                            )}

                            {/* Favorite Button */}
                            {fav !== 'no' && (
                                <button
                                    onClick={handleFav}
                                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                                >
                                    {favArray?.some(favItem => favItem.num === num) ?
                                        <FaHeart className="text-red-500" size={20} />
                                        :
                                        <FaRegHeart className="text-gray-600 hover:text-red-500" size={20} />
                                    }
                                </button>
                            )}

                            {/* Price Badge */}
                            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg">
                                <span className="font-bold text-lg">${price}</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Card Content */}
                <div className="p-6">
                    <Link to={`/itemDetails/${id}`}>
                        <div className="mb-4">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="font-bold text-xl text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1">
                                    {name}
                                </h3>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                                {des}
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    {renderStars()}
                                    <span className="ml-2 text-gray-700 font-semibold">{star}</span>
                                </div>

                                <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                    {items || 'Customizable'}
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Action Buttons for Admin/Owner */}
                    {user?.email === email && (
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                            <button
                                onClick={handleUpdateClick}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <FaEdit className="w-4 h-4" />
                                Update
                            </button>
                            <button
                                onClick={handelDelete}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-red-200 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <FaTrash className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    )}

                    {/* View Details Button for non-owners */}
                    {user?.email !== email && (
                        <Link to={`/itemDetails/${id}`}>
                            <button className="w-full mt-4 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200 px-4 py-3 rounded-lg font-medium hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:border-orange-300 hover:text-orange-600 transition-all duration-300 group-hover:scale-[1.02]">
                                View Details
                            </button>
                        </Link>
                    )}
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-300 rounded-2xl transition-all duration-500 pointer-events-none" />
            </div>

            <UpdateModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                itemData={currentItem}
                onUpdate={handleUpdate}
            />
        </>
    );
}

export default Card;