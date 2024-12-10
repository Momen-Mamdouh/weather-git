"use strict";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const windDirection = {
    ENE:"East-northeast", ESE: "East-southeast", E: "East",
    SSE: "South-southeast", SSW: "South-southwest", SE: "Southeast", SW: "Southwest", S: "South",
    NNE: "North-northeast", NNW: "North-northwest", NE: "Northeast", NW: "Northwest", N: "North",
    WSW: "West-southwest", WNW: "West-northwest", W: "West",
}

let detectedLocation = "Cairo";
let threeDaysForecastData= [];
let currentDayForecastDataObject;

let api = `https://api.weatherapi.com/v1/forecast.json?key=080a2a50a6e546e6bdf21319240912&q=${detectedLocation}&days=3&aqi=yes&alerts=no`;


let locationInput = document.querySelector('.location-search');
let forcastSection = document.querySelector('.forecast-section');


//*========================Event to go contacts html=====================> 
    document.querySelector('.contact').addEventListener("click", ()=>{
        location.href = "./contacts.html"
    })
//*========================Event to go contacts html=====================> 
    

//*========================Fn to get any inputValue=====================> 
function gettingInputValue(input){
    // Function that reurn any defined input Value
    return input.value;
}
//*========================Fn to get any inputValue=====================> 


//*========================Fn Getting the currentDate=====================> 
function todayDate(updatedDate){
    // Fn to get the current Date depends on Date Object
    const todayDateValue = updatedDate;
    const dateValue = new Date(todayDateValue);
    return `${dateValue.getDate()} ${months[dateValue.getMonth()]}`;
}
//*========================Fn Getting the currentDate==================== > 


// !=========================Start gettingForcastData==============================>

async function gettingResponse(){
        // **Asyncrouns Function Used to get Json Response from Api 
        let respone = await fetch(api);
        return await respone.json();
};
 
function gettingForcastData(forcastArray,currentForecastData){
    // **Function Used to get Data From Api of 3-Days and current Day 
    for( let i = 0; i < forcastArray.length; i++){
            let forecastObjectData = {
                    dayDate: todayDate(forcastArray[i].date),
                    dayInWeek: days[new Date(forcastArray[i].date).getDay()],
                    dayTemperature: forcastArray[i].day.avgtemp_c,
                    dayWeatherConditionText: forcastArray[i].day.condition.text,
                    dayWeatherConditionIcon: forcastArray[i].day.condition.icon,
            };
            threeDaysForecastData.push(forecastObjectData);

    }
    currentDayForecastDataObject = {
        currentWindSpeed: currentForecastData.wind_kph,
        currentWindDirection: currentForecastData.wind_dir,
        currentHeatIndex:currentForecastData.heatindex_c,
        currentLocation : detectedLocation,
    };
}

