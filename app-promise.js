const request = require('request');
const yargs = require('yargs');
const axios = require('axios');
const temp = require('temperature');
const fs = require('fs');

var argv = yargs
    .options({
        a: {
            demand: true,
            description: 'To fetch weather for',
            alias: 'address',
            string: true
        },
        d:{
            description: 'Set default location',
            alias:'default',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var defaultLocation = argv.default;
fs.writeFileSync('./location', defaultLocation);

if(argv.address === defaultLocation){

}

var encodedAddress = encodeURIComponent(argv.address);
console.log(encodedAddress);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
console.log(geocodeUrl);

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address')
    } else if (response.data.status === 'OVER_QUERY_LIMIT') {
        throw new Error('Query over limit');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var long = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/17b8c29d4630dbe505a5ead0f95590c0/${lat},${long}`;
    return axios.get(weatherUrl);
}).then(response => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.apparentTemperature;
    console.log(`Temp for today: ${temp.fahrenheitToCelsius(temperature)}. Feels like ${apparentTemperature}`);
}).catch(e => {
    if (e.code === 'ENOTFOUND') {
        console.log("Unable to connect to API services");
    } else {
        console.log(e.message);
    }
});

