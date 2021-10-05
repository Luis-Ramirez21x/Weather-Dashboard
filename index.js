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
var uvDis = $('.uv-index');

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
                })
        })
}
   
function displayCityInfo() {
    //pulls info from local storage 
    //how can i get each key to display?
    console.log(JSON.parse(localStorage.getItem(city)));
    cityObj=JSON.parse(localStorage.getItem(city));
    console.log(city);
    
    //displaying city weather info on jumbotron
    cityDis.text(city);
    var unixDate = cityObj.daily[0].dt;
    var currentDate = new Date(unixDate * 1000);
    dateDis.text(currentDate.getMonth()+1 +'/'+ currentDate.getDate() + '/' + currentDate.getFullYear());
   //need to create a function to categorize weather icon
   // weatherDis.text(cityObj.current.weather[0].id);
    weatherDis.attr('src',weatherIconURL(cityObj.current.weather[0].icon));
    
    tempDis.text(cityObj.current.temp + '°F');
    humidityDis.text(cityObj.current.humidity + '%');
    windDis.text(cityObj.current.wind_speed + 'mph');
    uvDis.text(cityObj.current.uvi);

}

function weatherIconURL(weatherIdCode){
    var iconCode= weatherIdCode;
    console.log(iconCode);
    var weatherUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
    console.log(weatherUrl);
    return weatherUrl;
}

function display5Day() {
    //forecast weather is in cityObj, just iterate through 5 days in cityObj.daily[i].infoNeeded
    for(i = 1; i < 6; i++){
        dt = cityObj.daily[i].dt;
        date = new Date(dt * 1000);
        
        console.log(dt);
        console.log(date);
        console.log();
        //console.log(dt.getMonth());
        //creating card elements
        var divCardParent = $('<div>');
        var cardBodyEl = $('<div>');
        var dateEl = $('<h5>');
        var listContainer = $('<ul>');
        var weatherLi = $('<img>');
        var tempLi = $('<li>');
        var windLi = $('<li>');
        var humidityLi = $('<li>');
        //adding bootstrap classes to elements
        divCardParent.addClass('card').attr('style', 'width:18rem');
        cardBodyEl.addClass('card-body');
        dateEl.addClass('card-title').text(date.getMonth()+1 +'/'+ date.getDate() + '/' +date.getFullYear());
        listContainer.addClass('list-group list-group-flush');
        weatherLi.addClass('list-group-item').attr('src', 'http://openweathermap.org/img/wn/' + cityObj.daily[i].weather[0].icon + '@2x.png');
        tempLi.addClass('list-group-item').text(cityObj.daily[i].temp.day + '°F');
        windLi.addClass('list-group-item').text(cityObj.daily[i].wind_speed + 'mph');
        humidityLi.addClass('list-group-item').text(cityObj.daily[i].humidity + '%');
        //appending elements to display card
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

function saveCity() {

}

searchBtn.click(function(event) {
    event.preventDefault();
})

searchBtn.on('click', storeCityData);
