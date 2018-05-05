const request = require('request');
var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/e43a502fb234c18a9908974313994e13/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to forecast.io server');
        } else if(response.statusCode === 404) {
            callback('Unable to connect to forecast.io server');
        } else if(response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                actualTemperature: body.currently.apparentTemperature
            });
        }    
    });
}

module.exports.getWeather = getWeather;