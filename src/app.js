const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express configuration
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather',
        name: 'Dillon Boatman',
        message: 'weather text'
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About Me',
        name: 'Dillon Boatman',
        message: 'about text'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        message: 'Check documentation',
        name: 'Dillon Boatman'
    })
})
// first param is the route, second is the function
app.get('/weather', (request, response) => {
    if(!request.query.address){
        return response.send({
            error: 'You must provide and address'
    })
    }
                                            // must destructure into a default if the user provides an invalid location
    geocode(request.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return response.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return response.send({ error })
            }
            response.send({
                forecast: forecastData,
                location, 
                address: request.query.address
            })
        })
    })
})

// creating endpoint
app.get('/products', (request, response) =>{
    if (!request.query.search){
        return response.send({
        error: 'You must provide a search term'
        })
    }
    console.log(request.query.search)
    response.send({
        products: []
    })
})

//match anything after the help router
app.get('/help/*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Dillon Boatman',
        message: 'Help Article Not Found'
    })
})

// goes down each route sequentially, so this has to be last
app.get('*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Dillon Boatman',
        message: 'Error 404'
    })
})
//port 3000, callback function
//turning on the web server
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})