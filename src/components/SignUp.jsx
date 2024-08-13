import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../Auth/ContextProvider';
import { FaGoogle } from "react-icons/fa6";
import { imageUpload } from '../api';

const SignUp = () => {
    const { createUser, user, logInByGoogle,updateUserProfile,setUser,saveUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [imageLink, setimageLink] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        pin: '',
        email: '',
        role: 'user', // default role
    });
    if (user) {
        return navigate('/')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, pin, email } = formData;

        if (!/^\d{6}$/.test(pin)) {
            setError('PIN must be a 6-digit number');
            return;
        }

        try {
            const result = await createUser(email, pin);
            const update = await updateUserProfile(name, imageLink)
            setUser(prevUser => ({
                ...prevUser,
                displayName: name,
                photoURL: imageLink,
            }));
            await saveUser({ email, name, pin })
            toast.success("Sign Up successfully!");
            navigate('/');

        } catch (error) {
            console.error('Error signing up:', error);
            toast.error('Error signing up. Please try again.');
        }
    };

    const googleSignIn = () => {
        logInByGoogle()
            .then(e => {
                navigate('/')
                toast.success('signUp succesfull')
                saveUser({ email: e.user?.email, name: e?.user?.displayName })
            })
            .catch(e => toast.error(e.message))
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          const img = await imageUpload(file);
          setimageLink(img);
        }
      };

    return (
        <div className="signup-container pt-5">
            <h2 className='flex items-center justify-center text-4xl font-bold'>Sign Up</h2>
            <div className='flex items-center flex-col pt-10'>
                <form onSubmit={handleSubmit} className='w-fit border-2 border-orange-200 p-10 rounded-xl'>
                    <div className='w-fit p-3 rounded-xl mb-2 border-black'>
                        <label className='font-semibold text-lg'>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='border-2 border-orange-200 ml-2 p-2 rounded-xl outline-none'
                        />
                    </div>
                    <div className='w-fit p-3 rounded-xl mb-2 border-black'>
                        <label className='font-semibold text-lg'>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='border-2 border-orange-200 ml-2 p-2 rounded-xl outline-none'
                        />
                    </div>
                    <div className='w-fit p-3 rounded-xl mb-2 border-black'>
                        <label className='font-semibold text-lg'>Password:</label>
                        <input
                            type="password"
                            name="pin"
                            value={formData.pin}
                            onChange={handleChange}
                            required
                            className='border-2 border-orange-200 ml-2 p-2 rounded-xl outline-none'
                        />
                    </div>
                    <div className='pl-2 pb-3'>
                        <label htmlFor="name" className='font-semibold text-lg'>Image:</label> <br />
                        <input
                            className=" border-2 p-2  rounded-xl border-orange-200 cursor-pointer mt-3"
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageUpload}
                            required
                        />
                    </div>

                    <button type="submit" className='btn bg-[#EA580C] hover:bg-orange-800 text-white px-4 py-2 font-semibold rounded-xl flex items-center justify-center w-full'>Sign Up</button>

                    <div onClick={googleSignIn} className="flex items-center justify-center flex-col mt-5 bg-orange-600 w-full rounded-xl btn hover:bg-orange-800">
                        <div className='flex items-center justify-center gap-5 cursor-pointer'>
                            <div className='py-3'>
                                <FaGoogle color='white' size={24} />
                            </div>
                        </div>
                    </div>
                    <h1 className='flex items-center justify-center pt-4 font-semibold'>Already Have an Account <Link to={'/signin'} className='text-[#EA580C] font-semibold pl-4'>SignIn</Link></h1>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
