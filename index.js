const express = require('express');
const https = require('https');

const app = express();

const port = process.env.PORT;

const path = "https://api.openweathermap.org/data/2.5/weather?q=ismailia&units=metric&appid=55ae2cfdf62317ff0660600606148f95";

app.get("/",function(req,res){

    https.get(path, function(response){

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const wd = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgicon = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            
            res.write("<p>the weather now is: " +wd+"<p>");  
            res.write("<img src="+imgicon +">");
            res.write("<h1>dragt el 7rara y zeinab : "+temp+ "</h1>");
            res.send();
            
    })
     })   
});



app.listen(port ||3000,function(){
    console.log("server is running")
    });
