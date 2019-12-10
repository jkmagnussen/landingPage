var validUrl = require('valid-url')
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    //Client.checkForName(formText)
    //var input_url = document.querySelectorAll('input[name=test-url]');

    console.log("::: Form Submitted :::")
    //fetch('http://localhost:8081/save')
    //.then(res => res.json())
    //.then(function(res) {
        //document.getElementById('results').innerHTML = res.message
    //})
    let formText = document.getElementById('name').value
    if (validUrl.isUri(formText)){
      _postData('http://localhost:8081/article', formText)
    } else {
      document.getElementById('error-message').innerHTML = "Sorry, this is not a valid URL."
    }
}

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

          document.getElementById('polarity').innerHTML = JSON.stringify(res.polarity);
          document.getElementById('subjectivity').innerHTML = JSON.stringify(res.subjectivity);
          document.getElementById('polarity_confidence').innerHTML = JSON.stringify(res.polarity_confidence);
          document.getElementById('subjectivity_confidence').innerHTML = JSON.stringify(res.subjectivity_confidence);
          document.getElementById('excerpt').innerHTML = JSON.stringify(res.text);
  }
)}

export { handleSubmit }
