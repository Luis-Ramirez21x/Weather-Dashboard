var cardContainer = $('#5-day-forecast');
var cityContainer = $('.jumbotron');
var searchedCotainer = $('#search-history');

var searchBtn = $('#search-button');
var userInput = $('#city');
var oneCallUrl;
var city;

var display = $('#test-display');



function storeCityData(){
    city = userInput.val();
    var tempUrl= 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=4e786a5e8e68f6840ef00ecf000f2217'
    var lat;
    var lon;
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
                    console.log(city)
                    displayCityInfo();
                })
        })
  

}
   

function displayCityInfo() {
    console.log(JSON.parse(localStorage.getItem(city)));
    //pulls info from local storage 
    //how can i get each key to display?




    
}

function display5Day() {

}

function saveCity() {

}

searchBtn.click(function(event) {
    event.preventDefault();
})

searchBtn.on('click', storeCityData);
