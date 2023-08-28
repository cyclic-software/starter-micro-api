const {Web3} = require("web3"); 
const path = require("path"); 

const web3 = new Web3(process.env.API_KEY); 
// console.log(web3); 

module.exports = web3; 