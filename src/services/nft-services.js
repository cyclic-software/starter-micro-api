// const web3 = require("../helpers/web3");
const contractInstance = require("../helpers/contract");
const NFT = require("./../models/nft-model");
const User = require("./../models/user-model");
const Tx = require("./../models/transaction-history"); 
var _ = require('lodash');


async function getAuctionByTokenId(tokenId){
    const tokens = await contractInstance.methods.getAllAuctions().call(); 
    const auction = tokens.filter(item => parseInt(item.tokenIndex) == tokenId);  
    return auction;
}

const findAllNfts = async () => {
  try {
    // console.log(contractInstance);
    let tokens = await contractInstance.methods.viewAllTokens().call();
    // console.log(tokens);
    // let result = tokens.map((token) => token.toString());
    let result = [];
    tokens.forEach((token) => {
        let tokenObj = {
            owner : token.owner.toString(), 
            tokenId : parseInt(token.tokenId), 
            tokenURI : token.tokenURI.toString(), 
            price : parseInt(token.price),
            name : token.name.toString(), 
            description : token.description.toString(), 
            category : token.category.toString(), 
            isListedForSale : token.isListedForSale, 
            isListedForAuction : token.isListedForAuction, 
        }
        result.push(tokenObj); 
    })
    // console.log(result);
    // console.log(result);
    if (!tokens) {
      throw new Error("Error while fetching NFTS");
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findListedNfts = async () => {
  try {
    let tokens = await contractInstance.methods.viewAllTokens().call();
    // console.log(tokens);
    let saleTokens = await tokens.filter(token => Boolean(token.isListedForSale)); 
    if (!tokens) {
      throw new Error("Error while fetching NFTS");
    }
    // console.log(tokens[0]);
    let listedTokens = []; 
    saleTokens.forEach(token => {
        let tokenObj = {
          owner : token.owner.toString(), 
          tokenId : Number(token.tokenId),
          tokenURI : token.tokenURI.toString(), 
          price : Number(token.price), 
          name : token.name.toString(), 
          description : token.description.toString(), 
          category : token.category.toString(), 
          isListedForSale : token.isListedForSale.toString(),
          isListedForAuction : token.isListedForAuction.toString()
        }
         listedTokens.push(tokenObj); 
    });
    return listedTokens;
  } catch (err) {
    throw new Error(err.message);
  }
};

const saveMintedNFT = async (data) => {
  const {
    tokenName,
    tokenId,
    tokenURI,
    userId,
    tokenDescription,
    ownerAddress,
    category, 
  } = data;
  try {
    const newNft = new NFT({
      userId,
      tokenId,
      tokenName,
      tokenURI,
      tokenDescription,
      category, 
      // price,
      // isSold,
      // isListed,

      ownerAddress,
      // blockHash,
      // blockNumber,
      // transactionHash,
      // transactionIndex,
      // gasUsed,
    });

    const saveNft = await newNft.save();
    return saveNft;
  } catch (err) {
    throw new Error(err);
  }
};

/*

  @params : public key of user

*/

// Get user's NFT's
const findUserNFTs = async (publicKey) => {
  try {
    // Get all the tokens..
    let tokens = await contractInstance.methods.viewAllTokens().call();
    
    // filter user's nfts
    let result = tokens.map(async (item) => {
      let obj = {};
      
      // filter nft that are being auctioned
      if (item.isListedForAuction) {

        // fetch all auctioned nfts
        const auctionTokens = await contractInstance.methods.getAllAuctions().call();

        let auction = []; 
        
        // if nft is being auctioned accumulate it's data.. and store it in object
        auctionTokens.forEach((auctionItem, index) => {
          // console.log(auctionItem);
          if(auctionItem.tokenIndex == item.tokenId){
              let aucObj =  {
                highestBid : parseInt(auctionItem?.highestBid), 
                startingPrice : parseInt(auctionItem?.startingPrice), 
                index : index, 
                endTime : parseInt(auctionItem.endTime)
              }
              // console.log(aucObj);
              auction.push(aucObj); 
          }
        }); 

        obj = {
          owner: item.owner.toString(),
          tokenId: parseInt(item.tokenId),
          tokenURI: item.tokenURI.toString(),
          highestBid: parseInt(auction[0]?.highestBid),
          startingPrice: parseInt(auction[0]?.startingPrice),
          auctionIndex: parseInt(auction[0]?.index),
          endTime: parseInt(auction[0]?.endTime),
          name: item.name.toString(),
          description: item.description.toString(),
          category: item.category.toString(),
          isListedForSale: Boolean(item.isListedForSale),
          isListedForAuction: Boolean(item.isListedForAuction)
        };
      } else {
        obj = {
          owner: item.owner.toString(),
          tokenId: parseInt(item.tokenId),
          tokenURI: item.tokenURI.toString(),
          price: parseInt(item.price),
          name: item.name.toString(),
          description: item.description.toString(),
          category: item.category.toString(),
          isListedForSale: item.isListedForSale,
          isListedForAuction: item.isListedForAuction
        };
      }
      return obj; 
    });
    // resolve all the promises accumulated in result array..
    const resolvedData = await Promise.all(result); 

    // filter user's nft from the results...
    let userNfts = resolvedData.filter((userNft) => userNft.owner === publicKey);
    return userNfts;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};


const findAllAuctions = async () => {
    try{
        const nfts = await findAllNfts(); 
        const nftsListedForAuction = nfts.filter(item => item.isListedForAuction); 
        // console.log(nftsListedForAuction);
        const auctionedNFTs = await contractInstance.methods.getAllAuctions().call(); 
        // console.log(auctionedNFTs);
        const serializedAuctionedNFTs = []; 

        auctionedNFTs.forEach((item, index) => {
            const auctionedTokenDetails = nftsListedForAuction.filter(t => {
              // console.log(parseInt(t.tokenId) === parseInt(item.tokenIndex));
              return parseInt(t.tokenId) === parseInt(item.tokenIndex); 
            }); 
            console.log(auctionedTokenDetails);
            let obj = {
              auctionIndex : index, 
              tokenName : auctionedTokenDetails[0].name, 
              tokenDescription : auctionedTokenDetails[0].description, 
              category : auctionedTokenDetails[0].category, 
              tokenURI : auctionedTokenDetails[0].tokenURI, 
              
              tokenIndex : parseInt(item.tokenIndex), 
              startingPrice : parseInt(item.startingPrice),
              creator : item.creator.toString(), 
              endTime : parseInt(item.endTime), 
              highestBid : parseInt(item.highestBid), 
              highestBidder : item.highestBidder.toString()
            }
            serializedAuctionedNFTs.push(obj); 
            // console.log(obj);
        }); 
        // console.log(serializedAuctionedNFTs);
        return serializedAuctionedNFTs; 
    }
    catch(err){
        console.log(err);
        throw new Error(err); 
    }
}

const sortAuctionByPrice = async (order) => {
    // console.log(order);
    if(order !== "descending" && order !== "ascending"){
        throw new Error("Invalid input ", order); 
    }
    try{
        const auctions = await findAllAuctions(); 
        auctions.forEach((item) => {
            if(item.highestBid > 0){
                item.price = item.highestBid; 
            }
            else{
              item.price = item.startingPrice;
            }
        })
        let result = _.sortBy(auctions, ['price']); 
        // console.log(result);
        if(order === "descending"){
            result = _.reverse(result); 
        }

        result.forEach((item) => {
          delete item.price
        }); 
        return result;
    }
    catch(err){
        throw new Error(err); 
    }
}

const sortTokenByPrice = async (order) => {
  if(order !== "descending" && order !== "ascending"){
    throw new Error("Invalid input ", order); 
  }
  try{
      const auctions = await findListedNfts(); 
      let result = _.sortBy(auctions, ['price']); 
      if(order === "descending"){
          result = _.reverse(result); 
      }
      return result;
  }
  catch(err){
      throw new Error(err); 
  }
}

const searchNFTByName = async(name) => {
    try{
      const nfts = await findAllNfts(); 
      
      const result = nfts.filter(item => item.name.toString().toLowerCase() == name.toLowerCase()); 

      return result; 
    }
    catch(err){
      throw new Error(err)
    }
}

const getAllCategories = async () => {
    try{
      const nfts = await findAllNfts(); 
      // console.log(nfts);
      const onlyListed = nfts.filter(item => (Boolean(item.isListedForAuction) || Boolean(item.isListedForSale))); 
      const result = onlyListed.map(item => item.category); 

      // console.log(result);
      return result; 
    }
    catch(err){
      throw new Error(err)
    }
}

const searchByCategory = async (category) => {
    try{
      const nfts = await findAllNfts(); 
      
      const result = nfts.filter(item => item.category.toString().toLowerCase() == category.toLowerCase() && (Boolean(item.isListedForSale || Boolean(item.isListedForAuction)))); 

      // console.log(result);
      return result; 
    }
    catch(err){
      throw new Error(err)
    }
}

const nftLikeDislike = async (userId, token) => {
  const nfts = await findAllNfts(); 
  const result = nfts.filter(item => item.tokenId == token.tokenId); 
  // console.log(result);

  const doesNFTexists = await NFT.findOne({tokenId : result[0].tokenId}); 
  if(!doesNFTexists){
    throw new Error("there was an error"); 
  }
}

const txHistory = async (data) => {
    const {tokenId, transactionAmount, transactionType, userId} = data; 
    try{

      const newTx = new Tx(); 
      newTx.tokenId = tokenId; 
      newTx.transactionAmount = transactionAmount; 
      newTx.transactionType = transactionType; 
      newTx.userId = userId; 
      await newTx.save(); 
    } 
    catch(err){
      throw new Error(err)
    }
}

const findAuctionByTokenId = async (id) => {
  try{
    const auctionedNFTs = await contractInstance.methods.getAllAuctions().call(); 
    // console.log(auctionedNFTs[0]);
    const auctionWithId = auctionedNFTs.filter((item, index) => {
      // console.log(item.tokenIndex, id, parseInt(item.tokenIndex) == parseInt(id));
      return index === parseInt(id)
    }); 
    // console.log(auctionWithId);
    let obj = {
      tokenIndex : Number(auctionWithId[0].tokenIndex), 
      startingPrice : Number(auctionWithId[0].startingPrice),
      creator : auctionWithId[0].creator.toString(), 
      endTime : Number(auctionWithId[0].endTime), 
      highestBid : Number(auctionWithId[0].highestBid), 
      highestBidder : auctionWithId[0].highestBidder.toString()
    }
    // console.log(obj);
    return obj; 
  }
  catch(err){
    throw new Error(err); 
  }
}

const viewUserTxHistory = async (id) => {
  try{
    const txs = await Tx.find({userId : id}); 
    return txs; 
  }
  catch(err){
    console.log(err);
    throw new Error(err); 
  }
  
}

module.exports = {
  findListedNfts,
  saveMintedNFT,
  findAllNfts,
  findUserNFTs,
  findAllAuctions,
  searchNFTByName,
  getAllCategories, 
  searchByCategory,
  nftLikeDislike, 
  txHistory,
  findAuctionByTokenId, 
  viewUserTxHistory,
  sortAuctionByPrice, 
  sortTokenByPrice,
};
