const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to service');
            console.log(error);
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to locate address');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};

var getTemperature = (location, callback) => {
    var locationData = `${location.latitude},${location.longitude}`;
    console.log(locationData);
    request({
        uri: `https://api.darksky.net/forecast/17b8c29d4630dbe505a5ead0f95590c0/${locationData}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.body.status === 200) {
            callback(undefined, {
                temperature: body.currently.temperature
            })

        } else (response.body.status === 200)
        {
            console.log('Unable to fetch weather');
        }


    })
}


module.exports.geocodeAddress = geocodeAddress;
module.exports.getTempterature = getTemperature;
