const express=require("express");
const db=require("./config/mongoose");
const router = require("./routes/routes");
const bodyParser = require("body-parser");
const app=express();
const port=8000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(router);

app.listen(port,(err)=>{
    if (err) {
        console.log(`Server is giving an error: ${err}`);
    }else{
        console.log(`Server is running on port: ${port}`);
    }
})