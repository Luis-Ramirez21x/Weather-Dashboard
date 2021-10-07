var cardContainer = $('#5-day-forecast');
var cityContainer = $('.jumbotron');
var searchedCotainer = $('#search-history');

var searchBtn = $('#search-button');
var userInput = $('#city');
var oneCallUrl;
var lat;
var lon;
var city;
var dt;
var cityObj = [];
var dtConverted;

//jumbotron display variables
var cityDis = $('.city');
var dateDis = $('.date');
var weatherDis = $('.weather-icon');
var tempDis = $('.temp');
var humidityDis = $('.humidity');
var windDis = $('.wind-speed');
var uvDis = $('#uv-index');

function storeCityData(){
    city = userInput.val();
    var tempUrl= 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=4e786a5e8e68f6840ef00ecf000f2217';
    
    fetch(tempUrl)
        .then(function(response){
            return response.json();
        })
        .then(function (data){
            lat = data.coord.lat;
            lon = data.coord.lon;

            oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=4e786a5e8e68f6840ef00ecf000f2217';
            
            fetch(oneCallUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function (data){
                    console.log(data);
                    localStorage.setItem(city, JSON.stringify(data));
                    displayCityInfo();
                    display5Day();
                    //displayCityButton();
                })
        })
}
   
function displayCityInfo() {
    //pulls info from local storage 
    //how can i get each key to display?
    console.log(JSON.parse(localStorage.getItem(city)));
    cityObj=JSON.parse(localStorage.getItem(city));
    //console.log(city);
    
    //displaying city weather info on jumbotron
    cityDis.text(city);
    var unixDate = cityObj.daily[0].dt;
    var currentDate = new Date(unixDate * 1000);
    dateDis.text(currentDate.getMonth()+1 +'/'+ currentDate.getDate() + '/' + currentDate.getFullYear());
    //need to create a function to categorize weather icon
    // weatherDis.text(cityObj.current.weather[0].id);
    weatherDis.attr('src',weatherIconURL(cityObj.current.weather[0].icon));
    //
    tempDis.text('Temp: ' + cityObj.current.temp + '°F');
    humidityDis.text('Humidity: ' + cityObj.current.humidity + '%');
    windDis.text('Wind Speed: ' + cityObj.current.wind_speed + 'mph');
    var uvi = cityObj.current.uvi;
    if(uvi < 3){
        uvDis.attr('style', 'background-color:green');
    }else if(uvi > 2 && uvi < 8 ){
        uvDis.attr('style', 'background-color:orange');
    }else {
        uvDis.attr('style', 'background-color:red');
    }
    uvDis.text('UV: ' + cityObj.current.uvi);
    console.log(cityObj.current.uvi);
}

function weatherIconURL(weatherIdCode){
    var iconCode= weatherIdCode;
    //console.log(iconCode);
    var weatherUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
    //console.log(weatherUrl);
    return weatherUrl;
}

function display5Day() {
    $("#5-day-forecast").html("");
    var h1El = $('<h1>');
    h1El.text('5 Day Forecast');
    cardContainer.append(h1El);
    //forecast weather is in cityObj, just iterate through 5 days in cityObj.daily[i].infoNeeded
    for(i = 1; i < 6; i++){
        dt = cityObj.daily[i].dt;
        date = new Date(dt * 1000);
        //var h1El = $('<h1>');
        var divCardParent = $('<div>');
        var cardBodyEl = $('<div>');
        var dateEl = $('<h5>');
        var listContainer = $('<ul>');
        var weatherLi = $('<img>');
        var tempLi = $('<li>');
        var windLi = $('<li>');
        var humidityLi = $('<li>');
        //adding bootstrap classes to elements
        //h1El.text('5 Day Forecast');
        divCardParent.addClass('card').attr('style', 'width:18rem');
        cardBodyEl.addClass('card-body');
        dateEl.addClass('card-title').text(date.getMonth()+1 +'/'+ date.getDate() + '/' +date.getFullYear());
        listContainer.addClass('list-group list-group-flush');
        weatherLi.addClass('list-group-item').attr('src', 'http://openweathermap.org/img/wn/' + cityObj.daily[i].weather[0].icon + '@2x.png');
        tempLi.addClass('list-group-item').text('Temp: ' + cityObj.daily[i].temp.day + '°F');
        windLi.addClass('list-group-item').text('Wind Speed: ' + cityObj.daily[i].wind_speed + 'mph');
        humidityLi.addClass('list-group-item').text("Humidity: " + cityObj.daily[i].humidity + '%');
        //appending elements to display card
        //cardContainer.append(h1El);
        cardContainer.append(divCardParent);
        divCardParent.append(cardBodyEl);
        cardBodyEl.append(dateEl);
        divCardParent.append(listContainer);
        listContainer.append(weatherLi);
        listContainer.append(tempLi);
        listContainer.append(windLi);
        listContainer.append(humidityLi);
    }
}

function displayCityButton() {
    var buttonEl = $('<button>');
    ///create on click function for city name set to userinput in search box so that button does not repeat
    buttonEl.attr('type', 'button').attr('id', city).addClass("btn btn-primary btn-sm").text(city);
    cityContainer.append(buttonEl);
}

searchBtn.click(function(event) {
    event.preventDefault();
})

searchBtn.on('click', storeCityData);
searchBtn.on('click', displayCityButton);
cityContainer.on('click', function(event){
    event.preventDefault();
    var element = event.target;
    userInput.val(element.getAttribute("id"));
    //console.log(element);
    //console.log(city);
    storeCityData();
})

