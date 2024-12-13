import React, { useState, useEffect } from 'react';
import quotesData from './quotes.json'; // Importing the JSON file
import './components/QuoteGenerator.css';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('motivation');

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
  // Fetch a random quote from the selected category
const fetchQuote = () => {
  const filteredQuotes = quotesData.quotes.filter(q => q.category === category);
  const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  if (randomQuote) {
    setQuote(randomQuote.content);
    setAuthor(randomQuote.author);
  } else {
    setQuote('No quotes available for this category.');
    setAuthor('');
  }
};


  // Fetch a new quote when the category changes
  useEffect(() => {
    fetchQuote();
  }, [category]);

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
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
