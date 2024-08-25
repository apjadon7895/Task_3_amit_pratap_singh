import React from 'react';


 // Each button updates the query in the parent component.
 
const TopButtons = ({ setQuery }) => {
  // List of cities to display as buttons
  const cities = [
    { id: 1, name: "London" },
    { id: 2, name: "Paris" },
    { id: 3, name: "New York" },
    { id: 4, name: "Tokyo" },
    { id: 5, name: "Sydney" },
  ];

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-around my-4 space-y-3 md:space-y-0 md:space-x-4">
      {/* Render buttons for each city */}
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-sm md:text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in-out duration-200"
          onClick={() => setQuery({ q: city.name })}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
