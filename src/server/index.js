const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const postRequest = ('./handle')
const GeoNames = 'api.geonames.org/postalCodeSearchJSON?';
const darkSky = 'api.darksky.net/forecast';
const axios = require('axios');
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({
  extended: true
}));
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
});
// function to aggrogate the geoNames route, api key and url with zip search 
const _fetchGeoNames = async (username, zip = "11230") => { 
  // we build our data necessary for doing the fetch operation from weather api
  const url = `http://${GeoNames}postalcode=${zip}&maxRows=10&username=${username}`;
  return axios.get(url)
  .then(response => 
    response.data.postalCodes[0]
  )
};

// geoNamesRoute
app.get("/geoNames", (req, res) => {
  const zip = req.query.zip;
   _fetchGeoNames(process.env.username, zip)
   .then(response=>{
     res.end(JSON.stringify(response))
   });
})

// function to aggrogate the Dark Sky route, api key and url with longitude/ latitude search 
const _darkSky = async (key, lat, long, time) => {
  // we build our data necessary for doing the fetch operation from weather api
  const url = `https://${darkSky}/${key}/${lat},${long},${time}`;
  console.log(url);

  return await axios.get(url)
  .then(response => {
    return response.data.daily.data[0];
  });
};

// darkSky Route
app.get("/darkSky", (req, res) => {

  const time = req.query.time;
  const lat = req.query.latitude;
  const long = req.query.longitude;

  _darkSky(process.env.key, lat, long, time)
   .then(response => {
     res.end(JSON.stringify(response))
   });
})

module.exports = app;