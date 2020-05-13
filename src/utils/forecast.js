const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9bf9e44c9c50f5c450634e049c80149c&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined) //if service is down it will throw an error
        } else if (response.body.error) {
            callback('Unable to find location', undefined) //if there is something in the .error json
        } else {
            callback(undefined,'The temperature is '+response.body.current.temperature +'F and it feels like ' + response.body.current.feelslike + 'F')
        }
    })
}

module.exports = forecast