const {
  findListedNfts,
  saveMintedNFT,
  findAllNfts,
  findUserNFTs,
  findAllAuctions,
  searchNFTByName, 
  getAllCategories, 
  searchByCategory,
  txHistory, 
  findAuctionByTokenId,
  viewUserTxHistory, 
  sortAuctionByPrice,
  sortTokenByPrice,
} = require("./../services/nft-services");

const NFT = require("./../models/nft-model"); 

const getAllListedNfts = async (req, res) => {
  try {
    const nfts = await findListedNfts();
    addNewNFTToDB(nfts); 
    return res.status(200).json({
      success: true,
      message: "NFTs fetched",
      totalResults: nfts.length,
      data: nfts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const getAllNfts = async (req, res) => {
  try {
    const nfts = await findAllNfts();
    return res.status(200).json({
      success: true,
      message: "NFTs fetched",
      totalResults: nfts.length,
      data: nfts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const addNFT = async (req, res) => {
  const {
    tokenName,
    tokenId,
    tokenURI,
    tokenDescription,
    ownerAddress,
    category
  } = req.body;

  const userId = req.user._id;

  console.log(`
        Token name : ${tokenName} \n 
        Token Id : ${tokenId} \n 
        Token URI : ${tokenURI} \n 
        Token Desc : ${tokenDescription} \n 
        Token Cate : ${category} \n 
    `);

  // if (
  //   !(
  //     tokenName &&
  //     tokenId &&
  //     tokenURI &&
  //     tokenDescription &&
  //     category
  //   )
  // ) {
    
  //   return res.status(400).json({ success: false, message: "Invalid data" });
  // }
  try {
    const data = {
      userId,
      tokenName,
      tokenDescription,
      tokenId,
      tokenURI,
      ownerAddress,
      category
      // blockHash,
      // blockNumber,
      // transactionHash,
      // transactionIndex,
      // gasUsed,
    };
    const saveNft = await saveMintedNFT(data);
    return res.status(200).json({ success: true, message: "NFT SAVED" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "error", error: err.message });
  }
};

const getUserNFTs = async (req, res) => {
    try{
        // console.log(req.user._id);
        const data = await findUserNFTs(req.params.publicKey); 
        addNewNFTToDB(data); 
        // console.log(data);
        res.status(200).json({success : true, data : data, message : "success"}); 
    }
    catch(err){
        res.status(500).json({success : false, error : err}); 
    }
}

const getAllAuctions = async (req, res) => {
    try{
        const auctions = await findAllAuctions(); 
        if(!auctions){
          return res.status(400).json({message : "Couldn't fetch the data"}); 
        }
        return res.status(200).json({message : "fetched auctions", data : auctions}); 
    }
    catch(err){
      return res.status(500).json({success : false, message : err.message}); 
    }
}

const getNFTByName = async (req, res) =>{
  const {name} = req.params; 
  try{
      const nft = await searchNFTByName(name); 
      return res.status(200).json({success : true, data : nft}); 
  }
  catch(err){
    console.log(err);
    return res.status(500).json({success : false, message : err.message}); 
  }
}

const getNFTCategories = async (req, res) => {
  try{
    const categories = await getAllCategories(); 
    return res.status(200).json({success : true, data : categories}); 
  }
  catch(err){
    return res.status(500).json({success : false, message : err.message}); 
  }
}

const getNFTByCategory = async (req, res) => {
  const {category} = req.params; 
  try{
    const nft = await searchByCategory(category); 
    return res
    .status(200)
    .json({success : true, data : nft}); 
  }
  catch(err){
    return res
    .status(500)
    .json({success : false, message : err.message}); 
  }
}

const addNewNFTToDB = async(data) => {
  try{ 
      const newNFTs = []; 
      data.forEach(element => {
        const doesNFTExist = NFT.findOne({tokenId : element.tokenId}); 
        if(!doesNFTExist){
          newNFTs.push(element); 
        }
        return;
      }); 
      
      for(let i = 0; i<newNFTs.length; i++){
        const n = new NFT(newNFTs[i]); 
        await n.save(); 
        console.log("nft saved");
      }
      return true; 
  }
  catch(err){
    throw new Error(err); 
  }
}
 
const saveTxHistory = async (req, res) => {
  const {tokenId, transactionAmount, transactionType} = req.body; 
  const userId = req.user._id;
  try{
    await txHistory({tokenId, transactionAmount, transactionType, userId}); 
    return res.status(200).json({success : true, message : "tx saved"}); 
  }
  catch(err){
    return res.status(500).json({success : false, error : err.message}); 
  }
}

const getAuctionNFTByTokenId = async(req, res) => {
  const {id} = req.params; 
  try{
    // console.log(id);
    const nftData = await findAuctionByTokenId(id); 
    return res.status(200).json({success : true, data : nftData}); 
  }
  catch(err){
    console.log(err);
    return res.status(500).json({success : false, error : err.message}); 
  }
}

const getUserTxHistory = async (req, res) => {
    try{
        const txs = await viewUserTxHistory(req.user._id); 
        return res.status(200).json({success : true, data : txs}); 
    }
    catch(err){
        return res.status(500).json({success : false, error : err.message}); 
    }
}

const getAuctionsSortedByPrice = async (req, res) => {
    const {order} = req.params; 
    try{
        const data = await sortAuctionByPrice(order); 
        return res.status(200).json({
          success : true, 
          data : data
        }); 
    } 
    catch(err){
        return res.status(500).json({success : false, error : err.message}); 
    }
}

const getTokensSortedByPrice = async (req, res) => {
  const {order} = req.params; 
  try{
      const data = await sortTokenByPrice(order); 
      return res.status(200).json({
        success : true, 
        data : data
      }); 
  } 
  catch(err){
      return res.status(500).json({success : false, error : err.message}); 
  }
}

module.exports = {
  getAllListedNfts,
  addNFT,
  getAllNfts,
  getUserNFTs,
  getAllAuctions, 
  getNFTByName,
  getNFTCategories, 
  getNFTByCategory,
  addNewNFTToDB, 
  saveTxHistory, 
  getAuctionNFTByTokenId,
  getUserTxHistory, 
  getAuctionsSortedByPrice,
  getTokensSortedByPrice,
};
