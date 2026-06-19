import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from "@/pages/Home.jsx";
import Footer from '@/components/Footer';

const App = () => {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Home />
            <Footer />
        </div>
    );
}

export default App;
