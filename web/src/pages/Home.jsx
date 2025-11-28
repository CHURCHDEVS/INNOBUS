import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, Globe, Star, Download, Play, Apple, Chrome, MapPin, Clock, Bell, Zap, Navigation, Shield, Radio } from 'lucide-react';

function Home() {
    const [activeTab, setActiveTab] = useState(0);

    const features = [
        {
            id: 0,
            icon: <MapPin className="w-6 h-6 text-white" />,
            title: 'Rutas Cercanas',
            desc: 'Visualiza en tiempo real qué rutas pasan cerca de ti',
            detail: 'Usa tu ubicación GPS para mostrarte todas las rutas disponibles en un radio de 500 metros. Actualización cada 30 segundos.',
            color: 'bg-blue-500'
        },
        {
            id: 1,
            icon: <Zap className="w-6 h-6 text-white" />,
            title: 'Cálculo Inteligente',
            desc: 'Algoritmo que encuentra la ruta más rápida y económica',
            detail: 'Combina múltiples medios de transporte, considera tráfico en tiempo real y te sugiere la mejor opción según tus preferencias.',
            color: 'bg-indigo-500'
        },
        {
            id: 2,
            icon: <Clock className="w-6 h-6 text-white" />,
            title: 'Horarios Precisos',
            desc: 'Información actualizada de horarios y paradas',
            detail: 'Base de datos sincronizada con operadores de transporte. Recibe alertas si hay cambios en los horarios habituales.',
            color: 'bg-orange-500'
        },
        {
            id: 3,
            icon: <Bell className="w-6 h-6 text-white" />,
            title: 'Alertas Inteligentes',
            desc: 'Notificaciones personalizadas para tu viaje',
            detail: 'Te avisamos 5 minutos antes de que llegue tu bus, cuando debas bajarte, o si hay incidentes en tu ruta.',
            color: 'bg-rose-500'
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
            {/* Navigation */}
            <motion.nav
                className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-blue-200">
                            I
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">INNOBUS</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        <a href="#inicio" className="hover:text-gray-900 transition-colors">Inicio</a>
                        <a href="#caracteristicas" className="hover:text-gray-900 transition-colors">Características</a>
                        <Link to="/cities" className="hover:text-gray-900 transition-colors">Ciudades</Link>
                        <a href="#contacto" className="hover:text-gray-900 transition-colors">Contacto</a>
                    </div>

                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg shadow-gray-200"
                        >
                            <Play className="w-4 h-4 fill-current" />
                            Google Play
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg shadow-gray-200"
                        >
                            <Apple className="w-4 h-4 fill-current" />
                            App Store
                        </motion.button>
                        <Link to="/cities">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg shadow-gray-200"
                            >
                                <Chrome className="w-4 h-4" />
                                Web
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight text-gray-900 tracking-tight">
                                Tu guía de
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">transporte público</span>
                                <br />
                                en Colombia
                            </h1>

                            <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-lg">
                                Encuentra las mejores rutas, horarios y paradas del transporte público en las principales ciudades de Colombia.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Link to="/cities">
                                    <motion.button
                                        className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors w-full sm:w-auto shadow-xl shadow-blue-200"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Play className="w-5 h-5 fill-current" />
                                        Descargar para Android
                                    </motion.button>
                                </Link>

                                <motion.button
                                    className="px-8 py-4 rounded-2xl bg-white border-2 border-gray-100 text-gray-900 font-bold text-lg flex items-center justify-center gap-3 hover:border-gray-200 transition-colors w-full sm:w-auto shadow-lg shadow-gray-100"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Apple className="w-5 h-5 fill-current" />
                                    Descargar para iOS
                                </motion.button>
                            </div>

                            <p className="text-sm text-gray-400 flex items-center gap-2 font-medium">
                                <Globe className="w-4 h-4" />
                                También disponible como PWA (Progressive Web App)
                            </p>
                        </motion.div>

                        {/* Right Stats Card - iOS Style */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="p-8 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200 border border-slate-100">
                                <div className="space-y-8">
                                    <motion.div
                                        className="flex items-center gap-6 group cursor-pointer"
                                        whileHover={{ x: 10 }}
                                    >
                                        <motion.div
                                            className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            <Smartphone className="w-8 h-8 text-white" />
                                        </motion.div>
                                        <div>
                                            <div className="text-xl font-bold text-gray-900 mb-1">Aplicación Móvil</div>
                                            <div className="text-base text-gray-500">Android, iOS y Web</div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-center gap-6 group cursor-pointer"
                                        whileHover={{ x: 10 }}
                                    >
                                        <motion.div
                                            className="w-16 h-16 rounded-2xl bg-violet-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-200"
                                            whileHover={{ scale: 1.1, rotate: -5 }}
                                        >
                                            <Globe className="w-8 h-8 text-white" />
                                        </motion.div>
                                        <div>
                                            <div className="text-xl font-bold text-gray-900 mb-1">13 Ciudades</div>
                                            <div className="text-base text-gray-500">Expandiéndose por Colombia</div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-center gap-6 group cursor-pointer"
                                        whileHover={{ x: 10 }}
                                    >
                                        <motion.div
                                            className="w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-200"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            <Star className="w-8 h-8 text-white fill-current" />
                                        </motion.div>
                                        <div>
                                            <div className="text-xl font-bold text-gray-900 mb-1">Calificación</div>
                                            <div className="text-base text-gray-500">4.8 en App Store</div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-center gap-6 group cursor-pointer"
                                        whileHover={{ x: 10 }}
                                    >
                                        <motion.div
                                            className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-200"
                                            whileHover={{ scale: 1.1, rotate: -5 }}
                                        >
                                            <Download className="w-8 h-8 text-white" />
                                        </motion.div>
                                        <div>
                                            <div className="text-xl font-bold text-gray-900 mb-1">Descargas</div>
                                            <div className="text-base text-gray-500">50 mil+ usuarios activos</div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section - INNOVATED WITH TABS */}
            <section id="caracteristicas" className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            Funcionalidades Inteligentes
                        </h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            Explora las herramientas que hacen de INNOBUS la mejor opción para tu movilidad
                        </p>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {features.map((feature) => (
                            <motion.button
                                key={feature.id}
                                onClick={() => setActiveTab(feature.id)}
                                className={`px-6 py-4 rounded-2xl font-bold text-sm transition-all flex items-center gap-3 ${activeTab === feature.id
                                        ? 'bg-gray-900 text-white shadow-xl shadow-gray-200 scale-105'
                                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className={`p-1.5 rounded-lg ${activeTab === feature.id ? 'bg-white/20' : 'bg-gray-200'}`}>
                                    {React.cloneElement(feature.icon, { className: `w-4 h-4 ${activeTab === feature.id ? 'text-white' : 'text-gray-500'}` })}
                                </div>
                                {feature.title}
                            </motion.button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                            className="p-12 rounded-[2.5rem] bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-2xl shadow-slate-100"
                        >
                            <div className="max-w-3xl mx-auto text-center">
                                <motion.div
                                    className={`w-20 h-20 mx-auto rounded-3xl ${features[activeTab].color} flex items-center justify-center mb-8 shadow-xl`}
                                    initial={{ rotate: -10, scale: 0.8 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    transition={{ type: "spring", bounce: 0.5 }}
                                >
                                    {React.cloneElement(features[activeTab].icon, { className: "w-10 h-10 text-white" })}
                                </motion.div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                                    {features[activeTab].desc}
                                </h3>
                                <p className="text-xl text-gray-500 leading-relaxed">
                                    {features[activeTab].detail}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* CTA Section - INTEGRATED ORGANICALLY */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
                        <Globe className="w-4 h-4" />
                        COBERTURA NACIONAL
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-10 tracking-tight">
                        Operamos en 13 ciudades principales
                    </h2>
                    <Link to="/cities">
                        <motion.button
                            className="px-10 py-5 rounded-2xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors shadow-xl shadow-blue-200"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Explorar Ciudades
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center font-black text-white text-sm">
                            I
                        </div>
                        <span className="text-lg font-bold text-gray-900">INNOBUS</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        © 2025 INNOBUS. Movilidad inteligente para Colombia.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
