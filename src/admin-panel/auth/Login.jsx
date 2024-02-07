import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginimg from "../../assets/login.png"

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    // useEffect(() => {
    //   // Check if there is a stored path in session storage
    //   const storedPath = sessionStorage.getItem("loginRedirectPath");
    //   if (storedPath) {
    //     sessionStorage.removeItem("loginRedirectPath");
    //     navigate(storedPath);
    //   }
    // }, [navigate]);
  
  
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
 
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/admin/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );
    
        if (response.ok) {
          const data = await response.json();
          
          localStorage.setItem("access_token", data.token.accessToken);
          localStorage.setItem("refresh_token", data.token.refreshToken);
          localStorage.setItem('isLogin', true);
    
          navigate("/dashboard");
          console.log(data);
        } else {
          const errorData = await response.json(); // Assuming the error response has JSON format
          throw new Error(errorData.message); // Use the error message from the API response
        }
      } catch (error) {
        console.error(error);
        setError(error.message); // Set the error message to be displayed to the user
      }
    };
  return (
    <div className="flex w-full max-w-screen-2xl mx-auto">
        {/* Left Side*/}
        <div className="flex items-center justify-center w-5/12">
        <form className=" mx-auto w-72 " onSubmit={handleSubmit}>
          <div>
            <h1 className="text-4xl font-bold">Log In!</h1>
            <h3 className="text-2xl font-semibold pb-8 pt-3">Secure Entry to Gateway to Exclusive Services</h3>
          </div>
          <div className="mb-4">
            <p className=" flex gap-2 shadow appearance-none border rounded-full w-full py-3 px-3 text-[#c2c2c2] leading-tight focus:outline-none focus:shadow-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-[#c2c2c2]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <input
                className="text-black outline-0"
                id="email"
                type="text"
                placeholder="Username"
                value={email}
                onChange={handleEmailChange}
              />
            </p>
          </div>
          <div className="mb-2">
            <p className="flex gap-2 shadow appearance-none border rounded-full w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-[#c2c2c2]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>

              <input
                className="outline-0"
                id="password"
                type="password"
                placeholder="password "
                value={password}
                onChange={handlePasswordChange}
              />
            </p>
          </div>
          <div className="flex flex-col">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white  py-3 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
            {error && (
              <p className="text-red-500 text-center mt-2">{error}</p>
            )}
          </div>
         
        </form>
        
      </div>
      {/* right side */}
      <div className="">
              <img src={loginimg} alt="" />
      </div>
        
    </div>
  )
}

export default Login