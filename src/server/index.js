const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const aylien = require('aylien_textapi')
const postRequest = ('./handle')


app.use(cors())
app.use(express.static('dist'))
let projectData = {};
app.use(bodyParser.urlencoded({
  extended: true
})
);
app.use(bodyParser.json())
console.log(__dirname);
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
app.get('/save', function (req, res) {
  res.send(JSON.stringify(projectData));
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
});

var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
  });

  console.log(process.env)
// Post Route
app.post("/save", (req, res) => {
  projectData.latitude = req.body.latitude;
  projectData.longitude = req.body.longitude;
  projectData.country = req.body.country;
  res.end();
});

module.exports = app;