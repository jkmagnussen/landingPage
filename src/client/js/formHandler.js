export { handleSubmit }
const fetchURL = "http://localhost:8081/get-latest";
const saveURL = "http://localhost:8081/save";

const GeoNames = 'api.geonames.org/postalCodeSearchJSON?';
var userid = ({
  username: process.env.username
  });
var validUrl = require('valid-url')
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    //Client.checkForName(formText)
    //var input_url = document.querySelectorAll('input[name=test-url]');
    console.log("::: Form Submitted :::")
    //fetch('http://localhost:8081/save')
    const _fetchWeatherData = async (userid, zip = "11230") => {
      // we build our data necessary for doing the fetch operation from weather api
      const url = `http://${GeoNames}postalcode=${zip}&maxRows=10&username=${userid}`;
      return await response.json();
    };

const _postData = async (path, input_url) => {
    await fetch(path, {
      method: "POST",
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      body: JSON.stringify({text: input_url})
        })
        .then(res => {
          console.log(res)
          return res.json()
        })
        .then(function(res) {

          console.log(res);

          const zip = document.getElementById('input1');

          document.getElementById('latitude').innerHTML = JSON.stringify(res.latitude);
          document.getElementById('longitude').innerHTML = JSON.stringify(res.longitude);
          document.getElementById('country').innerHTML = JSON.stringify(res.country);
  }
)}}