const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const path = require('path');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'images')));
app.use(cors());

app.use('/api', require('./src/routes/routes'));

app.listen(port, () => {
    console.log("The server is ronning on the port: ",port);
})