const express = require('express');
const helmet = require('helmet')
const server = express()
const cors = require('cors')
const session = require('express-session')
const knexSessionsStore = require('connect-session-knex')

const dbconfig = require('./data/db-config')
const authRouter = require('./auth/auth-router')
const userRouter = require('./users/users-router')


const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
    name:'unknown',
    resave: false,
    saveUninitialized: false,
    secret: 'this is the secret key, no one knows how about you!',
    cookies: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
    },
    store: new knexSessionsStore({
        knex: dbconfig,
        createtable: true,
    })    
}))

server.use('/auth', authRouter)
server.use('/users', userRouter)



server.use((err, req, res, next) => {
    console.log('Error:', err)

    res.status(500).json({
        message: 'Uh-Oh something is broken!'
    })
})

server.listen(port, () => console.log(`Server is listening at port: ${port}`))