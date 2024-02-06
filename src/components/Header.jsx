import React from "react";
import Searchbar from "./Searchbar";

const Header = () => {
  return (
    <div>
      <div className="w-full flex justify-between gap-x-96 p-4 bg-white">
        <div className="flex justify-center items-center">
        <Searchbar />
        </div>
        
        <div className="flex justify-center gap-2 items-center">
          <p className="text-base text-gray-900 font-semibold">name</p>
        
        <div className="w-9 h-9">
          <img
            className="w-full h-full object-fill rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg"
            alt="profile"
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
