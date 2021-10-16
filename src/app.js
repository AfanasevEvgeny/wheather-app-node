const path = require('path')
const hbs = require('hbs')
const express = require('express')
const forecast = require('../src/utils/forecast')
const geocode = require('../src/utils/geocode')
const app = express()

/* Define paths for Express config */
const publicDirPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

/* Set handlebars and views location */
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


/* Setup static dir to serve */

app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Evgeny'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me:'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'help page'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'No address provided'})
    }
    geocode(req.query.address, (error, geocode) => {
        if (error) {
            res.send({error: 'error occurred'})
        } else {
            const {latitude, longitude} = geocode
            forecast(latitude, longitude, (error, weatherData) => {
                if (error) {
                    res.send({error: 'error occurred'})
                } else {
                    res.send({forecast: weatherData, location: req.query.address})
                }
            })
        }
    })
})


app.get('/help/*', (req, res) => {
    res.send('help article not found 404((((')
})

app.get('*', (req, res) => {
    res.render('404', {})
})

app.listen(3000, () => {
    console.log('server is up!')
})