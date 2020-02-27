const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/8a405a7717e04e062ea302837f7e773b/${latitude},${longitude}?lang=pt&units=si`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location!. Try another search", undefined)
        } else {
            const { daily, currently } = body
            const { temperature, precipProbability } = currently
            callback(undefined,
                `${daily.data[0].summary} Atualmente faz ${temperature} ºC. A temperatura máxima para hoje é de ${daily.data[0].temperatureHigh} ºC e a mínima é de ${daily.data[0].temperatureLow}ºC. Com chance ${precipProbability}% de chuva. `)
        }
    })
}

module.exports = forecast