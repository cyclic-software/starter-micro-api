require("dotenv").config();
const express = require("express"); 
const app = express(); 
const cors = require("cors"); 
const connectDB = require("./config/dbConfig"); 

const {Server} = require("socket.io");
const http = require("http");
const httpServer = http.createServer(app);
const socket = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001"
  },
});

const NFT = require("./models/nft-model"); 

// configs
const PORT = process.env.port || 3000; 
connectDB(); // connects to mongodb

// middlewares 
app.use(cors()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

// user routes 
const userRoutes = require("./routes/user-routes"); 
app.use("/users", userRoutes); 

// nft routes
const nftRoutes = require("./routes/nft-routes"); 
app.use("/nfts", nftRoutes); 

// sockets

// socket.on("connection", (s) => {
//     console.log("connected...")
//     s.on("mint", async (data) => {
        
//         try{
//             const newNFT = new NFT(); 
//             console.log(data);
//             socket.emit("nft saved",data);
//         }
//         catch(err){
//             socket.emit("error encountered...", err.message); 
//         }

//     })
//     s.on("disconnect", () => {
//       console.log("Disconnected: ");
//     });
// });

app.get("*", (req, res) => {
    res.status(404).json({
        success : false, 
        message : "Page not found"
    })
}); 

httpServer.listen(3000, () => {
    console.log("SERVER RUNNING AT PORT 3000");
  });