import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from "@/pages/Home.jsx";
import Footer from '@/components/Footer';
import ParticleField from '@/components/ParticleField';
import UserBadge from '@/components/UserBadge';

const App = () => {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <ParticleField />
            <UserBadge />
            <Home />
            <Footer />
        </div>
    );
}

export default App;