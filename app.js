//Elements
const iconElement= document.querySelector('.weather-icon')
const tempElement= document.querySelector('.temperature-value p')
const descElement= document.querySelector('.temperature-description')
const locationElement= document.querySelector('.location p')
const notificationElement= document.querySelector('.notification')

//data
const weather={};
weather.temperature={
    unit: 'celsius'
};

//Variables
const KELVIN= 273

//API KEY
const key='96f6ba150dbfde1782395bffef95d6a2'

//Checking to see if browser supports Geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}else{
    notificationElement.style.display='block'
    notificationElement.innerHTML=`<p> Browser does not support Geolocalization`;
}

//Set User Position
function setPosition(position){
    let latitude=position.coords.latitude
    let longitude=position.coords.longitude
    getWeather(latitude,longitude)
}

//Shows error when there is a problem with geolocalization
function showError(error){
    notificationElement.style.display='block'
    notificationElement.innerHTML=`<p> ${error.message}`
}

//Get weather from API 
function getWeather(latitude, longitude){
    let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

    fetch(api).then((response)=>{
        console.log(api)
        let data=response.json()
        return data
    }).then((data) =>{
        weather.temperature.value= Math.floor(data.main.temp - KELVIN)
        weather.description= data.weather[0].description
        weather.iconId=data.weather[0].icon
        weather.city=data.name
        weather.country=data.sys.country
    }).then(() => displayWeather())
}

//Displays Weather to interface
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`
    descElement.innerHTML = weather.description
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}
