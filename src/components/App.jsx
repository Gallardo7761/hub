import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from "@/pages/Home.jsx";

const App = () => {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Home />
            <miarma-footer />
        </div>
    );
}

export default App;
