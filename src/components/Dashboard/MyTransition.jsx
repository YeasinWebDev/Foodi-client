import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Auth/ContextProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { format } from 'date-fns';

function MyTransition() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/myTransition`, { params: { email: user?.email } });
      setData(res.data);
    };
    fetchData();
  }, [user.email]);

  const handleDetailsClick = (item) => {
    setSelectedItem(item);
    document.getElementById('my_modal_1').showModal();
  };

  return (
    <div>
      <h1 className="flex items-center justify-center font-semibold pt-16 text-2xl pb-10">My Transition</h1>

      <div className="overflow-x-auto w-full 2xl:w-[80%] mx-auto p-10 rounded-xl shadow-xl">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Payment Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody className="font-semibold">
            {data?.length > 0 &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
                  <td>{format(new Date(item.paymentData), 'MMMM do')}</td>
                  <td className="text-red-600">${item.totalAmount}</td>
                  <td className="text-green-500">{item.paymentStatus}</td>
                  <td>
                    <button className="btn" onClick={() => handleDetailsClick(item)}>Details</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal for item details */}
      {selectedItem && (
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h2 className="font-semibold text-xl mb-4">Order Details</h2>
            {selectedItem.items.map((foodItem, index) => (
              <div key={index} className="flex items-center mb-4">
                <img src={foodItem.img} alt={foodItem.name} className="w-20 h-20 rounded-lg mr-4" />
                <div className='font-semibold'>
                  <p className="font-semibold">{foodItem.name}</p>
                  <p>Price: <span className='text-red-600'>${foodItem.price}</span></p>
                  <p>Quantity: <span className='text-green-600'>{foodItem.count}</span></p>
                </div>
              </div>
            ))}
            <div className="modal-action">
              <button className="btn" onClick={() => document.getElementById('my_modal_1').close()}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default MyTransition;
