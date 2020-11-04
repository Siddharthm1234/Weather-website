const request = require('request');

const forecastKey = '687fae89323b4d9babf211159200111'; 


const forecast = (lat, long, callback) => {
    const forecastURL = `https://api.weatherapi.com/v1/current.json?key=${forecastKey}&q=${lat},${long}`;
    
    request({url : forecastURL, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather service!', undefined);
        }else if(response.body.error){
            callback('Unable to find location!', undefined);
        }
        else{
            callback(undefined, `The weather at ${response.body.location.name}, ${response.body.location.country} is ${response.body.current.condition.text}.
The temperature in celcium is ${response.body.current.temp_c}.
The temperature in farenhiet is ${response.body.current.temp_f}.`);
        }  
    })
}

module.exports = {
    forecast : forecast
}
