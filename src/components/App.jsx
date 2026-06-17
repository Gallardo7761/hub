import { Route, Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from "@/pages/Home.jsx";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const App = () => {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
