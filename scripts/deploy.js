require("dotenv").config(); 
const path = require("path"); 
const {Web3} = require("web3"); 
const HDWalletProvider = require("@truffle/hdwallet-provider");

const ABI = require(path.resolve(__dirname, "../", "artifacts", "contracts", "NFTmarketplace.sol", "Market.json")); 

const provider = new HDWalletProvider(
    process.env.MNEMONIC_PHRASE,
    process.env.API_KEY
);  

const web3 = new Web3(provider);

const deployContract = async () => {
    console.log("Attempting to deploy....")
   try{
        const accounts = await web3.eth.getAccounts();
        const result = await new web3.eth.Contract(ABI.abi)
        .deploy({
            data : ABI.bytecode
        })
        .send({
            from : accounts[0], 
            gas : "10000000"
        }); 

        console.log("deployed..");
        console.log("Contract deployed to : ", result.options.address); 
        provider.engine.stop(); 
   }
   catch(err){
        console.log(err);
        provider.engine.stop(); //
   }
}

deployContract()
.then(() => {
    console.log("deployed");
}).catch(err => {
    console.log(err);
})