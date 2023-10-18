import React, { useState, useEffect } from "react";
import Weather from "./weather";

function Days({ coordinate }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const getWeather = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinate.latitude}&longitude=${coordinate.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Africa%2FCairo&forecast_days=3`
      );
      const weather = await getWeather.json();
      console.log("🚀 ~ file: day.jsx:48 ~ fetchWeather ~ weather:", weather);

      const getIcons = await fetch(
        "https://gist.githubusercontent.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c/raw/7f2d37310ac5d5c309fd9d2f4dd98cc837c28237/descriptions.json"
      );
      const icons = await getIcons.json();
      let weathercode = weather.daily.weathercode;
      const images = weathercode.map((code) => icons[code]?.day.image);

      const d = [];
      const daysString = ["Today", "Tomorrow", "After Tomorrow"];

      for (let i = 0; i < weather?.daily?.time?.length; i++) {
        d.push({
          i,
          daysString: daysString[i],
          date: weather?.daily?.time[i]?.replace(/-/g, "/"),
          image: images[i],
          weather: {
            min: weather?.daily?.temperature_2m_min[i],
            max: weather?.daily?.temperature_2m_max[i],
          },
        });
      }

      setData(d);
    };

    if (coordinate?.longitude && coordinate?.latitude) fetchWeather();
  }, [coordinate?.longitude, coordinate?.latitude]);

  return (
    <div>
      <div className="container">
        {data.map((d, i) => (
          <Weather
            key={i}
            {...{
              i: d.i,
              daysString: d.daysString,
              date: d.date,
              image: d.image,
              min: d.weather.min,
              max: d.weather.max,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Days;
