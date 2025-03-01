import { CARDS } from "../common/constants.js";
import Card from "./Card.jsx";
import ThemeButton from "./ThemeButton.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState, useEffect } from "react";

function App() {
  const [cardsWithScreenshots, setCardsWithScreenshots] = useState([]);

  useEffect(() => {
    const fetchScreenshots = async () => {
      const apiToken = "token-e72584563c819c172511e3a21a8e8408d862e711f615f922e830fa24bcf593c4"; // Tu token
      const baseApiUrl = "https://sitetoimage.com/api/screenshot";

      const updatedCards = await Promise.all(
        CARDS.map(async (card) => {
          try {
            const screenshotUrl = `${baseApiUrl}?url=${encodeURIComponent(card.link)}&width=1920&height=1080&fileType=jpeg&quality=85&fullPage=true&omitBackground=false&loadedAutoDetect=2&delayMs=2000&ttl=300&token=${apiToken}`;
            return { ...card, image: screenshotUrl };
          } catch (error) {
            console.error(`Error assigning screenshot for ${card.link}:`, error);
            return { ...card, image: "/images/placeholder.png" }; // Imagen de respaldo
          }
        })
      );
      setCardsWithScreenshots(updatedCards);
    };

    fetchScreenshots();
  }, []);

  return (
    <>
      <div className={"container py-5"}>
        <h1 className={"text-center mb-5"}>
          <a href="https://miarma.net/">miarma.net</a> hub
        </h1>
        <div className={"row g-4"}>
          {cardsWithScreenshots.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>

      <footer>
        <p>© 2025 miarma.net</p>
      </footer>

      <ThemeButton />
    </>
  );
}

export default App;