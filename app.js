const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weatherCode = require('./weather/weather.js');
var argv = yargs
    .options({
        a: {
            demand: true,
            description: 'To fetch weather for',
            alias: 'address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weatherCode.getTempterature(results.latitude, results.longitude, (errorMessage, results) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It is currently ${results.temperature}. It is feels like ${results.apparentTemperature}.`)
            }
        });
    }
});


// var address = encodeURIComponent(argv.a);
//
// request({
//     url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
//     json: true
// }, (error, response, body) => {
//     if (error) {
//         console.log('Unable to connect to service');
//         console.log(error);
//     } else if (body.status === 'ZERO_RESULTS') {
//         console.log('Unable to locate address');
//     } else if (body.status === 'OK') {
//         console.log(body.results[0].formatted_address);
//         console.log(body.results[0].geometry.location.lat);
//         console.log(body.results[0].geometry.location.lng);
//     }
// });
