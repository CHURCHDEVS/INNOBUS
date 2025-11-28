import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cities from './pages/Cities';
import RoutePlanner from './pages/RoutePlanner';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cities" element={<Cities />} />
                <Route path="/planner" element={<RoutePlanner />} />
            </Routes>
        </Router>
    );
}

export default App;
