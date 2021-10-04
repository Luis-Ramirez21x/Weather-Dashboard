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
    var tempUrl= 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=4e786a5e8e68f6840ef00ecf000f2217'
    
    fetch(tempUrl)
        .then(function(response){
            return response.json();
        })
        .then(function (data){
            lat = data.coord.lat;
            lon = data.coord.lon;

            oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=4e786a5e8e68f6840ef00ecf000f2217';
            
            fetch(oneCallUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function (data){
                    console.log(data);
                    console.log(data.current.weather.id);
                    console.log(data.current.humidity);
                    console.log(data.current.uvi);
                    localStorage.setItem(city, JSON.stringify(data));
                    
                    console.log(city);
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
    dateDis.text('10/10/10');
    weatherDis.text(cityObj.current.weather.id);
    console.log(cityObj.current.weather.id);
    tempDis.text(cityObj.current.temp);
    humidityDis.text(cityObj.current.humidity);
    windDis.text(cityObj.current.wind_speed);
    uvDis.text(cityObj.current.uvi);

}

function display5Day() {
    //forecast weather is in cityObj, just iterate through 5 days in cityObj.daily[i].infoNeeded
    for(i = 1; i < 6; i++){
        dt = cityObj.daily[i].dt;
        
        console.log(dt);
        //creating card elements
        var divCardParent = $('<div>');
        var cardBodyEl = $('<div>');
        var dateEl = $('<h5>');
        var listContainer = $('<ul>');
        var weatherLi = $('<li>');
        var tempLi = $('<li>');
        var windLi = $('<li>');
        var humidityLi = $('<li>');
        //adding bootstrap classes to elements
        divCardParent.addClass('card').attr('style', 'width:18rem');
        cardBodyEl.addClass('card-body');
        dateEl.addClass('card-title').text(dt);
        listContainer.addClass('list-group list-group-flush');
        weatherLi.addClass('list-group-item').text(cityObj.daily[i].id);
        tempLi.addClass('list-group-item').text(cityObj.daily[i].temp.day);
        windLi.addClass('list-group-item').text(cityObj.daily[i].wind_speed);
        humidityLi.addClass('list-group-item').text(cityObj.daily[i].humidity);
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
