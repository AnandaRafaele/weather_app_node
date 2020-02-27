const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5hbmRhcmFmYWVsZSIsImEiOiJjazZza2NseDUwaHFyM21ycm5mNjBkNTEyIn0.AMLPSgi_bWh4YcKf6ge8gg&limit=1&language=pt`

    request({ url, json: true }, (error, { body }) => {
        const { features } = body
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (features.length === 0) {
            callback("Unable to find location! Try another search.", undefined)
        } else {
            const longitude = features[0].center[0]
            const latitude = features[0].center[1]
            const location = features[0].place_name

            callback(undefined, { longitude, latitude, location })
        }
    })
}

module.exports = geocode