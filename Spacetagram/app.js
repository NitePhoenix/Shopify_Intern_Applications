// used tutorial from https://sophiali.dev/javascript-fetch-api-with-nasa-api

const url = 'https://api.nasa.gov/planetary/apod?api_key='
const api_key = "DEMO_KEY"


const fetchNASAData = async () => {
  try {
    const response = await fetch(`${url}${api_key}`)
    const data = await response.json()
    console.log('NASA APOD data', data)
    displayData(data)
  } catch (error) {
    console.log(error)
  }
}

const displayData = data => {
  document.getElementById('img-title').textContent = data.title
  document.getElementById('img-date').textContent = data.date
  document.getElementById('img-picture').src = data.hdurl
  document.getElementById('img-explanation').textContent = data.explanation
}

fetchNASAData()