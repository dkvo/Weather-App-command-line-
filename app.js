const yargs = require('yargs');
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather');

const argv =  yargs.option({
    address: {
        demand: true,
        alias: 'a',
        describe: 'address to fetch weather for',
        string: true
    }
}).help().alias('help', 'h').argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
    }
    else  {
        console.log(results.address)
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if(errorMessage) {
                console.log(errorMessage);
            }
            else 
                console.log(`it's currently ${weatherResults.temperature} but it feels like ${weatherResults.actualTemperature}`);
        });
    }
});


