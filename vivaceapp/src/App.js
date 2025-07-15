import React, { useState } from 'react';
// Assuming App.css and supabaseClient are correctly set up in your project
import './App.css'; // Uncomment if you have App.css
import { supabase } from './supabaseClient'; // Uncomment if you have supabaseClient

const App = () => {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Placeholder for supabase client if not imported from supabaseClient.js
  // In a real application, ensure supabase is correctly initialized and imported.
  const supabase = {
    from: (tableName) => ({
      insert: async (data) => {
        console.log(`Simulating Supabase insert into '${tableName}' with data:`, data);
        // Simulate a successful insert after a short delay
        return new Promise(resolve => setTimeout(() => {
          if (data[0].email === 'error@example.com') { // Simulate an error for testing
            resolve({ data: null, error: { message: 'Simulated database error' } });
          } else {
            resolve({ data: data, error: null });
          }
        }, 500));
      }
    })
  };


  const backgroundImage = "/vivace-background.png"; // Placeholder image URL

  const handleStartQuestClick = () => {
    setShowEmailInput(true);
    setMessage('');
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    if (email) {
      // Attempt to insert email into Supabase (or your chosen database)
      const { data, error } = await supabase
        .from('emails') // Your table name where emails are stored
        .insert([{ email: email }]);

      if (error) {
        console.error('Supabase insert error:', error);
        setMessage('Oops! Something went wrong with saving your email. Please try again.');
      } else {
        console.log('Email submitted to database:', email);

        // --- FEATURE: Trigger real email sending via a backend endpoint ---
        // IMPORTANT: Now pointing to your local backend URL.
        try {
          const emailResponse = await fetch('https://vivace-smvk.onrender.com/api/send-thank-you-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipientEmail: email })
          });

          if (!emailResponse.ok) {
            // If the serverless function returns an error status
            const errorText = await emailResponse.text();
            console.error('Failed to send thank you email:', errorText);
            setMessage(`Thanks for joining! There was an issue sending your confirmation email.`);
          } else {
            // Email sending request was successful
            console.log(`Successfully triggered thank you email to: ${email}`);
            setMessage(`Thanks for joining the quest, ${email}! A confirmation email has been sent.`);
          }
        } catch (emailError) {
          // Catch network errors or issues with the fetch call itself
          console.error('Error triggering email sending:', emailError);
          setMessage(`Thanks for joining! There was a network issue sending your confirmation email.`);
        }
        // --- END FEATURE ---

        setEmail('');
        setShowEmailInput(false);
      }
    } else {
      setMessage('Please enter your email address.');
    }
  };

  return (
    <div
      className="app-container flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white p-4"
      style={{ backgroundImage: `url(${backgroundImage})`, fontFamily: 'Inter, sans-serif' }}
    >
      {/* Overlay for better text readability */}
      <div className="overlay absolute inset-0 bg-black opacity-50 rounded-lg"></div>

      {/* Content Container */}
      <div className="content-container relative z-10 flex flex-col items-center text-center max-w-md w-full bg-gray-800 bg-opacity-75 p-8 rounded-xl shadow-lg">
        <h1 className="main-title text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Turn Practicing Into a Game!
        </h1>
        <p className="subtitle text-lg md:text-xl mb-8 opacity-90">
          Get early access today!
        </p>

        {!showEmailInput ? (
          <button
            onClick={handleStartQuestClick}
            className="start-quest-button bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Start Quest
          </button>
        ) : (
          <form onSubmit={handleSubmitEmail} className="email-form flex flex-col items-center w-full">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input w-full p-3 mb-4 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="join-button bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
            >
              Join Early Access
            </button>
          </form>
        )}

        {message && (
          <p className="message mt-6 text-lg animate-fade-in-up">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
