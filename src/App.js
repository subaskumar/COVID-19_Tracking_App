import './App.css';
import {useState,useEffect } from 'react'
import { FormControl,Card,CardContent,TextField} from '@mui/material';
import Axios from 'axios'
import { sortData, prettyPrintStat } from "./contents/utils";
import InfoBox from './infoBox/infoBox'
import numeral from "numeral";
import Map from "./Map/Map"
import "leaflet/dist/leaflet.css";
import Table from "./Table/Table"


function App() {
  const [country, setInputCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);


  useEffect(() => {
    Axios.get("https://disease.sh/v3/covid-19/all")
    .then((res) => {
      setCountryInfo(res.data);
      // console.log(res.data)
    });
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setInputCountry(countryCode)

    const url =
    countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    Axios.get(url)
    .then((res) => {
      setCountryInfo(res.data);
      setMapCenter([res.data.countryInfo.lat, res.data.countryInfo.long]);
      setMapZoom(1);
    });
  }

  useEffect(() => {
      Axios.get("https://disease.sh/v3/covid-19/countries")
      .then((res) => {
        const countries = res.data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        let sortedData = sortData(res.data);
        setCountries(countries)
        setMapCountries(res.data);
        setTableData(sortedData);
      })
  },[])

  return (
    <>
    <div className="App">
      <div className="app__left">
        <div style={{display: 'flex', justifyContent: 'space-between',margin: '20px 0px'}}>
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <TextField required focused
              size="small"
              select
              label="Select Country"
              value={country}
              onChange={onCountryChange}
              SelectProps={{native: true,}}
              sx={{width: '200px'}}
            >
              <option name="Worldwide" key="worldwide" value="worldwide">
                Worldwide
              </option>
              {countries.map((option) => (
                <option key={option.name} name={option.name} value={option.value}>
                  {option.name}
                </option>
              ))}
            </TextField>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
        /> 
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            {/* <LineGraph casesType={casesType} /> */}
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
}

export default App;