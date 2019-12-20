
function handleGeonames(event) {
  const prospectiveLocation = document.getElementById('input1');
  const chosenDate = document.getElementById('input2').value;
  const endDate = document.getElementById('input3').value;
  console.log("::: Form Submitted :::")
  
  const _fetchGeoNames = async (zip = "11230") => {
    const url = `http://localhost:8081/geoNames?zip=${zip}`;
    return await fetch(url)
    .then(response => response.json())
  };
  _fetchGeoNames(prospectiveLocation.value).then(response =>{
    document.getElementById('latitude').textContent = response.lat;
    document.getElementById('longitude').textContent = response.lng;
    document.getElementById('country').textContent = response.countryCode;
  });
   _fetchGeoNames(prospectiveLocation.value);
   
   const time = new Date().getTime();
   const newTime = new Date(chosenDate).getTime();
   const addTime = new Date(endDate).getTime();
   const countdown = newTime - time;
   const LoT = addTime - newTime;
   const deadline = document.getElementById('countdown').textContent = countdown / 8.64e+7 + ' Days to go!';
   const tripDuration = document.getElementById('LoT').textContent =  LoT / 8.64e+7 + ' Day trip.';
};

const _fetchDarkSky = async (lat, long) => {
  const lat1 = document.getElementById('latitude').textContent;
  const long1 = document.getElementById('longitude').textContent;
  const url = `http://localhost:8081/darkSky/${lat}/${long}`;
  return await fetch(url)
  .then(response => response.json())
  .then (document.getElementById('weather').textContent = response.daily);
};

export { handleGeonames}
export { _fetchDarkSky}