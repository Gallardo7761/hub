import { Route, Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from "@/components/Header.jsx";
import Home from "@/pages/Home.jsx";
import Login from "@/pages/Login.jsx";
import Accounts from "@/pages/Accounts.jsx";
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import Register from '@/pages/Register.jsx';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/accounts" element={
                    <ProtectedRoute>
                        <Accounts />
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    );
}

export default App;
