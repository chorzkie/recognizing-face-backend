const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcryptjs = require('bcryptjs')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const entryUpdate = require('./controllers/entryUpdate')

const server = express()
server.use(bodyParser.json())
//server.use(cors())

const dbaseSql = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
})

server.get('/', (req, res) => { res.send('The get request is received successfully') })

server.get('/profile/:id', (req, res) => { profile.profileGet(req, res, bcryptjs, dbaseSql) })

server.post('/signin', (req, res) => { signin.handleSignin(req, res, bcryptjs, dbaseSql) })

server.post('/register', (req, res) => { register.handleRegister(req, res, bcryptjs, dbaseSql) })

server.post('/imageurl', (req, res) => { entryUpdate.clarifaiApiCall(req, res) })

server.put('/image', (req, res) => { entryUpdate.image(req, res, dbaseSql) })

server.get('/getentries/:id', (req, res) => { entryUpdate.getEntries(req, res, dbaseSql) })

server.listen(process.env.PORT || 3100, () => {
//server.listen(3100, () => {
    console.log('Server is running on port 3100')
})