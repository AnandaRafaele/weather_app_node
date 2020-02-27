//Core modules (before npm modules)
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//NPM modules
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const app = express()
const port = process.env.PORT || 3001

// Define paths for Express config
const public_directory_path = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(public_directory_path))

//
app.get('', (req, res) => {
    /**
     * res.render()
     * Allow us to render one of our views
     * The first argument is the name of the view to render
     * And the second is is an object which contains all of the values you want that view to be able to access
     */
    res.render('index', {
        title: 'Weather',
        name: 'Ananda Rafaele'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ananda Rafaele'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'How can I help you?',
        name: 'Ananda Rafaele'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.json({ error: 'You must provide and address' })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.json({ error })
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.json({ error })
            }
            res.json({
                location,
                forecast,
                address
            })
        })

    })
})

app.get('/products', (req, res) => {
    res.json({
        location: req.query.location,
        forecast: req.query.forecast,
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})