const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({

    username : {type : String, required : true}, 
    email : {type : String, required : true, unique : true}, 
    password :  { type : String, required : true}, 
    mobile : {type : String, required : true},

    status : {type : Boolean, default : true}, 
    createdAt : {type : Date, default : Date.now()}, 
    
});

userSchema.pre("save", async function (next) {
    try {
      const existingUser = await mongoose.model("User").findOne({ email: this.email });
      if (existingUser) {
        this.invalidate("email", "Email already exists. Please use a different email.");
        return next(new Error("Email already exists. Please use a different email."));
      }
      next();
    } catch (err) {
      return next(err);
    }
  });

  
module.exports = new mongoose.model("User", userSchema); 
