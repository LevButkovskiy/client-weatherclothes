import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = "17502697685fce86111fd6595809ba54"
function App() {
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState(0);
    const [temperatureDigit, setTemperatureDigit] = useState(0);
    const [chill, setChill] = useState(0);
    const [chillDigit, setChillDigit] = useState(0);
    const [condition, setCondition] = useState('');

    const [wind, setWind] = useState(0);
    const [pressure, setPressure] = useState(0);
    const [humidity, setHumidity] = useState(0);

    const [icon, setIcon] = useState('');

    const [head, setHead] = useState('');
    const [upper, setUpper] = useState('');
    const [lower, setLower] = useState('');
    const [boots, setBoots] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((geolocation) => {
            const latitude = geolocation.coords.latitude;
            const longitude = geolocation.coords.longitude;

            console.log(geolocation)

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru`)
                .then(result => result.json())
                .then(response => {
                    const temp = response.main.temp.toFixed(0);
                    const tempDigit = temp > 0 ? "+" : "-";

                    console.log(response)
                    setCity(response.name);
                    setTemperature(temp);
                    setTemperatureDigit(tempDigit)
                    setCondition(response.weather[0].description);
                    setIcon(response.weather[0].icon);
                    setPressure((response.main.pressure * 0.75006375541921).toFixed(0));
                    setHumidity(response.main.humidity);

                    const temperature = (9/5 * response.main.temp + 32);
                    const windResponse = 2.23694 * response.wind.speed;
                    setWind(response.wind.speed);

                    if(windResponse === 0.0){
                        setChill(temp);
                        setChillDigit(tempDigit)
                    }
                    else{
                        const velocity = Math.pow(windResponse, 0.16);
                        const chill = ((35.74 + (0.6215 * temperature) - (35.75 * velocity) + (0.4275 * temperature * velocity) - 32) * 5/9).toFixed(0);
                        setChill(chill);
                        setChillDigit(chill > 0 ? "+" : "-");
                    }

                    generateClothes();
                })
        }, (error) => {
            alert(error.message);
        });
    }, []);

    const generateClothes = () => {
        if(chill < -30){
            setHead("Insulated Hat");
            setUpper("Insulated Jacket");
            setLower("Pants");
            setBoots("Winter Shoes");
        }
        else if(chill >= -30 && chill <= -25){
            setHead("Insulated Hat");
            setUpper("Insulated Jacket");
            setLower("Pants");
            setBoots("Winter Shoes");
        }
        else if(chill > -25 && chill <= -20){
            setHead("Insulated Hat");
            setUpper("Insulated Jacket");
            setLower("Pants");
            setBoots("Winter Shoes");
        }
        else if(chill > -20 && chill <= -15){
            setHead("Hat");
            setUpper("Insulated Jacket");
            setLower("Pants");
            setBoots("Winter Shoes");
        }
        else if(chill > -15 && chill <= -10){
            setHead("Hat");
            setUpper("Jacket");
            setLower("Pants");
            setBoots("Winter Shoes");
        }
        else if(chill > -10 && chill <= -5){
            setHead("Hat");
            setUpper("Jacket");
            setLower("Pants");
            setBoots("Winter Shoes");
        }
        else if(chill > -5 && chill <= 0){
            setHead("Hat");
            setUpper("Jacket");
            setLower("Pants");
            setBoots("Winter Shoes");
        }
        else if(chill > 0 && chill <= 5){
            setHead("Hat");
            setUpper("Jacket");
            setLower("Pants");
            setBoots("Sneakers");
        }
        else if(chill > 5 && chill <= 10){
            setUpper("WindBreaker");
            setLower("Pants");
            setBoots("Sneakers");
        }
        else if(chill > 10 && chill <= 15){
            setUpper("WindBreaker");
            setLower("Pants");
            setBoots("Sneakers");
        }
        else if(chill > 15 && chill <= 20){
            setUpper("Hoodie");
            setLower("Pants");
            setBoots("Sneakers");
        }
        else if(chill > 20 && chill <= 25){
            setHead("Cap");
            setUpper("TShirt");
            setLower("Shorts");
            setBoots("Sneakers");
        }
        else if(chill > 25 && chill <= 30){
            setHead("Cap");
            setUpper("TShirt");
            setLower("Shorts");
            setBoots("Sneakers");
        }
        else if(chill > 30){
            setHead("Cap");
            setUpper("TShirt");
            setLower("Shorts");
            setBoots("Slippers");
        }
    }

  return (
    <div className="App">
      <header>
          <div className="title">Weather Clothes</div>
      </header>
      <div className="content">
        <div className="weather">
            <div className="weatherContainer">
                <div className="city">{city}</div>
                <div className="temperature">{`${temperatureDigit}${temperature} °С`}</div>
                <div className="chill">{`Ощущается: ${chillDigit}${chill} °С`}</div>
                <div className="weatherCondition">{condition}</div>
                <img className="icon" src={`/images/${icon}.png`}/>
                <div className="weatherConditions">
                    <div className="condition">
                        <span className="title">Wind</span>
                        <span className="value">{wind}</span>
                        <span className="measure">m/s</span>
                    </div>
                    <div className="condition">
                        <span className="title">Pressure</span>
                        <span className="value">{pressure}</span>
                        <span className="measure">mmHg</span>
                    </div>
                    <div className="condition">
                        <span className="title">Humidity</span>
                        <span className="value">{humidity}</span>
                        <span className="measure">%</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="clothes">
            <div className="head">{head}</div>
            <div className="upper">{upper}</div>
            <div className="lower">{lower}</div>
            <div className="boots">{boots}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
