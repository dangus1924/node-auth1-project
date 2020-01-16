const express = require('express');
const server = express()
const port = process.env.PORT || 5000

server.get('/', (req, res, next) => {
    res.send('<h1>Hello World</h1>')
})

server.listen(port, () => console.log(`Server is listening at port: ${port}`))