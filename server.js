const express = require('express')
const cors = require('cors')
const port = 5000 || process.env.PORT

const app = express()


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello, World!',
    })
})

app.all('*', (err, req, res, next) => {
    err.statusCode = 404,
    err.message = 'Not Found',
    next(err)
})

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode | 500
    err.message = err.message || 'Internal server error!'
    res.status(err.statusCode).json({
        success: false,
        statusCode: err.statusCode,
        message: err.message,
        data: null
    })
})

app.listen(port, (err) => {
    if(err){
        console.log(`server connection fail: ${err.message}`)
        return
    }
    console.log(`server running on http://localhost:${port}`)
})