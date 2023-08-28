// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Market is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

   event NFTMinted(address indexed owner, uint indexed tokenId, string tokenURI, string name, string description, string category);

    struct Token {
        address payable owner;
        uint tokenId;
        string tokenURI;
        uint price;
        string name;
        string description;
        string category;
        bool isListedForSale;
        bool isListedForAuction;
    }

    struct Auction {
        uint tokenIndex;
        uint startingPrice;
        address payable creator;
        uint endTime;
        uint highestBid;
        address highestBidder;
    }

    Token[] public tokens;
    Auction[] public auctions;

    modifier onlyTokenOwner(uint index) {
        require(msg.sender == tokens[index].owner, "Not the token owner");
        _;
    }

    modifier onlyAuctionOwner(uint index) {
        require(msg.sender == auctions[index].creator, "Not the auction owner");
        _;
    }

    modifier notListedForSale(uint index) {
        require(!tokens[index].isListedForSale, "Already listed for sale");
        _;
    }

    modifier notListedForAuction(uint index) {
        require(!tokens[index].isListedForAuction, "Already listed for auction");
        _;
    }

    constructor() ERC721("Market_Place", "MKP") {}

    function mintNFT(string memory tokenURI, string memory name, string memory description, string memory category) public returns (uint256) {
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        Token memory newToken = Token(
            payable(msg.sender),
            newItemId,
            tokenURI,
            0,
            name,
            description,
            category,
            false,
            false
        );

        tokens.push(newToken);
        _tokenIds.increment();

        emit NFTMinted(msg.sender, newItemId, tokenURI, name, description, category);
        return tokens.length - 1;
    }

    function viewAllTokens() public view returns(Token [] memory){
        return tokens; 
    }

    function purchaseNFT(uint index) public payable notListedForAuction(index) {
        Token storage token = tokens[index];
        require(index < tokens.length, "Invalid index");
        require(msg.value >= token.price, "Insufficient amount");

        address payable prevOwner = token.owner;
        token.owner = payable(msg.sender);
        token.isListedForAuction = false;
        token.isListedForSale = false;
        token.price = msg.value;

        _transfer(prevOwner, msg.sender, token.tokenId);
        prevOwner.transfer(msg.value);
    }

    function sellNFT(uint index, uint price) public onlyTokenOwner(index) notListedForSale(index) notListedForAuction(index) {
        require(price > 0, "Price should be greater than zero");

        tokens[index].price = price;
        tokens[index].isListedForSale = true;
    }

    function removeFromSale(uint index) public onlyTokenOwner(index) {
        tokens[index].isListedForSale = false;
    }

    // Auction related functions...

    function startAuction(uint startingPrice, uint durationInSeconds, uint index) public notListedForSale(index) notListedForAuction(index) {
        Auction memory newAuction = Auction(
            index,
            startingPrice,
            payable(msg.sender),
            block.timestamp + durationInSeconds,
            0,
            address(0)
        );
        tokens[index].isListedForAuction = true;
        auctions.push(newAuction);
    }

    function getAllAuctions() public view returns (Auction[] memory) {
        return auctions;
    }

     function bidOnAuction(uint auctionIndex) public payable {
        require(auctions[auctionIndex].creator != msg.sender, "Owners cannot bid on their own NFT");
        require(msg.value > auctions[auctionIndex].highestBid, "Bid must be higher than the previous bid"); 
        require(block.timestamp < auctions[auctionIndex].endTime, "Auction has ended"); 

        if (auctions[auctionIndex].highestBid > 0) {
            address payable previousBidder = payable(auctions[auctionIndex].highestBidder);
            previousBidder.transfer(auctions[auctionIndex].highestBid);
        }

        auctions[auctionIndex].highestBid = msg.value; 
        auctions[auctionIndex].highestBidder = msg.sender; 
    }

     function finalizeAuction(uint auctionIndex) public payable onlyAuctionOwner(auctionIndex){
        // require(auctions[auctionIndex].highestBid > 0, "No one has bid on the auction");
        if(auctions[auctionIndex].highestBid > 0){
            
            address prevOwner = auctions[auctionIndex].creator; 
            // transfer the ownership
            transferFrom(prevOwner, auctions[auctionIndex].highestBidder, tokens[auctions[auctionIndex].tokenIndex].tokenId);

            // change the owner details 
            tokens[auctions[auctionIndex].tokenIndex].owner = payable(auctions[auctionIndex].highestBidder); 
            tokens[auctions[auctionIndex].tokenIndex].price = auctions[auctionIndex].highestBid; 

            payable(auctions[auctionIndex].creator).transfer(auctions[auctionIndex].highestBid);
        }
        // Remove the NFT from the auction
        auctions[auctionIndex] = auctions[auctions.length - 1]; 
        tokens[auctions[auctionIndex].tokenIndex].isListedForAuction = false; 
        auctions.pop(); 
    }
}
