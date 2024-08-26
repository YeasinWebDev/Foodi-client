import React, { useState, useEffect, useRef } from 'react';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import Card from '../components/Card';
import { TiDeleteOutline } from "react-icons/ti";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';


gsap.registerPlugin(ScrollTrigger);

function Menu() {
  const [activeTab, setActiveTab] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState('');
  const [reload, setReload] = useState(false);
  const axiosCommon = useAxiosCommon();

  const itemsRef = useRef([]);

  // for pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ['All', 'Salad', 'Pizza', 'Desserts', 'Drinks'];

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setSearchData('');
      try {
        const response = await axiosCommon(`/food-items?category=${activeTab}&page=${currentPage}&limit=6`);
        setItems(response.data.items);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false);
      }
    };

    fetchItems();
  }, [activeTab, currentPage, reload]);

  useGSAP(() => {
    if (items.length > 0) {
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              end: 'top 70%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    }
  }, [items]);

  // Handle search item
  const handleSearch = async () => {
    setSearchData(searchTerm);
    setCurrentPage(1);
    const result = await axiosCommon.post('/search-items', { value: searchTerm });
    setItems(result.data.items);
    setTotalPages(result.data.totalPages);
    setSearchTerm('');
  };

  const handleClear = () => {
    setSearchData('');
    setSearchTerm('');
    setCurrentPage(1);
    setActiveTab('All');
    setReload(!reload);
  };

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
        <button className="md:mt-10 mt-2 bg-orange-700 text-white px-4 py-2 rounded-xl outline-none">Order Now</button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mt-6 gap-5">
        <input
          type="text"
          className="px-4 py-2 border border-orange-300 rounded-xl w-[80%] md:w-[40%]"
          placeholder="Search food Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className='btn bg-orange-600 hover:bg-orange-800 text-white px-3 py-2 rounded-xl'>Search</button>
      </div>
      <div className='w-full flex items-center justify-center pt-3'>
        {
          searchData && <h2 className='bg-orange-600 text-white px-3 py-2 rounded-xl w-fit flex items-center justify-center gap-3 cursor-pointer'>{searchData} <span onClick={() => handleClear()}><TiDeleteOutline color='white' size={29}/></span></h2>

        }
      </div>

      {/* Tab Section */}
      <div className="flex justify-center flex-wrap gap-3 mt-10">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 ${activeTab === category ? 'bg-orange-700 text-white' : 'bg-gray-200'} rounded-xl`}
            onClick={() => {setActiveTab(category), setCurrentPage(1)}}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Items List */}
      {
        loading ? (
          <div className="flex items-center justify-center w-full h-screen">
            <div className="spinner-border text-orange-700" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full md:w-[80%] mx-auto">
            {items?.length > 0 ? (
              items.map((item, index) => (
                <div 
                  key={item?._id} 
                  className="flex-shrink-0" 
                  ref={el => itemsRef.current[index] = el} // Store reference to the item
                >
                  <Card id={item?._id} img={item?.img} name={item?.name} des={item?.des} star={item?.rating} price={item?.price} num={item?.num} />
                </div>
              ))
            ) : (
              <h1 className="text-orange-500 font-semibold">No items found</h1>
            )}
          </div>
        )
      }

      <div className="flex justify-center mt-10">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-xl mx-2"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-orange-700 text-white' : 'bg-gray-200'} rounded-xl mx-1`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-xl mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Menu;
