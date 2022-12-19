const express = require("express")
const cors = require("cors")
const User = require("./db/user")
const Product = require("./db/product")
// const product = require("./db/product")
require("./db/config")

const app = express()
app.use(express.json())
app.use(cors())

app.post("/register", async (req, resp) => {
    const user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    resp.send(result)
    console.log(result)
})

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            resp.send(user)
        } else {
            resp.send("User Not Found !")
        }
    }
    else{
        resp.send("User Not Found !")
    }

})

app.post("/addProduct", async (req,resp)=>{
    const product = new Product(req.body)
    let result = await product.save()
    resp.send(result)
})

app.get("/", async (req,resp)=>{
    let products = await Product.find()
    resp.send(products)
})

app.delete("/deleteProduct/:id", async(req,resp)=>{
    let result = await Product.deleteOne({_id:req.params.id})
    resp.send(result)

})
app.get("/product/:id", async(req,resp)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
        resp.send(result)
    }else{
        resp.send({result:"Product not Found"})
    }
})
app.put("/product/:id",async(req,resp)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    resp.send(result)
    console.log(req.body)
})
app.get("/search/:key",async(req, resp)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {brand:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    })
    resp.send(result)
})

const port= process.env.PORT || 5000
app.listen(port, console.log(`Server started on port ${port}`))