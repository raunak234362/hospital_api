//Importing required modules and setting up express server
const express=require("express");
const db=require("./config/mongoose");  // Importing database configuration
const router = require("./routes/routes");
const bodyParser = require("body-parser");
const app=express(); // Creating an Express application
const port=8000;

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(router);

// Start the Express server and listen on the specified port
app.listen(port,(err)=>{
    if (err) {
        console.log(`Server is giving an error: ${err}`);
    }else{
        console.log(`Server is running on port: ${port}`);
    }
})