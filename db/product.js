const mongoose = require ("mongoose")

const productShema = new mongoose.Schema({
    name:String,
    brand:String,
    category:String,
    price:Number,
    userId:String
})

module.exports = mongoose.model("products",productShema)