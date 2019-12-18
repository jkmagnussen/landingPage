const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const postRequest = ('./handle')
const GeoNames = 'api.geonames.org/postalCodeSearchJSON?';
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

// Post Route
app.get("/geoNames", (req, res) => {
  const zip = req.query.zip;
   _fetchGeoNames(process.env.username, zip)
   .then(response=>{
     res.end(JSON.stringify(response))
   });
})
module.exports = app;