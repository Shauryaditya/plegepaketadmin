import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginimg from "../../assets/login.png"
import Company from "../../assets/Companylogo.png"

const Login = () => {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();

    try {
      const otpResponse = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/admin/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (otpResponse.ok) {
        alert("OTP sent successfully. Please check your email.");
      } else {
        const errorData = await otpResponse.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const verifyResponse = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/admin/verifyOtp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await verifyResponse.json();
      console.log("Data>>>",data)
      if (verifyResponse.ok) {
       
        

        localStorage.setItem("access_token", data.accessToken.accessToken);
        localStorage.setItem("refresh_token", data.accessToken.refreshToken);
        localStorage.setItem("isLogin", true);

        navigate("/dashboard");
        console.log(data);
      } else {
        const errorData = await verifyResponse.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };
  return (
    <div className="flex w-full max-w-screen-2xl mx-auto">
        {/* Left Side*/}
        <div className="flex items-center justify-center w-1/2">
       
        <form className="w-[35rem] p-4">
        <div className="flex justify-center items-center my-16">
            <img src={Company} alt="" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-left">Log In!</h1>
            <h3 className="text-sm font-normal text-left pb-8 pt-3">Secure Entry to Gateway to Exclusive Services</h3>
          </div>
          <div className="mb-4">
            <div className="flex justify-start">
            <label className="text-sm" htmlFor="">Email</label>
            </div>
            <p className=" flex justify-between gap-2 rounded border w-full py-3 px-3 text-[#c2c2c2] leading-tight focus:outline-none focus:shadow-outline">
        

              <input
                className="text-black outline-0 w-2/3"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <p className="text-xs font-normal text-blue-400 cursor-pointer"  onClick={handleSendOtp}>Send OTP</p>
            </p>
          </div>
          <div className="">
          <p className=" flex gap-2 rounded border w-full py-3 px-3 text-[#c2c2c2] leading-tight focus:outline-none focus:shadow-outline">
              <input
                className="text-black outline-0"
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
              />
            </p>
          </div>
     
          <div className="flex flex-col mt-10">
            <button
              className="bg-blue-900 hover:bg-blue-700 text-white  py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              onClick={handleLogin}
            >
             Login
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