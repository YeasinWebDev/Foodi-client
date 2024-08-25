import React, { useEffect, useState } from 'react'
import { LuSalad } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { MdPayment } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";
import useAxiosSecure from '../../Hooks/useAxiosSecure';


import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const mapdata = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#CA8A04', '#FACC15', '#F87171', '#60A5FA', '#16A34A'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};



function Statistics() {
    const [data, setdata] = useState(null)
    const axiosSecure = useAxiosSecure()

    const pieChartData = [
        { name: 'Total Foods', value: data?.totalFoods },
        { name: 'Total user', value: data?.totalUsers },
        { name: 'Total Cart', value: data?.totalCart },
        { name: 'Total Payemnt', value: data?.totalPayemnt },
        { name: 'Total revenue', value: data?.totalRevenue }
    ];

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosSecure.get('/DashbordStats')
            setdata(res.data)
        }
        fetchData()
    }, [])
    return (
        <>
            <h1 className='flex items-center justify-center text-2xl font-semibold pt-16 pb-10'>Statistics</h1>
            <div className='flex gap-3 items-center justify-center flex-wrap border-b-2 border-dashed pb-10'>
                {/* 1 */}
                <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-yellow-400'>
                    <span><LuSalad size={34} color='#fff' /></span>
                    <div className='flex flex-col items-center'>
                        <h1 className='font-semibold text-lg'>Total Foods</h1>
                        <h3 className='font-semibold text-xl'>{data?.totalFoods}</h3>
                    </div>
                </div>

                {/* 2 */}
                <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-blue-400'>
                    <span><BsPeople size={34} color='#fff' /></span>
                    <div className='flex flex-col items-center'>
                        <h1 className='font-semibold text-lg'>Total user</h1>
                        <h3 className='font-semibold text-xl'>{data?.totalUsers}</h3>
                    </div>
                </div>

                {/* 3 */}
                <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-red-400'>
                    <span><FiShoppingCart size={34} color='#fff' /></span>
                    <div className='flex flex-col items-center'>
                        <h1 className='font-semibold text-lg'>Total Cart</h1>
                        <h3 className='font-semibold text-xl'>{data?.totalCart}</h3>
                    </div>
                </div>

                {/* 4 */}
                <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-yellow-600'>
                    <span><MdPayment size={34} color='#fff' /></span>
                    <div className='flex flex-col items-center'>
                        <h1 className='font-semibold text-lg'>Total Payemnt</h1>
                        <h3 className='font-semibold text-xl'>{data?.totalPayemnt}</h3>
                    </div>
                </div>

                {/* 5 */}
                <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-green-600'>
                    <span><IoBarChartSharp size={34} color='#fff' /></span>
                    <div className='flex flex-col items-center'>
                        <h1 className='font-semibold text-lg'>Total revenue</h1>
                        <h3 className='font-semibold text-xl'>${data?.totalRevenue}</h3>
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', height: '400px' }}>
                <h1 className='flex items-center justify-center font-semibold text-2xl pt-5'>Pie Chart</h1>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default Statistics