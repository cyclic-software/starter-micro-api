const User = require("./../models/user-model"); 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 


const loginWithEmailAndPassword = async (email, password) => {
    try{
        let user = await User.findOne({email : email}); 
        if(!user){
            throw new Error("User not found"); 
        }

        if(!(await bcrypt.compare(password, user.password))){
            throw new Error("Password Does not match"); 
        }
        user = user.toJSON(); 
        const uid = user._id; 
        delete user.password; 
        let token = jwt.sign(user, process.env.JWT_SECRET_KEY); // , {expiresIn : 60 * 60}
        // console.log(token);
        return {uid, token}; 
    }
    catch(err){
         throw new Error(err.message); 
    }
}

module.exports = {
    loginWithEmailAndPassword,
}