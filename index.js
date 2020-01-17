const express = require('express');
const helmet = require('helmet')
const server = express()
const cors = require('cors')
const authRouter = require('./auth/auth-router')
const userRouter = require('./users/users-router')

const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/auth', authRouter)
server.use('/users', userRouter)

// server.get('/', (req, res, next) => {
//     res.send('<h1>User Database</h1>')
// })

server.use((err, req, res, next) => {
    console.log('Error:', err)

    res.status(500).json({
        message: 'Uh-Oh something is broken!'
    })
})

server.listen(port, () => console.log(`Server is listening at port: ${port}`))