import {CARDS} from "../common/constants.js";
import Card from "./Card.jsx";
import ThemeButton from "./ThemeButton.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {

  return (
    <>
        <div className={"container py-5"}>
            <h1 className={"text-center mb-5"}>
                <a href="https://miarma.net/">miarma.net</a> hub
            </h1>
            <div className={"row g-4"}>
                {CARDS.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>
        </div>

        <footer>
            <p>&copy; 2025 miarma.net</p>
        </footer>

        <ThemeButton />
    </>
  )
}

export default App
