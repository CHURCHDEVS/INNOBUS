import React from 'react';

function RoutesAdmin() {
    // Mock data
    const routes = [
        { id: 'R1', name: 'Ruta 1', origin: 'Portal Norte', destination: 'Centro' },
        { id: 'R2', name: 'Ruta 2', origin: 'Calle 80', destination: 'Aeropuerto' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Routes Management</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Add New Route
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {routes.map((route) => (
                            <tr key={route.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{route.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{route.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{route.origin}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{route.destination}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RoutesAdmin;
