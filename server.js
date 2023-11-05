const express = require('express');
const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
};
const app = express();
const port = 3000

const Product = require('./models/productModel')
app.use(express.json());

//DB Connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect('mongodb+srv://username:password@homework-cluster.tilf3zg.mongodb.net/?retryWrites=true&w=majority', option).then(function(){
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

app.get('/products', async(req,res)=> {
    try {
        const products = await Product.find({quantity:1});
        res.status(200).json(products);
      } catch (error) {
           console.log(error.message)
           res.status(500).json({message: error.message})
      }
})

app.get('/products/:id', async(req,res)=> {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
      } catch (error) {
           console.log(error.message)
           res.status(500).json({message: error.message})
      }
})


//create product
app.post('/products', async(req,res)=> {
   try {
     const products = await Product.create(req.body)
     res.status(200).json(products);
   } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
   }
})

//update product
app.put('/products/:id', async(req,res)=> {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        //product not found on database
        if(!product){
            return res.status(404).json({message: `Unable to find product with the id ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
      } catch (error) {
           console.log(error.message)
           res.status(500).json({message: error.message})
      }
})
//delete product
app.delete('/products/:id', async(req,res)=> {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        //product not found on database
        if(!product){
            return res.status(404).json({message: `Unable to delete product with the id ${id}`})
        }
        res.status(200).json(product)
      } catch (error) {
           console.log(error.message)
           res.status(500).json({message: error.message})
      }
})
app.listen(port,()=>{
    console.log('listening on port 3000')
});