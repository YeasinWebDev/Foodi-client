import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxiosSecure from '../Hooks/useAxiosSecure'
import Card from '../components/Card'
import { AuthContext } from '../Auth/ContextProvider';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';

function Details() {
    const { id } = useParams();
    const {user,setrefress, refress} = useContext(AuthContext)
    const [item, setItem] = useState('');
    const [loading, setLoading] = useState(false);
    const [relatedData, setRelatedData] = useState([]);
    const [count, setCount] = useState(1);
    const axiosSecure = useAxiosSecure();

    const cart ={
        num:item.num,
        name: item.name,
        img: item.img,
        des: item.des,
        count: count,
        price: item.price,
        email: user?.email,
    }

    const details = async () => {
        setLoading(true);
        try {
            const response = await axiosSecure.get(`/food-item/${id}`);
            setItem(response.data.result);
            setRelatedData(response.data.categoryData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching item:', error);
        }
    };

    const filtertedCategory = relatedData.filter(item => item._id !== id);

    useEffect(() => {
        details();
        window.scrollTo(0, 0);
    }, [id]);

    // Add to Cart functionality
    const handelAddCart = async(id) => {
        if(user){
            const res = await axiosSecure.post('/cart' , cart)
            setCount(1)
            toast.success(`${item?.name} Added to Cart`)
            setrefress(!refress)
        }

    };

    const incrementCount = () => {
        setCount(prev => prev + 1);
    };

    const decrementCount = () => {
        setCount(prev => (prev > 1 ? prev - 1 : 1));
    };

    if (loading) {
        return <Loading/>
    }


    return (
        <>
            <div className='flex items-center flex-col md:flex-row justify-center gap-10 w-full xl:w-[60%] mx-auto'>
                <img className='w-40 h-40 md:w-80 md:h-80 rounded-xl object-cover' src={item?.img} alt="" />
                <div className='w-full md:w-[60%]'>
                    <div className='flex items-center justify-between'>
                        <h1 className='font-semibold text-2xl lg:text-4xl'>{item?.name}</h1>
                        <div className='flex items-center'>
                            <div className='flex-nowrap'>
                                <button onClick={decrementCount} className='bg-orange-500 px-3 py-2 rounded-l-xl text-white font-semibold'>-</button>
                                <span className='bg-white px-3 py-2 text-lg font-semibold border border-gray-300'>{count}</span>
                                <button onClick={incrementCount} className='bg-orange-500 px-3 py-2 rounded-r-xl text-white font-semibold'>+</button>
                            </div>
                            <button onClick={() => handelAddCart(item?._id)} className='bg-orange-500 px-3 py-2 ml-2 rounded-xl text-white font-semibold'>Add to Cart</button>
                        </div>
                    </div>
                    <p className='text-sm text-gray-500 py-3'>
                        {item?.des}
                    </p>
                    <h1 className='font-semibold text-lg'>Category: <span className='bg-orange-500 px-3 py-2 rounded-xl text-white text-sm'>{item?.category}</span></h1>

                    <div className='mt-4'>
                        <h1 className='font-semibold text-lg'>Ingredients:</h1>
                        <ul className='list-disc list-inside'>
                            {item?.items?.map((ingredient, index) => (
                                <li key={index} className='text-gray-700'>{ingredient}</li>
                            ))}
                        </ul>
                        <h1 className='pt-3 font-semibold'>Made By: <span className='text-orange-600'>{item?.addedBy}</span></h1>
                    </div>
                    <div className='flex items-center justify-start gap-10 mt-2'>
                        <h1 className='font-semibold'>
                            Price:
                            <span className='text-orange-700'> $ {item?.price}</span>
                        </h1>

                        <h1 className='font-semibold'>
                            Rating:
                            <span className='text-yellow-500'> {item?.rating} ★</span>
                        </h1>
                    </div>
                </div>
            </div>
            <div className='pt-20 w-full md:w-[80%] mx-auto'>
                <h1 className='font-semibold text-2xl'>
                    More Food Related <span className='text-orange-600'>{item?.category}</span>
                </h1>
                <div className='flex items-center justify-center gap-5 flex-wrap pt-5'>
                    {
                        filtertedCategory?.map(item => (
                            <Card key={item?._id} id={item?._id} img={item?.img} name={item?.name} des={item?.des} star={item?.rating} price={item?.price} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Details;
