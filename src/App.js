import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch("/quotes.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch quotes.json");
        return res.json();
      })
      .then((data) => setQuotes(data))
      .catch((err) => {
        console.error("Error loading quotes:", err);
        setQuotes([
          {
            text: "Failed to load quotes.",
            country: "",
            flag: ""
          }
        ]);
      });
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % quotes.length);
          setFade(true);
        }, 500);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [quotes]);

  if (quotes.length === 0) {
    return <div className="quote-box">Loading...</div>;
  }

  const currentQuote = quotes[currentIndex];

  return (
    <div className="container">
      <div className={`quote-box ${fade ? "fade-in" : "fade-out"}`}>
        <p className="quote-text">“{currentQuote.text}”</p>
        <div className="quote-meta">
          {currentQuote.flag && (
            <img src={currentQuote.flag} alt={currentQuote.country} />
          )}
          <span>{currentQuote.country}</span>
        </div>
      </div>
    </div>
  );
}

export default App;