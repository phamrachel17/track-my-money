const express = require('express')  // import express
const cors = require('cors')        // import cors
const {db} = require('./db/db')     // import db.js
const {readdirSync} = require('fs') // imporrt from fs module
const app = express()               // create app using express 
require('dotenv').config()      // so we can use our PORT env variable

const PORT = process.env.PORT

// MIDDLEWARES
app.use(express.json())     // we want our data to be in JSON
/*
Any incoming requests to your Express.js application will have CORS headers added, 
allowing cross-origin requests to be processed properly. This is especially useful 
when you're building APIs that need to be accessed from different domains or origins.
*/
app.use(cors())      

// app.get('/', (req, res)=> {
//     res.send('Hello Homepage')
// })

// ROUTES
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {        
        console.log('You are listening to port:', PORT)
    })
}

server()