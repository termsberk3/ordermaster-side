const express = require('express');
const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
};
const app = express();
const port = 3000

//DB Connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect('mongodb+srv://termsberk38:381998Berk!@homework-cluster.tilf3zg.mongodb.net/?retryWrites=true&w=majority', option).then(function(){
    console.log("Connected to Mongo")
}, function(err) {
  console.log(err)
});

//routes
app.get('/', (req,res)=> {
    res.send("Route connection is secure")
})

app.get('/order', (req,res)=> {
    res.send("Order has been created")
})


app.listen(port,()=>{
    console.log('listening on port 3000')
});