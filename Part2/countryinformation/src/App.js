import { useState, useEffect } from "react";
import axios from "axios";

const CountryCta = ({ country }) => {
  const [show, setShow] = useState(false);
  const handleChange = (event) => setShow(!show);
  return (
    <>
      <div>
        {country.name.common}
        <button onClick={handleChange}>{show ? "hide" : "show"}</button>
      </div>
      {show && <CountryInfo country={country} />}
    </>
  );
};

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const apikey = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${country.capital}&aqi=yes`
      )
      .then((response) => {
        const res = response.data;
        setWeather((prev) => prev.concat(res));
      });
  }, [country.capital, apikey]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h4>Languages:</h4>
      <div>
        {Object.keys(country.languages).map((key) => (
          <p key={key}>{country.languages[key]}</p>
        ))}
      </div>
      <img src={country.flags.png} alt="Unable to load" />
      {weather.length === 2 && (
        <div>
          <h4>Weather in {weather[0].location.name}</h4>
          <p>temperature {weather[0].current.temp_c} Celcius</p>
          <p>wind {weather[0].current.wind_kph} Kph</p>
        </div>
      )}
    </div>
  );
};

const CountriesInfo = ({ filterCountry }) => {
  return (
    <div>
      {filterCountry.map((country) => (
        <CountryCta key={country.area} country={country} />
      ))}
    </div>
  );
};

const Countries = ({ countries, newCountry }) => {
  const filterCountry = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newCountry.toLowerCase())
  );

  if (filterCountry.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filterCountry.length <= 10 && filterCountry.length > 1) {
    return <CountriesInfo filterCountry={filterCountry} />;
  } else if (filterCountry.length === 1) {
    return <CountryInfo country={filterCountry[0]} />;
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const country = response.data;
      setCountries(country);
    });
  }, []);

  const handleChange = (event) => setNewCountry(event.target.value);
  return (
    <>
      <p>
        find countries <input value={newCountry} onChange={handleChange} />
      </p>
      <Countries countries={countries} newCountry={newCountry} />
    </>
  );
}

export default App;
