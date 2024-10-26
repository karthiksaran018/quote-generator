// src/components/QuoteGenerator.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components/QuoteGenerator';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  // Motivational prompts for user interaction
  const prompts = [
    "Need a little inspiration?",
    "Here's something to motivate you:",
    "Let this quote guide your day!",
    "Feeling down? Here's a boost!",
  ];

  // Randomly select a motivational prompt
  const getRandomPrompt = () => prompts[Math.floor(Math.random() * prompts.length)];

  // Function to fetch a random quote
  const fetchQuote = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.error('Error fetching the quote:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Fetch a new quote when the component mounts
  useEffect(() => {
    fetchQuote();
  }, []);

  // Function to handle quote sharing on Twitter
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="quote-container">
      <div className="quote-box">
        <p className="motivational-text">{getRandomPrompt()}</p>
        {loading ? (
          <p className="quote-text">Loading...</p>
        ) : (
          <>
            <p className="quote-text">"{quote}"</p>
            <p className="quote-author">- {author}</p>
          </>
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
