import { useEffect, useState } from "react";
import Days from "./component/day";
import Map from "./component/Map";

function App() {
  const [coordinate, setCoordinate] = useState({});

  useEffect(() => {
    async function fetchCoordinate() {
      try {
        const response2 = await fetch("https://ipapi.co/json/");

        if (!response2.ok) {
          throw Error("problem");
        }

        const data2 = await response2.json();

        setCoordinate({
          latitude: data2.latitude,
          longitude: data2.longitude,
        });
      } catch (error) {
        // ברירת מחדל
        setCoordinate({
          latitude: 31.7674,
          longitude: 35.2186,
        });
      }
    }

    fetchCoordinate();
  }, []);
  log;
  return (
    <div className="app">
      <div className="hello">Welcome to fun in the clouds</div>
      <Days {...{ coordinate, setCoordinate }} />
      {setCoordinate.longitude && <Map {...{ coordinate }} />}
    </div>
  );
}

export default App;
