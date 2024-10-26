import React, { useState, useEffect } from 'react';
import './QuoteGenerator.css';

// Predefined quotes for each category
const quotesData = {
  motivation: [
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  ],
  love: [
    { content: "Love is not about possession. Love is about appreciation.", author: "Osho" },
    { content: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
  ],
  life: [
    { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { content: "Get busy living or get busy dying.", author: "Stephen King" },
  ],
  sad: [
    { content: "Tears come from the heart and not from the brain.", author: "Leonardo da Vinci" },
    { content: "It's sad when someone you know becomes someone you knew.", author: "Henry Rollins" },
  ],
};

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
  const fetchQuote = () => {
    const categoryQuotes = quotesData[category];
    const randomQuote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
    setQuote(randomQuote.content);
    setAuthor(randomQuote.author);
  };

  // Fetch a new quote when the category changes
  useEffect(() => {
    fetchQuote();
  }, [category]);

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
