const router = require("express").Router(); 
const {register, getUsers, login, getSingleUserWithId} = require("../controller/user-controller"); 

router.get("/", getUsers); 
router.post("/register", register); 
router.post("/login", login); 

router.use(require("./../middlewares/auth")); 
router.get("/:uid", getSingleUserWithId); 

module.exports = router; 