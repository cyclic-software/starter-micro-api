const User = require("./../models/user-model"); 
const bcrypt = require("bcrypt"); 

const createUser = async (userInfo) => {
    const {username, email, password, mobile} = userInfo; 
    try{
        const checkIfUserExists = await User.findOne({email : email}); 

        if(checkIfUserExists){
            throw new Error(`User With the ${email} already exists`); 
        }
        
        const newUser = new User({
            username, 
            email, 
            password : await bcrypt.hash(password, 10), 
            mobile
        }); 

        const user = await newUser.save(); 
        return user; 
    }
    catch(err){
        throw new Error(err.message); 
    }
}

const findById = async(userId) => {
    try{
        const user = await User.findOne({_id : userId}); 
        if(!user){
            throw new Error("user not found"); 
        }
        const userJson = user.toJSON(); 
        delete userJson.password; 
        return userJson; 
    }
    catch(err){
        throw new Error(err); 
    }
}

const findAllUsers = async () => {
    try{
        return await User.find(); 
    }
    catch(err){
        throw new Error(err.message)
    }
}


module.exports = {
    createUser,
    findAllUsers, 
    findById,
}; 