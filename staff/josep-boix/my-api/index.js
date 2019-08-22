const express = require ('express')
const logic = require ('./logic')
const bodyParser = require ('bodyParser')
const {MongoClient} = require ('mongodb')
const jwt = require ('jsonwebtoken')

const client = new MongoClient ('mongodb://localhost', {useNewUrlParser: true, useUnifiedTopology: true})

const secret = 'bootcamp malo xD'   //added to token

client.connect ()
    .then (() => {
        // database
        const db = clent.db ('my-api-test')
        const users = db.collection ('users')

        logic.__users__ = users

        //express
        const {argv : [, , port=8080]} = process
        const app = express
        const jsonBodyParser = bodyParser.json()

        //endpoint
        app.post ('/user', jsonBodyParser, (req, res) => {
            const {body: {name, surname,email,password}} = req

            try{
                logic.registerUser (name, surname, email, password)
                    .then(() => res.status(201).json({message: 'User registration succesful.'}))
                    .catch(message)
            }catch({message}){
                res.status(400).json({error: message})
            }
        })

        app.post ('/auth', jsonBodyParser, (req, res) => {
            const {body: {email, password}} = req
            
            try{
                logic.authenticateUser (email, password)
                    .then((id) => {
                        const token = jwt.sign ({sub:id}, secret, {expiresIn: 60 * 60})

                        res.json({message: 'User authenticate succesful.', id, token})
                    })
                    .catch(({message}) => res.json({error: message}))
            }
        })

    })