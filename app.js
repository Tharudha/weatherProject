const express = require ("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  const query = "req.body.CityName";
  const apiKey = "2bcb104eac7f96e4d73ff4956cc2dc35";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +",uk&APPID= "+ apiKey +"";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<image src=" + imageURL +">");
      res.write("<p>The weather is currently "+ weatherDescription +" <p>");
      res.write("<h1>The temperature in london is "+ temp +" degree celcius </h1>");
      res.send()
    })
  })
})




app.listen(3000, function(){
  console.log("Server running port 3000")

})
