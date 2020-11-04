//user package
const geoCodePkg = require('./utils/geoCode');
const forecastPkg = require('./utils/forecast');
//core
const path = require('path');
//npm
const express = require('express');
const hbs = require('hbs');
const { query } = require('express');

//Define paths for express config
const indexPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
//set-up handle bars engine and views location

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(indexPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'This is the Main page',
        name : 'Siddharth'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name : 'Siddharth'
    });
})

app.get('/help', (req, res) => {
    res.render('help' , {
        title : 'This is the help page',
        name : 'Siddharth'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error : 'Address must be provided'
        })
    }else{
        geoCodePkg.geoCode(req.query.address, (error, geocodeData) => {
            if(error){
                res.send({"error": "Couldn't fetch geo location"});
            }else{
                forecastPkg.forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
                    if(error){
                        res.send({"error": "Couldn't fetch weather"});
                    }else{
                        res.send({
                            "location": req.query.address,
                            "api_location": geocodeData.location,
                            "forecast": forecastData
                        });
                        
                    }
                })
            }
        })
        
    }
})


app.get('*', (req,res) => {
    res.render('404', {
        title : '404: page not found',
        name : 'Siddharth Mehta'
    })
})

app.listen(3000, () => {
    console.log('Server is up on post 3000');
});
