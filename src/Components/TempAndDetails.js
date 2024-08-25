import React from 'react';
import { FaThermometerEmpty } from 'react-icons/fa';
import { BiSolidDropletHalf } from 'react-icons/bi';
import { FiWind } from 'react-icons/fi';
import { GiSunrise, GiSunset } from 'react-icons/gi';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';


 // Displays weather information including temperature, details, and other metrics.

const TempAndDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) => {
  // Details to display in a vertical layout
  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}`,
    },
  ];

  // Details to display in a horizontal layout
  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <div>
      {/* Display weather details */}
      <div className="flex items-center justify-center py-6 text-lg md:text-xl text-cyan-300">
        <p>{details}</p>
      </div>

      {/* Display temperature, weather icon, and vertical details */}
      <div className="flex flex-col md:flex-row items-center justify-between py-3 space-y-4 md:space-y-0">
        <img
          src={icon}
          alt="weather icon"
          className="w-16 md:w-20"
        />
        <p className="text-4xl md:text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-3 items-start">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex font-light text-xs md:text-sm items-center"
            >
              <Icon size={16} className="mr-1 md:mr-2" />
              {`${title}:`}
              <span className="font-medium ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Display horizontal details */}
      <div className="flex flex-wrap md:flex-nowrap text-xs md:text-sm items-center justify-center space-x-6 md:space-x-10">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div
            key={id}
            className="flex items-center mb-2 md:mb-0"
          >
            <Icon size={20} className="mr-2" />
            <p className="font-light">
              {`${title}:`}
              <span className="font-medium ml-1">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempAndDetails;
