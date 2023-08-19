
/*
    This code sets up the connection to the MongoDB database.
*/

const mongoose = require('mongoose');

const db = async () => {
    try{
        mongoose.set('strictQuery', false)      //By default, Mongoose operates in strict mode, which means that queries and document properties that don't match the schema's structure will throw an error.
        await mongoose.connect(process.env.MONGO_URL)   // attempts to establish a connection to the MongoDB database
        console.log('DB Connected successfully')
    } catch (error) {
        console.log('DB Connection ERROR')
    }
}

module.exports = {db}       // makes it available to other files in the project. In curly brackets b/c exporting a function