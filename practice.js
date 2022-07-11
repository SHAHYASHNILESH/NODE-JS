const express=require('express');
const app=express();
app.listen(3000);

// app.get('/', function (req, res) {
//     res.send('<h1>Hello World</h1>')
//   });

app.get('/', function (req, res) {
    res.sendFile('C:/Users/YASH SHAH/OneDrive/NODE-JS/views/index.html');
  });

app.get('/about', function (req, res) {
    res.sendFile('./views/about.html',{root:__dirname});
  });

//redirects
app.get('/about-us', function (req, res) {
    res.redirect('./views/about.html');
  });

//404 page
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root:__dirname})
});

