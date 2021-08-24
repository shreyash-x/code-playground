require('dotenv').config({ path: '.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();
const pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: process.env.CLUSTER,
    useTLS: true,
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello World")
})
app.post('/update-editor', (req, res) => {
    pusher.trigger('editor', 'text-update', {
        ...req.body,
    });

    res.status(200).send('OK');
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});