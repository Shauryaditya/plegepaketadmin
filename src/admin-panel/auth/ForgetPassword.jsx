import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory for navigation
import loginimg from "../../assets/login.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/api/v1/admin/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      // Handle success, navigate to another page
      navigate('/forget-password'); // Navigate to the forget password page
    } catch (error) {
      console.error('Error sending email:', error);
      setError('Failed to send email'); // Set error message
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(''); // Clear error message when email changes
  };

  return (
    <div className="flex w-full max-w-screen-2xl mx-auto">
      {/* Left Side*/}
      <div className="flex items-center justify-center w-1/2">
        <form className="mx-auto w-72" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-4xl font-bold text-left">Forget Password!</h1>
            <h3 className="text-sm font-normal text-left pb-8 pt-3">Secure Entry to Gateway to Exclusive Services</h3>
          </div>

          <div className="mb-2">
            <p className="flex gap-2 shadow appearance-none border  w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-[#c2c2c2]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>

              <input
                className="outline-0"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </p>
          </div>
          <div className="flex flex-col mt-10">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
             Send Email
            </button>
            {error && (
              <p className="text-red-500 text-center mt-2">{error}</p>
            )}
          </div>
          <a className="text-xs " href="/forget-password">Forget Password</a>
        </form>
      </div>
      {/* right side */}
      <div>
        <img src={loginimg} alt="Login" />
      </div>
    </div>
  );
};

export default Login;
