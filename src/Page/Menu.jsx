import React, { useState, useEffect } from 'react';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import Card from '../components/Card';

function Menu() {
  const [activeTab, setActiveTab] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false); 
  const axiosCommon = useAxiosCommon();

  const categories = ['All', 'Salad', 'Pizza', 'Desserts', 'Drinks'];

  useEffect(() => {
    // Fetch data based on the active tab/category
    const fetchItems = async () => {
      setLoading(true); 
      try {
        const response = await axiosCommon(`/food-items?category=${activeTab}`);
        setItems(response.data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false); 
      }
    };

    fetchItems();
  }, [activeTab]);

  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <h1 className="font-semibold text-xl md:text-4xl pt-10">
          Dive into Delights Of Delectable
          <span className="text-orange-600 pl-2">Food</span>
        </h1>
        <p className="pt-3 text-center">
          Where Each Plate Weaves a Story of <br /> Culinary Mastery and Passionate Craftsmanship
        </p>
        <button className="md:mt-10 mt-2 bg-orange-700 text-white px-4 py-2 rounded-xl">Order Now</button>
      </div>

      {/* Tab Section */}
      <div className="flex justify-center space-x-4 mt-10">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 ${activeTab === category ? 'bg-orange-700 text-white' : 'bg-gray-200'} rounded-xl`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Items List */}
      {
        loading ? ( // Updated to use loading
          <div className="flex items-center justify-center w-full h-screen">
            <div className="spinner-border text-orange-700" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full md:w-[80%] mx-auto">
            {items?.map(item => (
                <Card id={item?._id} img={item?.img} name={item?.name} des={item?.des} star={item?.rating} price={item?.price}/>
            ))}
          </div>
        )
      }
    </div>
  );
}

export default Menu;
