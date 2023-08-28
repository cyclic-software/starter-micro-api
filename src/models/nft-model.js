const mongoose = require("mongoose"); 

const NFTSchema = new mongoose.Schema({
    userId : {type : String}, 
    tokenId : {type : Number}, 
    tokenName : {type : String}, 
    tokenURI : {type : String}, 
    tokenDescription : {type : String}, 
    price : {type : Number}, 
    isListedForSale : {type : Boolean, default : false}, 
    isListedForAuction : {type : Boolean, default : false}, 
    ownerAddress : {type : String},
    category : {type : String}, 
    createdAt : {type : Date, default : Date.now()}, 
}); 

module.exports = new mongoose.model("NFT", NFTSchema); 