const mongoose = require("mongoose")
const db = 'mongodb+srv://atul:atul123@cluseter0.t4cdq0v.mongodb.net/e-commerce'
// mongoose.connect("mongodb://localhost:27017/e-commerce")
mongoose.connect(db,{
}).then(()=>{
    console.log("connection successful")
}).catch((err)=>console.log(err))
