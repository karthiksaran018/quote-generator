import React, { useState, useEffect } from 'react';
import './QuoteGenerator.css';

// Fetch quotes from JSON file
const fetchQuotesFromFile = async () => {
  try {
    const response = await fetch('/quotes.json');
    const data = await response.json();
    return data.quotes;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
};

const QuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('motivation');
  const [allQuotes, setAllQuotes] = useState([]);

  // Motivational prompts for user interaction
  const prompts = [
    "Need a little inspiration?",
    "Here's something to motivate you:",
    "Let this quote guide your day!",
    "Feeling down? Here's a boost!",
  ];

  // Randomly select a motivational prompt
  const getRandomPrompt = () => prompts[Math.floor(Math.random() * prompts.length)];

  // Fetch a random quote from the selected category
  const fetchQuote = () => {
    const filteredQuotes = allQuotes.filter(q => q.category === category);
    const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    if (randomQuote) {
      setQuote(randomQuote.content);
      setAuthor(randomQuote.author);
      console.log('Selected Quote:', randomQuote); // Add this line for debugging
    }
  };
  

  // Load quotes from JSON file
  useEffect(() => {
    const loadQuotes = async () => {
      const quotes = await fetchQuotesFromFile();
      setAllQuotes(quotes);
      fetchQuote(); // Fetch the first quote when loaded
    };
    loadQuotes();
  }, []);

  // Fetch a new quote when the category changes
  useEffect(() => {
    fetchQuote();
  }, [category, allQuotes]);

  // Function to handle quote sharing on Twitter
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
    window.open(twitterUrl, '_blank');
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="quote-container">
      <div className="quote-box">
        <div className="category-container">
          <label htmlFor="category">Choose a category:</label>
          <select
            id="category"
            className="category-select"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="motivation">Motivation</option>
            <option value="love">Love</option>
            <option value="life">Life</option>
            <option value="sad">Sad</option>
          </select>
        </div>
        <p className="motivational-text">{getRandomPrompt()}</p>
        {quote ? (
          <>
            <p className="quote-text">"{quote}"</p>
            <p className="quote-author">- {author}</p>
          </>
        ) : (
          <p className="quote-text">Loading...</p>
        )}
        <div className="button-container">
          <button className="new-quote-btn" onClick={fetchQuote}>
            New Quote
          </button>
          <button className="tweet-quote-btn" onClick={shareOnTwitter}>
            Share on Twitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
