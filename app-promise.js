const axios = require('axios');
const yargs = require('yargs');

const argv =  yargs.option({
    address: {
        demand: true,
        alias: 'a',
        describe: 'address to fetch weather for',
        string: true,
        default: '3167 Whiteleaf Ct'
    }
}).help().alias('help', 'h').argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/e43a502fb234c18a9908974313994e13/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl).then((response) => {
        var temperature = response.data.currently.temperature;
        var actualTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}, but it feels like ${actualTemperature}`)
    })
}).catch((e) => {
    if(e === 'ENOTFOUND') {
        console.log('Unable to connect to the server');
    } else {
        console.log(e.message);
    }
});