const fetchURL = "http://localhost:8081/get-latest";
const saveURL = "http://localhost:8081/save";
const GeoNames = 'api.geonames.org/postalCodeSearchJSON?';

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
   const deadline = document.getElementById('countdown').textContent = countdown + ' milliseconds';
   const tripDuration = document.getElementById('LoT').textContent = LoT + ' milliseconds';
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
          document.getElementById('latitude').textContent = JSON.stringify(res.latitude);
          document.getElementById('longitude').textContent = JSON.stringify(res.longitude);
          document.getElementById('country').textContent = JSON.stringify(res.country);
  });
};
export { handleGeonames}