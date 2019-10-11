const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcryptjs = require('bcryptjs')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const entryUpdate = require('./controllers/entryUpdate')

<<<<<<< HEAD
const app = express()
app.use(bodyParser.json())
app.use(cors())
=======
const server = express()
server.use(bodyParser.json())
// server.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "https://recognizing-face.herokuapp.com/");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
server.use(cors())
>>>>>>> 16213bdc7f480002353b8fa7d5d880c6bb35de7e

const dbaseSql = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'ari',
        password: 'ari123',
        database: 'face_recognition'
    }
})

app.get('/', (req, res) => { res.send('The get request is received successfully') })

app.get('/profile/:id', (req, res) => { profile.profileGet(req, res, bcryptjs, dbaseSql) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, bcryptjs, dbaseSql) })

app.post('/register', (req, res) => { register.handleRegister(req, res, bcryptjs, dbaseSql) })

app.post('/imageurl', (req, res) => { entryUpdate.clarifaiApiCall(req, res) })

app.put('/image', (req, res) => { entryUpdate.image(req, res, dbaseSql) })

app.get('/getentries/:id', (req, res) => { entryUpdate.getEntries(req, res, dbaseSql) })

//app.listen(process.env.PORT || 3100, () => {
app.listen(3100, () => {
    console.log('app is running on port 3100')
})