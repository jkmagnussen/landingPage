
export { handleSubmit }
const fetchURL = "http://localhost:8081/get-latest";
const saveURL = "http://localhost:8081/save";

var apikey = ({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
  });

var validUrl = require('valid-url')
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    //Client.checkForName(formText)
    //var input_url = document.querySelectorAll('input[name=test-url]');

    console.log("::: Form Submitted :::")
    //fetch('http://localhost:8081/save')

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

          document.getElementById('latitude').innerHTML = JSON.stringify(res.latitude);
          document.getElementById('longitude').innerHTML = JSON.stringify(res.longitude);
          document.getElementById('country').innerHTML = JSON.stringify(res.country);
  }
)}}