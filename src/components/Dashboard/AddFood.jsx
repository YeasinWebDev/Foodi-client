import React, { useContext, useEffect, useState } from 'react';
import { imageUpload } from '../../api';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Auth/ContextProvider';
import { useNavigate } from 'react-router-dom';

function AddFood() {
  const {user} = useContext(AuthContext)
  const navigator = useNavigate()
  const axiosSecure = useAxiosSecure();
  const [foodData, setFoodData] = useState({
    img: '',
    name: '',
    des: '',
    price: '',
    rating: '',
    items: '',
    category: 'Pizza',
  });

  const [imageFile, setImageFile] = useState(null);
  const [submitTriggered, setSubmitTriggered] = useState(false);

  const categories = ['Pizza', 'Salad', 'Dessert', 'Drinks'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prevData) => ({
      ...prevData,
      [name]: name === 'items' ? value.split(',').map(item => item.trim()) : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let imageUrl = foodData.img;
    if (imageFile) {
      try {
        imageUrl = await imageUpload(imageFile);
      } catch (error) {
        console.error('Image upload failed:', error);
        return;
      }
    }
  
    const updatedFoodData = {
      ...foodData,
      img: imageUrl,
    };
  
    try {
      const result = await axiosSecure.post('/food-items', {
        ...updatedFoodData,
        price: Number(updatedFoodData.price),
        rating: Number(updatedFoodData.rating),
        addedBy: user?.displayName,
        addedByEmail: user?.email,
      });
  
      if (result.status === 200) {
        toast.success('Food Item Added Successfully!');
        navigator('/dashboard/myfood')
        setImageFile(null);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">Add Food Item</h2>
      <form className="w-full md:w-[70%] mx-auto bg-white shadow-md p-10 rounded-xl" onSubmit={handleSubmit}>

        {/* Food Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Food Name"
          />
        </div>

        {/* Image Upload Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            name="des"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded resize-none"
            placeholder="Food Description"
          />
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Price"
            step="0.01"
          />
        </div>

        {/* Rating Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Rating</label>
          <input
            type="number"
            name="rating"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Rating"
            step="0.1"
            min="0"
            max="5"
          />
        </div>

        {/* Items Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Items (comma separated)</label>
          <input
            type="text"
            name="items"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Items (comma separated)"
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <select
            name="category"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {categories.map((category) => (
              <option key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-800"
        >
          Add Food
        </button>
      </form>
    </div>
  );
}

export default AddFood;
