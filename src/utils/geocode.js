const request = require("postman-request");


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWZvbnlhYXciLCJhIjoiY2t1NWoycjE4MDg2cTJvbzdwZng2aXJ3OCJ9.JSuDe9-5Jrva5t30N7ttWA`
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('error', undefined)
        } else if (response.body.features.length === 0) {
            callback('error in location search', undefined)
        } else {
            callback(null, {
                latitude: response.body.features[0].center[0],
                longtitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode