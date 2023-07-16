import React, { useState } from 'react';
import './App.css';
import './style.css';
import { AppBar, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';

const api = {
  key: "0077ec509bf8ecf30dc4b09c6b488f0f",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const search = (evt) => {
    fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
      .then(res => res.json())
      .then(result => {
        console.log('RESULT:', result)
        setWeather(result);
        setQuery('');
        console.log(result);
      });
  }

  const getDateString = (d) => {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = monthNames[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div >
      <AppBar style={{ height: '10%', textAlign: 'center', display: 'flex', backgroundColor: 'darkslateblue', justifyContent: 'center' }}>A SIMPLE WEATHER APPLICATION</AppBar>
      <Paper
        elevation={6}
        square
        style={{
          marginLeft: '23%',
          width: '55%',
          marginTop: '15%',
        }}>
        <Grid container direction="column" style={{ padding: '2%' }}>
          <Grid item style={{ backgroundColor: 'lavenderblush' }} alignItems="center" justifyContent="center">
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Grid item>
                <TextField
                  placeholder='Enter location!'
                  onChange={(event) => { setQuery(event?.target?.value) }}
                  value={query}
                  inputProps={{
                    style: {
                      textAlign: 'center',
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <Button onClick={search} style={{
                  marginTop: '2%', marginBottom: '5%',
                  backgroundColor: 'crimson'
                }}>Get Weather</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ backgroundColor: 'lavender', height: '35vh' }}>
            {weather?.name ? (<Grid container direction="column" alignItems="center" justifyContent="center" style={{ marginTop: '6%' }}>
              <Grid item><Typography>{weather?.name}, {weather?.sys?.country}</Typography></Grid>
              <Grid item><Typography>{getDateString(new Date())}</Typography></Grid>
              <Grid item><Typography> {Math.round(weather?.main?.temp)}°c</Typography></Grid>
              <Grid item><Typography>{weather?.weather?.[0]?.main}</Typography></Grid>
            </Grid>)
              :
              (<Grid container direction="column" alignItems="center" justifyContent="center" style={{ marginTop: '18%' }}>
                <CloudIcon ></CloudIcon>
              </Grid>)}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default App;
