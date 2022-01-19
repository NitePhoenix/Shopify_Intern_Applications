// used tutorial from https://sophiali.dev/javascript-fetch-api-with-nasa-api

const url = 'https://api.nasa.gov/planetary/apod?api_key='
const api_key = "DEMO_KEY"
const today = new Date()
const yesterday = new Date(today)
var dayTracker = 0
let imgData = []
var imgDataPt = 0

const init = async() => {
	dayURL = '&date='+yesterday.toLocaleString('en-CA',{ timeZone: 'America/New_York'}).substring(0,10)
	console.log(`${url}${api_key}${dayURL}`)

	try {
		const response = await fetch(`${url}${api_key}${dayURL}`)
		const data = await response.json()
		console.log('NASA APOD data', data)
		imgData.push(data)
	} catch (error) {
		console.log(error)
	}
	displayData(imgData[imgDataPt])
	today.setDate(today.getDate()-1)
	imgDataPt++;
	dayTracker++;
}

const fetchNASAData = async () => {
	// get data for 100 images at once, make url
	// TODO fix start/end dates
	yesterday.setDate(yesterday.getDate()-100)
	// APOD gets updated midnight EST?
	dayURL = '&start_date='+yesterday.toLocaleString('en-CA',{ timeZone: 'America/New_York'}).substring(0,10)+'&end_date='+today.toLocaleString('en-CA',{ timeZone: 'America/New_York'}).substring(0,10)
	console.log(`${url}${api_key}${dayURL}`)

	try {
		const response = await fetch(`${url}${api_key}${dayURL}`)
		const data = await response.json()
		console.log('NASA APOD data', data)
		imgData = imgData.concat(data.reverse())
	} catch (error) {
		console.log(error)
	}
	dayTracker++
}

const displayData = data => {
	document.getElementById('img-title'+imgDataPt).textContent = data.title
	document.getElementById('img-date'+imgDataPt).textContent = data.date
	document.getElementById('img-picture'+imgDataPt).src = data.hdurl
	document.getElementById('img-explanation'+imgDataPt).textContent = data.explanation
}

function makeMoreCards(){
	// gets data for the next 100 days if out
	if(imgDataPt+7 > imgData.length){
		fetchNASAData();
	}
	// adds 7 more cards to the bottom of the page
	var cardContainer = document.getElementById("card-container");
	var moreCards;
	for (var i = 0; i < 7; i++){
		moreCards = '<div class="col"><div class="card-header" id="img-title'+imgDataPt+'"></div><div id="img-container"><img src="" id="img-picture'+imgDataPt+'" alt="Astronomy image by NASA" class="card-img-top"><div id = "like-animation'+imgDataPt+'" style="display:none; "><i class="bi bi-heart-fill" id="like-icon"></i></div></div><div class="card-body"><p class="card-text pt-1 text-start" id="img-explanation'+imgDataPt+'"></p></div><div class="card-footer text-muted"><span class="lh-lg" id="img-date'+imgDataPt+'"></span><input type="checkbox" class="btn-check text-end" id="btn-check-outlined'+imgDataPt+'" autocomplete="off" /><label class="btn btn-outline-danger float-end" for="btn-check-outlined'+imgDataPt+'" onClick="animateLike('+imgDataPt+')"><i class="bi bi-heart"></i></label></div></div>'
		if (document.getElementById('img-title'+imgDataPt) == null){
			cardContainer.innerHTML+=moreCards;
		}
		// TODO let data finish loading before adding cards
		displayData(imgData[imgDataPt])
		imgDataPt++;
	}
}

function animateLike(pt){
	// heart animation overlay when "liked"
	// TODO fix animation position, update checkbox
	const element = document.getElementById('like-animation'+pt);
	element.classList.add('animate__animated')
	element.classList.toggle('animate__fadeOutUp')
	element.classList.toggle('animate__delay-1s')
	if (element.style.display === "none"){ element.style.display = "block"; }
	else { element.style.display = "none" }
}

// checks if user has scrolled to the bottom, loads more content
// jQuery may provide a more elegant solution?
window.onscroll = function(ev) {
	if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // loads more content
        makeMoreCards()
    }
};

init();