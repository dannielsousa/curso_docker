const express = require('express');
const restful = require('node-restful');
const server = express();
const mongoose = restful.mongoose;
const bodyParser = require('body-parser');
const cors = require('cors');

//Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/mydb');

// MIDDLEWARES
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(cors());

// ODM
const Client = restful.model('Client', {
    name: { type: String, require: true }
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({ new: true, runValidators: true })

//Routes
Client.register(server, '/clients')

//iniciar
server.listen(3000);
