const express=require('express');
const app = express();

const morgan = require ('morgan')

app.set('puerto' , 2024);

app.use(morgan('dev'))

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(require('./routes/routes'))
app.use(require('./routes/routescaballos'))
app.use(require('./routes/routescarreras'))
app.use(require('./routes/routescuidador'))
app.use(require('./routes/routesjockey'))
app.use(require('./routes/routeslocalidad'))
app.use(require('./routes/routesUsuarios'))

app.listen(app.get('puerto'), ()=>{
    console.log('El servidor esta corriendo en el puerto', app.get('puerto'))
})

