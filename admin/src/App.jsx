import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RoutesAdmin from './pages/RoutesAdmin';

function App() {
    return (
        <Router>
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-800 text-white">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold">INNOBUS Admin</h1>
                    </div>
                    <nav className="mt-6">
                        <Link to="/" className="block py-2.5 px-4 hover:bg-gray-700">Dashboard</Link>
                        <Link to="/routes" className="block py-2.5 px-4 hover:bg-gray-700">Routes Management</Link>
                        <Link to="/users" className="block py-2.5 px-4 hover:bg-gray-700">Users</Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/routes" element={<RoutesAdmin />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
