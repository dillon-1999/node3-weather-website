const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYm9hdG1hbmRpbGxvbiIsImEiOiJja2E0YnFibnUwMXRyM2dwMmwxYzc0cHo4In0.HUqoRFYY6GOBxRziRS4qpw&limit=1'
    //requesting a url, specifying it, and requesting it to be parsed in json
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined) //if no location was found
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }) // error is undefined because there wasnt one in this case
        }
    })
}

module.exports = geocode