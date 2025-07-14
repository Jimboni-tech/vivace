import React, { useState } from 'react';
import { Rocket } from 'lucide-react'; // Using lucide-react for icons

// Main App component
const Landing = () => {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Placeholder image URL for the background
  const backgroundImage = "/vivace-background.png";

  const handleStartQuestClick = () => {
    setShowEmailInput(true);
    setMessage(''); // Clear any previous messages
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (email) {
      // In a real application, you would send this email to your backend
      // For this example, we'll just display a success message.
      console.log('Email submitted:', email);
      setMessage(`Thanks for joining the quest, ${email}! We'll be in touch soon.`);
      setEmail(''); // Clear the email input
      setShowEmailInput(false); // Optionally hide the input after submission
    } else {
      setMessage('Please enter your email address.');
    }
  };

  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Overlay for better text readability */}
      <div className="overlay"></div>

      {/* Content Container */}
      <div className="content-container">
        <h1 className="main-title">
          Embark on Your Next Adventure!
        </h1>
        <p className="subtitle">
          Get early access to our groundbreaking iOS application.
        </p>

        {!showEmailInput ? (
          <button
            onClick={handleStartQuestClick}
            className="start-quest-button"
          >
            <Rocket className="icon" /> Start Quest
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
          <p className="message">
            {message}
          </p>
        )}
      </div>

      {/* Embedded CSS */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');

        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .app-container {
          position: relative;
          min-height: 100vh;
          background-size: cover;
          background-position: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem; /* p-4 */
          box-sizing: border-box; /* Ensure padding doesn't add to total width */
        }

        .overlay {
          position: absolute;
          inset: 0;
          background-color: black;
          opacity: 0.6;
        }

        .content-container {
          position: relative;
          z-index: 10;
          text-align: center;
          color: white;
          padding: 2rem; /* p-8 */
          border-radius: 0.75rem; /* rounded-xl */
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-2xl */
          backdrop-filter: blur(4px); /* backdrop-blur-sm */
          background-color: rgba(255, 255, 255, 0.1); /* bg-white/10 */
          max-width: 32rem; /* max-w-lg */
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }

        .main-title {
          font-size: 3rem; /* text-5xl */
          font-weight: 800; /* font-extrabold */
          margin-bottom: 1.5rem; /* mb-6 */
          text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* drop-shadow-lg */
          line-height: 1.25; /* leading-tight */
        }

        @media (min-width: 768px) { /* md:text-6xl */
          .main-title {
            font-size: 3.75rem;
          }
        }

        .subtitle {
          font-size: 1.25rem; /* text-xl */
          margin-bottom: 2rem; /* mb-8 */
          font-weight: 300; /* font-light */
        }

        @media (min-width: 768px) { /* md:text-2xl */
          .subtitle {
            font-size: 1.5rem;
          }
        }

        .start-quest-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2rem; /* px-8 py-4 */
          background-image: linear-gradient(to right, #8b5cf6, #4f46e5); /* from-purple-600 to-indigo-700 */
          color: white;
          font-size: 1.25rem; /* text-xl */
          font-weight: 600; /* font-semibold */
          border-radius: 9999px; /* rounded-full */
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
          transition: all 0.3s ease-in-out; /* transition-all duration-300 ease-in-out */
          transform: scale(1); /* initial transform for hover */
          border: none;
          cursor: pointer;
          outline: none;
        }

        .start-quest-button:hover {
          background-image: linear-gradient(to right, #7c3aed, #4338ca); /* hover:from-purple-700 hover:to-indigo-800 */
          transform: scale(1.05); /* hover:scale-105 */
        }

        .start-quest-button:focus {
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.75); /* focus:ring-4 focus:ring-purple-500 focus:ring-opacity-75 */
        }

        .icon {
          margin-right: 0.75rem; /* mr-3 */
          height: 1.75rem; /* h-7 */
          width: 1.75rem; /* w-7 */
        }

        .email-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem; /* gap-4 */
        }

        .email-input {
          width: 100%;
          padding: 1rem; /* p-4 */
          border-radius: 0.5rem; /* rounded-lg */
          background-color: rgba(255, 255, 255, 0.2); /* bg-white/20 */
          color: white;
          font-size: 1.125rem; /* text-lg */
          border: none;
          outline: none;
          transition: all 0.2s ease-in-out; /* transition-all duration-200 */
        }

        .email-input::placeholder {
          color: #d1d5db; /* placeholder-gray-300 */
        }

        .email-input:focus {
          box-shadow: 0 0 0 2px #a78bfa; /* focus:ring-2 focus:ring-purple-500 */
        }

        .join-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2rem; /* px-8 py-4 */
          background-image: linear-gradient(to right, #22c55e, #14b8a6); /* from-green-500 to-teal-600 */
          color: white;
          font-size: 1.25rem; /* text-xl */
          font-weight: 600; /* font-semibold */
          border-radius: 9999px; /* rounded-full */
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
          transition: all 0.3s ease-in-out; /* transition-all duration-300 ease-in-out */
          transform: scale(1); /* initial transform for hover */
          border: none;
          cursor: pointer;
          outline: none;
        }

        .join-button:hover {
          background-image: linear-gradient(to right, #16a34a, #0d9488); /* hover:from-green-600 hover:to-teal-700 */
          transform: scale(1.05); /* hover:scale-105 */
        }

        .join-button:focus {
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.75); /* focus:ring-4 focus:ring-green-500 focus:ring-opacity-75 */
        }

        .message {
          margin-top: 1.5rem; /* mt-6 */
          font-size: 1.125rem; /* text-lg */
          font-weight: 500; /* font-medium */
          color: #facc15; /* text-yellow-300 */
          animation: fade-in-up 0.5s ease-out forwards;
        }

        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
};

export default Landing;
