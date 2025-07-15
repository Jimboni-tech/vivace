import React, { useState } from 'react';
import './App.css';
import { supabase } from './supabaseClient';

const App = () => {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const backgroundImage = "/vivace-background.png";

  const handleStartQuestClick = () => {
    setShowEmailInput(true);
    setMessage('');
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    if (email) {
      const { data, error } = await supabase
        .from('emails') // Your table name
        .insert([{ email: email }]);

      if (error) {
        // --- IMPORTANT: Log the error object here ---
        console.error('Supabase insert error:', error);
        setMessage('Oops! Something went wrong. Please try again.');
      } else {
        console.log('Email submitted:', email);
        setMessage(`Thanks for joining the quest, ${email}! We'll be in touch soon.`);
        setEmail('');
        setShowEmailInput(false);
      }
    } else {
      setMessage('Please enter your email address.');
    }
  };

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay for better text readability */}
      <div className="overlay"></div>

      {/* Content Container */}
      <div className="content-container">
        <h1 className="main-title">
          Turn Practicing Into a Game!
        </h1>
        <p className="subtitle">
          Get early access today!
        </p>

        {!showEmailInput ? (
          <button
            onClick={handleStartQuestClick}
            className="start-quest-button"
          >
            Start Quest
          </button>
        ) : (
          <form onSubmit={handleSubmitEmail} className="email-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
              required
            />
            <button
              type="submit"
              className="join-button"
            >
              Join Early Access
            </button>
          </form>
        )}

        {message && (
          <p className="message animate-fade-in-up">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;