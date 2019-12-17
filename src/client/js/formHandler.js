const fetchURL = "http://localhost:8081/get-latest";
const saveURL = "http://localhost:8081/save";
const GeoNames = 'api.geonames.org/postalCodeSearchJSON?';
var validUrl = require('valid-url')
var userid = ({
  username: process.env.username
  });

function handleGeonames(event) {
  const prospectiveLocation = document.getElementById('input1');
  const chosenDate = document.getElementById('input2').value;
  const endDate = document.getElementById('input3').value;
  //event.preventDefault()
  console.log("::: Form Submitted :::")
  const _fetchGeoNames = async (zip = "11230") => {
    const url = `http://localhost:8081/geoNames?zip=${zip}`;
    return await fetch(url)
    .then(response => response.json())
  };
  _fetchGeoNames(prospectiveLocation.value).then(response =>{
    document.getElementById('latitude').innerHTML = response.lat;
    document.getElementById('longitude').innerHTML = response.lng;
    document.getElementById('country').innerHTML = response.countryCode;
  });
   _fetchGeoNames(prospectiveLocation.value);
   
   const time = new Date().getTime()
   const newTime = new Date(chosenDate).getTime();
   const addTime = new Date(endDate).getTime();
   
   const countdown = newTime - time
   const LoT = addTime - newTime

   const deadline = document.getElementById('countdown').innerHTML = countdown + ' milliseconds';
   const tripDuration = document.getElementById('LoT').innerHTML = LoT + ' milliseconds';
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
  });
};
export { handleGeonames}