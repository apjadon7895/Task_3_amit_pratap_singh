import { useState } from 'react';
import { BiSearch, BiCurrentLocation } from 'react-icons/bi';


 // Provides a search bar for city searches and options to use current location or change temperature units.

const Search = ({ setQuery, setUnits }) => {
  // State to manage the city input value
  const [city, setCity] = useState("");

 
   // Handles the search button click event.
   // Updates the query with the city name if it's not empty.
  
  const handleSearchClick = () => {
    if (city.trim() !== "") {
      setQuery({ q: city.trim() });
    }
  };

  
   // Handles the current location button click event.
  
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      }, 
      (error) => {
        // Handle geolocation error if necessary
        console.error("Error obtaining geolocation:", error);
      });
    } else {
      // Handle case where geolocation is not supported
      console.warn("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center my-6 space-y-4 md:space-y-0">
      {/* Search input and icons for search and current location */}
      <div className="flex flex-row w-full md:w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search by city"
          className="text-gray-500 text-base md:text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
        />
        <BiSearch
          size={25}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <BiCurrentLocation
          size={25}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>

      {/* Temperature unit selection buttons */}
      <div className="flex flex-row w-full md:w-1/4 items-center justify-center space-x-2">
        <button
          className="text-lg md:text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <p className="text-lg md:text-2xl font-medium mx-1">|</p>
        <button
          className="text-lg md:text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Search;
