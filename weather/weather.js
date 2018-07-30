const request = require('request');


var getWeather = (long,lat, callback) => {
    //var locationData = `${result.latitude},${result.longitude}`;
    request({
        uri: `https://api.darksky.net/forecast/17b8c29d4630dbe505a5ead0f95590c0/${long},${lat}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        } else  {
            callback('Unable to fetch weather');
        }
    })
}


module.exports.getTempterature = getWeather;
