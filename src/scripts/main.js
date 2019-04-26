console.log("JS Attached")

//Find the place on the DOM the information will appear??

const parksContainer = document.querySelector("#parkDomEl");

//Fetch the data//

fetch("https://raw.githubusercontent.com/nss-day-cohort-31/national-parks/master/database.json")
    .then(results => results.json()) //Get the data//
    .then(parks => {                 //parse the data//
        const allParks = parks.parks //dig into the Object//
        allParks.forEach(park => {   //seperate each item//

        fetch(`https://blooming-mesa-53816.herokuapp.com/${darkSky}/${park.latitude},${park.longitude}`)
            .then(results => results.json())
            .then(weatherForPark => {
                console.log("Weather for each park", weatherForPark)
                if(park.visited === true) {  
                    const parkHTML = `
                    <article class="visited">
                    <h3>${park.name}</h3>
                    <p>${park.state}</p>
                    <p>Weather:</p>
                    <li>Currently:${weatherForPark.currently.summary}</li>
                    <li>Rest of the Day:${weatherForPark.hourly.summary}</li>
                    <li>For the Week:${weatherForPark.daily.summary}</li>
                    </article>`;
        
                    parksContainer.innerHTML += parkHTML
                    }
                else {
                    const parkHTML = `
                    <article class="not_visited">
                    <h3>${park.name}</h3>
                    <p>${park.state}</p>
                    <p>Weather:</p>
                    <li>Currently:${weatherForPark.currently.summary}</li>
                    <li>Rest of the Day:${weatherForPark.hourly.summary}</li>
                    <li>For the Week:${weatherForPark.daily.summary}</li>
                    </article>`;
                    parksContainer.innerHTML += parkHTML
                    }
                })
            })
    });
