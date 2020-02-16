const path = require('path')
const express = require('express')
const hbs = require('hbs');
const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');


const app = express()
const port = process.env.PORT || 8080

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname,'../templates/views');
const partialpathDirectory = path.join(__dirname,'../templates/partials');


//Define config for views
app.set('view engine','hbs');
app.set('views',viewsDirectory);
hbs.registerPartials(partialpathDirectory);
app.use(express.static(publicDirectoryPath));

//root directory
app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather App Body',
        name:'Kiran'
    });
}); 


//about routing
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About page',
        reason:'Learning views',
        name:'Kiran'
    });
});

//help routing
app.get('/help',(req,res)=>{
    res.render('help',{
        title:' help page',
        pagename:'This is  a help page',
        name:'Kiran'
    });
});

app.get('/weather', (req, res) => {
    
    var location = req.query.address;
    if(! req.query.address){
        return res.send({
            error:'PLease enter the address'
        })
    }

    geocode(location,(err,{latitude,longitude,location}={})=>{
        if(err){
            return  res.send({
                error:err
            })
        }
         else{
            forecast(latitude,longitude,(err,data)=>{
                if(err){
                    return res.send({
                        error:err
                    })
                }else{
                    data.location=location;
                    console.log(data);
                    res.send(data
                        // summary:data.summary,
                        // temperature : data.temperature,
                        // precipProbabilit:data.precipProbability,
                        // windspeed:data.windspeed,
                        // windgust:data.windgust,
                        // windbearing:data.windbearing,
                        // location

                    //forecast: data,
                    //wind:
                    //location
                    );
                }
                
            });
        }
        
    });
    
});

//handle error

app.get('/help/*',(req,res)=>{
    res.render('error_404',{
        errormessage:'The help data is not found',
        name:'Kirann'});
})


app.get('*',(req,res)=>{
    res.status(404).render('error_404',{
        errormessage:'404, The page is not found',
        name:'Kirann'});
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})