import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';
import { AppBar, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GolfCourseOutlined } from '@material-ui/icons';
import CloudIcon from '@material-ui/icons/Cloud';

const api = {
  key: "0077ec509bf8ecf30dc4b09c6b488f0f",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    // if (evt.key === "Enter") {
    fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
      .then(res => res.json())
      .then(result => {
        console.log('RESULT:', result)
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    // }
  }

  const dateBuilder = (d) => {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = monthNames[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }));
  const classes = useStyles();
  return (
    // <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
    // style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515753453183-2b5bb51da01a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHJhaW4lMjBkcm9wfGVufDB8fDB8fHwy&auto=format&fit=crop&w=500&q=60)' }}
    <div >
      <AppBar style={{ height: '10%', textAlign: 'center', display: 'flex', backgroundColor: 'darkslateblue', justifyContent: 'center' }}>A SIMPLE WEATHER APPLICATION</AppBar>
      {/* <div> */}
      {/* <img src="your-image-url" alt="your-image-description" /> */}
      <Paper
        elevation={6}
        square
        style={{
          marginLeft: '23%',
          width: '55%',
          //height: '50vh',
          marginTop: '15%',
          //display: 'flex',
          //alignItems: 'center'
        }}>
        <Grid container direction="column" style={{ padding: '2%' }}>
          <Grid item style={{ backgroundColor: 'lavenderblush' }} alignItems="center" justifyContent="center">
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Grid item>
                <TextField
                  placeholder='Enter location!'
                  onChange={(event) => { setQuery(event?.target?.value) }}
                  //style={{ paddingLeft: '20px' }}
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
            {weather?.name ? (<Grid container direction="column" alignItems="center" justifyContent="center" style={{ marginTop: '8%' }}>
              <Grid item><Typography>{weather?.name}, {weather?.sys?.country}</Typography></Grid>
              <Grid item><Typography>{dateBuilder(new Date())}</Typography></Grid>
              <Grid item><Typography> {Math.round(weather?.main?.temp)}°c</Typography></Grid>
              <Grid item><Typography>{weather?.weather?.[0]?.main}</Typography></Grid>
            </Grid>)
              :
              (<Grid container direction="column" alignItems="center" justifyContent="center" style={{ marginTop: '10%' }}>
                {/* <img src="https://cdn.dribbble.com/users/2277649/screenshots/8498294/weather_dribbble_size.gif.gif" /> */}
                <CloudIcon ></CloudIcon>
              </Grid>)}
          </Grid>
        </Grid>
      </Paper>
      {/* </div> */}

    </div>

  );

}

export default App;
