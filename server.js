const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next) => {

    let nau = new Date().toString();

    let log = `${nau} ${req.method} ${req.path}`;

    console.log(log);

    fs.appendFile('server.log',log + '\n', (err) =>{
       if(err){
           console.log(err);
       }

    });

    next();
});

// app.use((req,res,next) => {
//    res.render('maintenence');
// });

app.get('/', (req, res) => {
   res.render('home.hbs', {
      pageTitle: 'Home Page',
       welcome: 'Witam na mojej stronce'
   });
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page'
   });
});



app.listen(port, () => {
   console.log(`Server is up on port ${port} ...`);
});

