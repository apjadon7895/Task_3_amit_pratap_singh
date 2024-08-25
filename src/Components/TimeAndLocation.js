import React from 'react';


 // Displays the current local time and location (city and country).
 
const TimeAndLocation = ({
  weather: { formattedLocalTime, name, country },
}) => {
  return (
    <div>
      {/* Display the formatted local time */}
      <div className="flex items-center justify-center my-4 md:my-6">
        <p className="text-lg md:text-xl font-light">
          {formattedLocalTime}
        </p>
      </div>

      {/* Display the city and country name */}
      <div className="flex items-center justify-center my-2 md:my-3">
        <p className="text-lg md:text-2xl font-medium">
          {`${name}, ${country}`}
        </p>
      </div>
    </div>
  );
};

export default TimeAndLocation;
