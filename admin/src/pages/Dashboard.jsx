import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', users: 4000, trips: 2400 },
    { name: 'Tue', users: 3000, trips: 1398 },
    { name: 'Wed', users: 2000, trips: 9800 },
    { name: 'Thu', users: 2780, trips: 3908 },
    { name: 'Fri', users: 1890, trips: 4800 },
    { name: 'Sat', users: 2390, trips: 3800 },
    { name: 'Sun', users: 3490, trips: 4300 },
];

function Dashboard() {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                    <p className="text-3xl font-bold">12,345</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-500 text-sm font-medium">Active Trips</h3>
                    <p className="text-3xl font-bold text-green-600">1,234</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-500 text-sm font-medium">Alerts Today</h3>
                    <p className="text-3xl font-bold text-red-600">45</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md h-96">
                <h3 className="text-lg font-bold mb-4">Weekly Activity</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="users" fill="#8884d8" />
                        <Bar dataKey="trips" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Dashboard;
