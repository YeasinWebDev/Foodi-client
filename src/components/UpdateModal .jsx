import React, { useState, useEffect, useContext } from 'react';
import { imageUpload } from '../api';
import { AuthContext } from '../Auth/ContextProvider';

const UpdateModal = ({ isOpen, onClose, itemData, onUpdate }) => {
    const [formData, setFormData] = useState(itemData);
    const [imageFile, setImageFile] = useState(null);
    const { user } = useContext(AuthContext);
    const [imagePreview, setImagePreview] = useState(itemData.img || '');

    const categories = ['Pizza', 'Salad', 'Desserts', 'Drinks'];

    useEffect(() => {
        setFormData(itemData);
        setImagePreview(itemData.img || '');
    }, [itemData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'items' ? value.split(',').map(item => item.trim()) : value
        }));
    };

    const handleItemsChange = (e, index) => {
        const newItems = [...formData.items];
        newItems[index] = e.target.value;
        setFormData(prevData => ({ ...prevData, items: newItems }));
    };

    const addNewItem = () => {
        setFormData(prevData => ({ ...prevData, items: [...prevData.items, ""] }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const imageUrl = await imageUpload(file);
                setImagePreview(imageUrl);
            } catch (error) {
                console.error('Image upload failed:', error);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = { ...formData, img: imagePreview , addedBy: user?.displayName,addedByEmail:user?.email};
        onUpdate(updatedData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-screen overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Update Item</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>

                    {/* Image Upload Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Image Upload:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="border p-2 w-full"
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="mt-4 w-full h-48 object-cover rounded"
                            />
                        )}
                    </div>

                    {/* Description Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Description:</label>
                        <textarea
                            name="des"
                            value={formData.des || ''}
                            onChange={handleChange}
                            className="border p-2 w-full resize-none"
                        />
                    </div>

                    {/* Price Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            step="0.01"
                        />
                    </div>

                    {/* Rating Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Rating:</label>
                        <input
                            type="number"
                            name="rating"
                            value={formData.rating || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            step="0.1"
                            min="0"
                            max="5"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Category:</label>
                        <select
                            name="category"
                            value={formData.category || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Items Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Items:</label>
                        {formData.items && formData.items.map((item, index) => (
                            <input
                                key={index}
                                type="text"
                                value={item || ''}
                                onChange={(e) => handleItemsChange(e, index)}
                                className="border p-2 w-full mb-2"
                            />
                        ))}
                        <button
                            type="button"
                            onClick={addNewItem}
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                        >
                            Add Item
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-orange-600 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;
