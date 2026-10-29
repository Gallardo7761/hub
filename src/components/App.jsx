import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from "@/pages/Home.jsx";

const App = () => {
    return (
        <div className='kb-shell'>
            <Home />
            <kb-footer />
        </div>
    );
}

export default App;
