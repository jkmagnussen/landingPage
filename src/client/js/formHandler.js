
const _fetchGeoNames = async (zip = "11230") => {
  const url = `http://localhost:8081/geoNames?zip=${zip}`;
  return await fetch(url)
  .then(response => response.json())
};

const handleGeonames = async () => {
  const prospectiveLocation = document.getElementById('input1');

  console.log("::: Form Submitted :::")

  return await _fetchGeoNames(prospectiveLocation.value).then(response =>{
    document.getElementById('latitude').textContent = response.lat;
    document.getElementById('longitude').textContent = response.lng;
    document.getElementById('country').textContent = response.countryCode;
  });
};

const handleCountdown = () => {
  const startDate = new Date(document.getElementById('input2').value);
  const endDate = new Date(document.getElementById('input3').value);

  const time = new Date()
  // const newTime = new Date(chosenDate).getTime();
  // const addTime = new Date(endDate).getTime();
  const countdown = Math.ceil(startDate - time);
  
  // const countdown = newTime - time;
  const LoT = endDate.getTime() - startDate.getTime();
  const deadline = document.getElementById('countdown').textContent = Math.ceil(countdown / 8.64e+7) + ' Days to go!';
  const tripDuration = document.getElementById('LoT').textContent =  LoT / 8.64e+7 + ' Day trip.';
}

const dateDifference = (startDate, endDate) => {
  return endDate.getTime() - startDate.getTime();
}

const _fetchDarkSky = async (lat, long, time) => {
  const url2 = `http://localhost:8081/darkSky?latitude=${lat}&longitude=${long}&time=${time}`;
  return await fetch(url2)
  .then(response => {
    return response.json()
  })
};

const handleDarkSky = (time, daySinceStart) => {
  const lat = document.getElementById('latitude').textContent;
  const lng = document.getElementById('longitude').textContent;

  _fetchDarkSky(lat, lng, time).then(response => {
    const childText = document.createTextNode(`Day ${daySinceStart +1 }: ${response.temperatureHigh}\u00B0 ↑ ${response.temperatureLow}\u00B0 ↓ & likely  ${response.icon}.       `);
    const child = document.createElement("li").appendChild(childText);
    document.getElementById('weather').appendChild(child);
  });
};


const formHandler = (event) => {
  handleCountdown();

  handleGeonames().then(response => {
    const startDate = new Date(document.getElementById('input2').value);
    const endDate = new Date(document.getElementById('input3').value);
    const countdownInDays = dateDifference(startDate, endDate)/8.64e+7;

    for(let i=0; i < countdownInDays; i++) {
      let currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate());

      const time = currentDate.getTime()/1000;
      handleDarkSky(time, i);
    }
  });
}

export default formHandler;