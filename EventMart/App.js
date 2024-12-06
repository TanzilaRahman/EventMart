import NavBar from './NavBar.js';
import CreateEvent from './CreateEvent.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const FindEvent = () => <div>Find Event Page</div>;
const Marketplace = () => <div>Marketplace Page</div>;

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/find-event" element={<FindEvent />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/marketplace" element={<Marketplace />} />
            </Routes>
        </Router>
    );
};

export default App;
