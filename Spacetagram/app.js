// used tutorial from https://sophiali.dev/javascript-fetch-api-with-nasa-api

const url = 'https://api.nasa.gov/planetary/apod?api_key='
const api_key = "DEMO_KEY"
const today = new Date()
const yesterday = new Date(today)
var dayTracker = 0

const fetchNASAData = async () => {
	// each card gets data from the day before, make url
	// APOD gets updated midnight EST?
	dayURL = yesterday.toLocaleString('en-CA',{ timeZone: 'America/New_York'}).substring(0,10)
	// console.log(dayURL)

	console.log(`${url}${api_key}&date=${dayURL}`)
	yesterday.setDate(yesterday.getDate() - dayTracker)

	try {
		const response = await fetch(`${url}${api_key}&date=${dayURL}`)
		const data = await response.json()
		console.log('NASA APOD data', data)
		displayData(data)
	} catch (error) {
		console.log(error)
	}

	if (dayTracker == 0) {dayTracker++;}
}

const displayData = data => {
	console.log(dayTracker)
	document.getElementById('img-title'+dayTracker).textContent = data.title
	document.getElementById('img-date'+dayTracker).textContent = data.date
	document.getElementById('img-picture'+dayTracker).src = data.hdurl
	document.getElementById('img-explanation'+dayTracker).textContent = data.explanation
}

function makeMoreCards(){
	// adds 7 more cards to the bottom of the page
	var cardContainer = document.getElementById("card-container");
	var moreCards;
	for (var i = 0; i < 3; i++){
		moreCards = '<div class="col"><div class="card-header" id="img-title'+dayTracker+'"></div><img src="" id="img-picture'+dayTracker+'" alt="Astronomy image by NASA" class="card-img-top"><div class="card-body"><p class="card-text pt-1 text-start" id="img-explanation'+dayTracker+'"></p></div><div class="card-footer text-muted"><span class="" id="img-date'+dayTracker+'"></span><input type="checkbox" class="btn-check text-end" id="btn-check-outlined" autocomplete="off" /><label class="btn btn-outline-danger float-end" for="btn-check-outlined" onClick="animateLike()"><i class="bi bi-heart"></i></label></div></div>'
		cardContainer.innerHTML+=moreCards;
		// TODO fix fetch synchronization
		fetchNASAData()
		dayTracker++;
	}
}

function animateLike(){
	// TODO
	console.log("ya liked it!")
}

// checks if user has scrolled to the bottom, loads more content
// jQuery may provide a more elegant solution?
window.onscroll = function(ev) {
	if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // loads more content
        makeMoreCards()
    }
};

fetchNASAData()