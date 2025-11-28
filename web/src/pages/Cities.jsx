import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, Mountain, Waves, TreePine, Leaf, MapPin, ChevronRight } from 'lucide-react';

const regions = [
    {
        id: 'caribe',
        name: 'Región Caribe',
        description: 'Playas, historia y carnaval',
        icon: <Sun className="w-8 h-8 text-white" />,
        color: 'bg-amber-400',
        shadow: 'shadow-amber-200',
        cities: ['Barranquilla', 'Cartagena', 'Santa Marta', 'Valledupar', 'Montería', 'Sincelejo']
    },
    {
        id: 'andina',
        name: 'Región Andina',
        description: 'Montañas, negocios y café',
        icon: <Mountain className="w-8 h-8 text-white" />,
        color: 'bg-emerald-500',
        shadow: 'shadow-emerald-200',
        cities: ['Bogotá', 'Medellín', 'Cali', 'Bucaramanga', 'Ibagué', 'Pasto', 'Tunja']
    },
    {
        id: 'pacifica',
        name: 'Región Pacífica',
        description: 'Biodiversidad y cultura',
        icon: <Waves className="w-8 h-8 text-white" />,
        color: 'bg-blue-500',
        shadow: 'shadow-blue-200',
        cities: ['Cali', 'Buenaventura']
    },
    {
        id: 'orinoquia',
        name: 'Orinoquía (Llanos)',
        description: 'Llanuras y atardeceres',
        icon: <TreePine className="w-8 h-8 text-white" />,
        color: 'bg-lime-500',
        shadow: 'shadow-lime-200',
        cities: ['Villavicencio', 'Yopal']
    },
    {
        id: 'amazonia',
        name: 'Amazonía',
        description: 'Selva y naturaleza pura',
        icon: <Leaf className="w-8 h-8 text-white" />,
        color: 'bg-green-600',
        shadow: 'shadow-green-200',
        cities: ['Leticia', 'Florencia']
    }
];

function Cities() {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const navigate = useNavigate();

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setTimeout(() => {
            navigate('/planner', { state: { city } });
        }, 600);
    };

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
            {/* Navigation */}
            <motion.nav
                className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => selectedRegion ? setSelectedRegion(null) : navigate('/')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
                    >
                        <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold">Volver</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-blue-200">
                            I
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">INNOBUS</span>
                    </div>

                    <div className="w-24"></div>
                </div>
            </motion.nav>

            {/* Main Content */}
            <div className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        {!selectedRegion ? (
                            /* Regions View */
                            <motion.div
                                key="regions"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
                                        PASO 1 DE 2
                                    </div>
                                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                                        Selecciona tu Región
                                    </h1>
                                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                                        Elige la región donde te encuentras para ver las ciudades disponibles
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {regions.map((region, i) => (
                                        <motion.button
                                            key={region.id}
                                            onClick={() => setSelectedRegion(region)}
                                            className="p-8 rounded-[2rem] bg-white hover:bg-gray-50 border border-gray-100 text-left transition-all shadow-xl shadow-gray-100 group relative overflow-hidden"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ y: -8, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className={`w-20 h-20 rounded-3xl ${region.color} flex items-center justify-center mb-6 shadow-lg ${region.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                                {region.icon}
                                            </div>

                                            <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">{region.name}</h3>
                                            <p className="text-base text-gray-500 mb-6">{region.description}</p>

                                            <div className="flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-gray-900 transition-colors">
                                                Ver ciudades <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            /* Cities View */
                            <motion.div
                                key="cities"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="text-center mb-16">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl ${selectedRegion.color} text-white mb-8 shadow-lg ${selectedRegion.shadow}`}
                                    >
                                        {React.cloneElement(selectedRegion.icon, { className: "w-5 h-5" })}
                                        <span className="font-bold text-lg">{selectedRegion.name}</span>
                                    </motion.div>

                                    <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                                        Elige tu Ciudad
                                    </h2>
                                    <p className="text-xl text-gray-500">
                                        Selecciona la ciudad para configurar tu transporte local
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                                    {selectedRegion.cities.map((city, i) => (
                                        <motion.button
                                            key={city}
                                            onClick={() => handleCitySelect(city)}
                                            className={`
                        p-6 rounded-2xl text-left transition-all border-2 relative overflow-hidden group
                        ${selectedCity === city
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200'
                                                    : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50'
                                                }
                      `}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex items-center gap-6 relative z-10">
                                                <div className={`
                          w-14 h-14 rounded-xl flex items-center justify-center transition-colors
                          ${selectedCity === city ? 'bg-white/20' : 'bg-gray-50 group-hover:bg-blue-50'}
                        `}>
                                                    <MapPin className={`w-7 h-7 ${selectedCity === city ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'}`} />
                                                </div>
                                                <div>
                                                    <span className={`text-xl font-bold block ${selectedCity === city ? 'text-white' : 'text-gray-900'}`}>
                                                        {city}
                                                    </span>
                                                    <span className={`text-sm ${selectedCity === city ? 'text-blue-100' : 'text-gray-400'}`}>
                                                        Configurar ubicación
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default Cities;
