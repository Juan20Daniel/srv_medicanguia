const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'images')));

app.use('/api', require('./src/routes/routes'));

app.listen(port, () => {
    console.log("The server is ronning on the port: ",port);
})