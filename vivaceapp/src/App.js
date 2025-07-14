import React, { useState } from 'react';
import './App.css';
const App = () => {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const backgroundImage = "/vivace-background.png";

  const handleStartQuestClick = () => {
    setShowEmailInput(true);
    setMessage(''); 
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (email) {

      console.log('Email submitted:', email);
      setMessage(`Thanks for joining the quest, ${email}! We'll be in touch soon.`);
      setEmail(''); 
      setShowEmailInput(false); 
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
            {/* Inline SVG for Rocket icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
              <path d="M4.5 17.5V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1.5M10.5 16.5H13.5M12 21v-3.5M12 17v-4M12 13V9M12 9V5M12 5V1M7 13h10M4 17h16" />
            </svg>
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
