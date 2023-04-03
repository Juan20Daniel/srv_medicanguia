const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const path = require('path');

var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'images')));
app.use(cors());

app.use('/api', require('./src/routes/routes'));

app.listen(port, () => {
    console.log("The server is ronning on the port: ",port);
})