const mongoose = require("mongoose"); 

const connectDB = async () => {
    try {
        // console.log("Connecting to DATABASE...");
        await mongoose.connect("mongodb://0.0.0.0:27017/NFTmarketplace", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DATABASE CONNECTED SUCCESSFULLY...");
    } catch (err) {
        console.log("ERROR WHILE CONNECTING TO DATABASE:");
        console.error(err);
    }
};

module.exports = connectDB;