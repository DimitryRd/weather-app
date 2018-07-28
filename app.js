const request = require('request');
const yargs = require('yargs');
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

var address = encodeURIComponent(argv.a);

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
}, (error, response, body) => {
    try {
        console.log(body.results[0].formatted_address);
        console.log(body.results[0].geometry.location.lat);
        console.log(body.results[0].geometry.location.lng);
    } catch (error) {
        console.log(error.name);
    }
});
