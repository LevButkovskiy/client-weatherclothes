import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = "17502697685fce86111fd6595809ba54"
function App() {
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState(0);
    const [temperatureDigit, setTemperatureDigit] = useState(0);
    const [condition, setCondition] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((geolocation) => {
            const latitude = geolocation.coords.latitude;
            const longitude = geolocation.coords.longitude;

            console.log(geolocation)

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru`)
                .then(result => result.json())
                .then(response => {
                    const temp = response.main.temp.toFixed(0)

                    console.log(response)
                    setCity(response.name);
                    setTemperature(temp);
                    setTemperatureDigit(temp > 0 ? "+" : "-")
                    setCondition(response.weather[0].main);
                    setIcon(response.weather[0].icon)
                })
        }, (error) => {
            alert(error.message);
        });
    }, [])

  return (
    <div className="App">
      <header>
          <div className="title">Weather Clothes</div>
      </header>
      <div className="content">
        <div className="weather">
            <div className="city">{city}</div>
            <div className="temperature">{`${temperatureDigit}${temperature} °С`}</div>
            <div className="condition">{condition}</div>
            <img className="icon" src={`/images/${icon}.png`}/>
        </div>
      </div>
    </div>
  );
}

export default App;
