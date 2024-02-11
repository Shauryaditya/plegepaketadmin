import { Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { getToken } from "../../hook/getToken";

const ProfileSetting = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = getToken();

  const handleSendOTP = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/admin/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      // Handle success, show a success message or perform further actions
      console.log("OTP sent successfully");
    } catch (error) {
      console.error("Error sending OTP:", error);
      // Handle error, show an error message to the user
    }
  };

  return (
    <div className="max-w-7xl mt-14 p-2">
      <div className="ml-60 flex gap-x-4">
        <div className="w-2/5 bg-white rounded-xl shadow-lg border h-48"></div>
        <div className="w-3/5 bg-white rounded-xl shadow-lg border h-48 p-4">
          <h1 className="text-xl font-semibold text-left">Account</h1>
          <div className="grow flex gap-x-4 py-4">
            <div className="flex flex-col justify-start">
              <label className="text-left" htmlFor="">
                Email
              </label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col justify-start">
              <label htmlFor="" className="text-left">
                Password
              </label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex justify-start">
            <button
              onClick={handleSendOTP}
              className=" text-white bg-blue-900 px-6 py-2 rounded-full"
            >
              Send OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
