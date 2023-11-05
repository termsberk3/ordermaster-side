const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name:{
            type : String,
            required: [true,"Please enter a product"]
        },
        quantity:{
            type : Number,
            required: [true,"Please enter the amount"],
            default:0
        },
        price:{
            type : Number,
            required : true,
        },
        timeStamp:{
            timestamps : true
        }
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;