// !=========================Start displayForecastData==============================>  
function displayForecastData(){
    // **Function To display forecast data in HTML. 
    (async () => {
        let responeData = await gettingResponse();
        gettingForcastData(responeData.forecast.forecastday, responeData.current);

        forcastSection.innerHTML = `
        <div class="container w-75">
          <div class="forecast-table row  m-auto ">
                <div class="forecast-day  col-md-4 rounded-3">
                    <div class="row ">

                          <div class="col-sm-12 forecast-header">
                            <h6 class="d-flex justify-content-between"><span class="day-in-week">${threeDaysForecastData[0].dayInWeek}</span> 
                              <span class="day-in-month">${threeDaysForecastData[0].dayDate}</span></h6>
                          </div>

                          <div class="col-sm-12 forecast-content">

                              <div class="location text-start pt-3 px-2">
                                <h5>${detectedLocation}</h5>
                              </div>

                              <div class="degree">

                                  <div class="degree-num pb-2">
                                    <h2>${threeDaysForecastData[0].dayTemperature}
                                      <sup>o</sup>
                                      C
                                    </h2>
                                  </div>

                                  <div class="degree-image pb-2">
                                      <img src=${threeDaysForecastData[0].dayWeatherConditionIcon} alt="">
                                  </div>

                                  <div class="weather-state pb-2">
                                    <h6 >${threeDaysForecastData[0].dayWeatherConditionText}</h6>
                                  </div>
                              </div>

                              <div class="weather-data pb-4">

                                <span class="umberlla">
                                  <img src="./Images/icon-umberell.png" alt="" >
                                  ${currentDayForecastDataObject.currentHeatIndex}%
                                </span>

                                <span class="wind">
                                  <img src="./Images/icon-wind.png" alt="">
                                  ${currentDayForecastDataObject.currentWindSpeed} km/h
                                </span>

                                <span class="wind-direaction">
                                  <img src="./Images/icon-compass.png" alt="">
                                  ${windDirection[currentDayForecastDataObject.currentWindDirection]}
                                </span>

                              </div>
                          </div>

                    </div>
                </div>

               <div class="forecast-day col-md-4 rounded-3">
                    <div class="row">

                          <div class="col-sm-12 forecast-header">
                            <h5 class=" text-center "><span class="day-in-week">${threeDaysForecastData[1].dayInWeek}</span> </h5>
                          </div>

                          <div class="col-sm-12  forecast-content pt-5">


                              <div class="degree d-flex align-items-center justify-content-center flex-column">

                                <div class="degree-image pb-2">
                                  <img src=${threeDaysForecastData[1].dayWeatherConditionIcon} alt="">
                                </div>

                                  <div class="degree-num fs-5 pb-2">
                                    <h2>${threeDaysForecastData[1].dayTemperature}
                                      <sup>o</sup>
                                      C
                                    </h2>
                                  </div>

                                  <div class="weather-state pb-2">
                                    <h6 >${threeDaysForecastData[1].dayWeatherConditionText}</h6>
                                  </div>

                              </div>

     
                          </div>
                          
                    </div>

                </div>

                <div class="forecast-day col-md-4   rounded-3 ">

                    <div class="row">

                      <div class="col-sm-12 forecast-header">
                        <h5 class=" text-center "><span class="day-in-week">${threeDaysForecastData[2].dayInWeek}</span></h5> 
                      </div>

                      <div class="col-sm-12  forecast-content pt-5">


                          <div class="degree d-flex align-items-center justify-content-center flex-column">

                            <div class="degree-image pb-2">
                              <img src=${threeDaysForecastData[2].dayWeatherConditionIcon} alt="">
                            </div>

                              <div class="degree-num fs-5 pb-2">
                                <h2>${threeDaysForecastData[2].dayTemperature}
                                  <sup>o</sup>
                                  C
                                </h2>
                              </div>

                              <div class="weather-state pb-2">
                                <h6 >${threeDaysForecastData[2].dayWeatherConditionText}</h6>
                              </div>

                          </div>


                      </div>
                      
                    </div>

                </div> 

            </div>

        </div>
        `
      })()
}

displayForecastData();

function clearForecastData(){
    // ** Function to clear old data.
    currentDayForecastDataObject = {};
    threeDaysForecastData = [];
}

locationInput.addEventListener('change', (e)=>{
    //** To detect any change in search input and give the new value
     let searchInputValue = gettingInputValue(e.target);  
     api = `https://api.weatherapi.com/v1/forecast.json?key=080a2a50a6e546e6bdf21319240912&q=${searchInputValue}&days=3&aqi=yes&alerts=no`; 
     clearForecastData();
     detectedLocation = searchInputValue;
     displayForecastData();   
})
// !=========================End displayForecastData==============================>  


//*========================Fn Getting subsribeInput data==================== > 
let subscribedEmails = [];
let subsribeInput = document.querySelector('.subscribe-input');
function saveSubsribedEmail(){
    if(subsribeInput.value != ""){
        subscribedEmails.push(subsribeInput.value);
        localStorage.setItem("Subscribded Emails", JSON.stringify(subscribedEmails))
        subsribeInput.value = "";
        
    }
    else{
        alert("Please type vaild Email")
    }
}

document.querySelector('.subscribe-btn').addEventListener("click", ()=>{
    saveSubsribedEmail()
})
//*========================Fn Getting subsribeInput data==================== > 
