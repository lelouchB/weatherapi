const appKey =`a1f7ea8448334671b40c520de62e11b1`;

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
let des=document.getElementById("des");
let minTemp;
let maxTemp;
let temp;
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
    if (event.key === "Enter") {
        findWeatherDetails();
    }
}

function findWeatherDetails() {
    if (searchInput.value === "") {

    } else {
        let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
        httpRequestAsync(searchLink, theResponse);
    }
}

function theResponse(response) {
    let jsonObject = JSON.parse(response);
    console.log(jsonObject)
    cityName.innerHTML = jsonObject.name+","+jsonObject.sys.country;
    des.innerHTML=jsonObject.weather[0].main;
    temperature.innerHTML = "Tempertaure: " + parseInt(jsonObject.main.temp - 273) + "°" + "C";
    humidity.innerHTML = "Humidity: " + jsonObject.main.humidity + "%";
    icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    temp= parseInt(jsonObject.main.temp - 273);
    
    changeContainerBgColor(temp,minTemp,maxTemp)


    minTemp= parseInt(jsonObject.main.temp_min - 273);
    maxTemp= parseInt(jsonObject.main.temp_max - 273);
    console.log(minTemp,maxTemp,temp)
}

function httpRequestAsync(url, callback) {
    console.log("Response");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}
function changeContainerBgColor(temp,minTemp,maxTemp){
    var color='rgba(244,244,244,0.4)'
   let color0=col(temp)
   let color1=col(minTemp-2)
   let color2=col(maxTemp+2)
   
   
   
   
    function col(temp){
    if(temp > -10 && temp <= 0){
        color='rgba(25,97,214, 0.4)'
      }else if(temp > 1 && temp <= 15){
        color='rgba(244,244,244, 0.4)'
      }else if(temp > 16 && temp <= 25){
        color='rgba(244,204,0, 0.4)'
      }else if(temp > 26){
        color='rgba(216,150,0, 0.4)'
      };
    return color;
    }

    console.log(color0,color1,color2)
    document.body.style.backgroundImage= "-webkit-linear-gradient("+ color1 +" , "+ color0 +","+color2+")";
    document.body.style.backgroundSize='cover'
  }