const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9fa5a99f6f7786ed0c8047037906fc55&query=${latitude},${longitude}`
    request({url: url, json: true}, (error, response) => {
        if (error) {
            console.log(error)
        } else {
            callback(null, 'The current temp is: ' +response.body.current.temperature)
        }
    })
}

module.exports = forecast