import React from 'react';


 // Displays a list of weather forecasts with icons and temperatures.
 
const Forecast = ({ title, data }) => {
  return (
    <div>
      {/* Section title */}
      <div className="flex items-center justify-start mt-6">
        <p className="font-medium uppercase text-sm md:text-base">{title}</p>
      </div>

      {/* Divider line */}
      <hr className="my-1" />

      {/* Forecast items */}
      <div className="flex items-center justify-between flex-wrap md:flex-nowrap">
        {data.map((d, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-1/2 md:w-auto mb-4 md:mb-0"
          >
            {/* Forecast item title */}
            <p className="font-light text-xs md:text-sm">{d.title}</p>
            
            {/* Weather icon */}
            <img
              src={d.icon}
              alt="weather icon"
              className="w-10 md:w-12 my-1"
            />
            
            {/* Temperature value */}
            <p className="font-medium text-sm md:text-base">{`${d.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
