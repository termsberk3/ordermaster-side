const express = require('express');
const app = express();
const port = 3000

//routes
app.get('/', (req,res)=> {
    res.send("Route connection is secure")
})

app.listen(port,()=>{
    console.log('listening on port 3000')
});