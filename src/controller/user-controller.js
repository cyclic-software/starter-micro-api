const {createUser, findAllUsers, findById} = require("../services/user-services"); 
const {loginWithEmailAndPassword} = require("../services/auth-services");

const register = async (req, res) => {
    const {username, email, password, mobile} = req.body; 
    if(!(username && email && password && mobile)){
        return res.status(400).json({
            success : false, 
            message : "Invalid inputs"
        }); 
    }
    try{
        await createUser({username, email, password, mobile});  
        return res.json({
            status : 200, 
            success : true, 
            message : "User Registered Successfully"
        }); 
    }
    catch(err){ 
        if(err.message.includes("email")){
            return res.status(500).json({
                success : false, 
                message : "Invalid Email", 
                error : err
            }); 
        }

        console.log(err);
        return res.status(500).json({
            success : false, 
            message : "Internal server error", 
            error : err
        }); 
    }
    
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body; 
        if(!(email && password)){
            return res.status(400).json({success : false, message : "Invalid inputs"})
        }
        // console.log(email, password);
        const {uid, token} = await loginWithEmailAndPassword(email, password); 
        return res.status(200).json({success : true, message : "Logged In", token : token, data : uid});
    }
    catch(err){
        if(err.message.includes("Password Does not match")){
            return res.status(500).json({
                success : false, 
                message : "Incorrect password"
            });
        }

        if(err.message.includes("User not found")){
            return res.status(500).json({
                success : false, 
                message : "Invalid User"
            }); 
        }
        
        console.log(err);
        return res.status(500).json({success : false, message : "Internal error", error : err.message}); 

    }
}

const getUsers = async (req, res) => {
    try{
        return res.status(200).json({success : true, data : await findAllUsers()}); 
    }   
    catch(err){
        return res.status(500).json({success : false, message : "internal error"}); 
    }
}

const getSingleUserWithId = async (req, res) => {
    try{
        const {uid} = req.params;
        if(!uid){
            return res.status(400).json({success : false, message : "Invalid userId"}); 
        }
        // console.log(uid); 
        return res.status(200).json({success : true, message : "User fetched", data : await findById(uid)}); 
    }   
    catch(err){
        console.log(err); 
        res.status(500).json({
            success : false, 
            message : "Internal Server Error", 
            error : err.message
        }); 
    }
}

module.exports = {
    register,
    getUsers, 
    login, 
    getSingleUserWithId
}

