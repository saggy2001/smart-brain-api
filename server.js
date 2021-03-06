const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');
const register = require('./controler/register');
const signin = require('./controler/signin');
const profile = require('./controler/profile');
const image = require('./controler/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  // db.select('*').from('users')
  // .then(user => {
  //   res.json(user)
  // })
  res.json('Its working')
})

app.get('/profile/:id', (req, res) => {profile.handleProfileGET(req, res, db)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageURL',(req, res) => {image.hangleImageApi(req, res)})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`);
});


/*
/ --> res = this is working
/signIn --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user


*/