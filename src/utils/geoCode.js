const request = require('request');

const geoCodeKey = 'pk.eyJ1Ijoic2lkZGhhcnRobWVodGExMjM0IiwiYSI6ImNraDBhdHQ0cjA4ajUzMG8zNmpodmJ6cnYifQ.ZjsVLCMT4Y6hS3b4mchbrw';

const geoCode = (address, callback) => {
    const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${geoCodeKey}&limit=1`;

    request({url : geoCodeURL, json:true}, (error, response) =>{
        if(error){
            callback('Unable to connect to location services!', undefined);
        }
        else if(response.body.message || response.body.features.length === 0){
            callback('Unable to find location! Try another location.', undefined);
        }
        else{
            const geoLocation = {
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name 
            }
            callback(undefined, geoLocation);
        }
    })
}

module.exports = {
    geoCode : geoCode
}