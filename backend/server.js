require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

const User = require('./routes/users.route')
const Balance = require('./routes/balance.route')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200,
    method: "GET, POST"
}));

mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => console.log('MongoDB Connected')).catch((e) => console.log(e));

app.use('/', User)
app.use('/', Balance)

server.listen(port, () => console.log(`Connected to port ${port}`));
