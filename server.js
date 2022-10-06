const express = require("express");
const { MongoClient } = require('mongodb');

async function main() {
    
    const uri = "mongodb+srv://pacholicek:nvf8394DEWeir?@cluster0.elxcvlk.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await findOneListingByName(client, "Tom")   ;
        await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
            minimumNumberOfBedrooms: 2,
            maximumNumberOfResults: 100
        });

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

//main().catch(console.error);

async function findOneListingByName(client, nameOfListing) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
    const result = await client.db("people").collection("profiles").findOne({ firstname: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
    minimumNumberOfBedrooms = 1,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {

    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find for the find() docs
    const cursor = client.db("people").collection("profiles")
        .find({
            
            
            bedrooms: { $gte: minimumNumberOfBedrooms },
            
        }
        )
        .sort({ last_review: -1 })
        .limit(maximumNumberOfResults);

    // Store the results in an array
    const results = await cursor.toArray();

    // Print the results
    if (results.length > 0) {
        //console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms`);
        
        results.forEach((result, i) => {
            const date = new Date(result.last_review).toDateString();

            console.log();
            console.log(`${i + 1}. name: ${result.firstname}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
           // console.log(`   bathrooms: ${result.bathrooms}`);
           //console.log(`   most recent review date: ${date}`);
        });
    } else {
        console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
    }
}

const app = express();
async function slunatko() {
  
  const uri = "mongodb+srv://pacholicek:nvf8394DEWeir?@cluster0.elxcvlk.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  const result = await client.db("people").collection("profiles").find().toArray();
  //console.log(result);
  //const resultt = await client.db("people").collection("profiles").find(p => p.id === req.query.id);
                  

 
 

  app.engine('pug', require('pug').__express)
  app.set("view engine", "pug");

  // serve static files from the `public` folder
  app.use(express.static(__dirname + "/public"));

  app.get("/", (req, res) => {
    res.render("index", {
      title: "Homepage",
      client: result
      
    });

  });

    app.get("/profile", (req, res) => {
        var person = result.find(p => p.id === req.query.id);
        //console.log('person: '+JSON.stringify(person));
        //console.log(person);


    res.render("profile", {
        
       title: `About ${person.firstname} ${person.lastname}`,
        person
     
     });
    });
    
    
    app.get("/photo", (req, res) => {
        //const person = client.db("people").collection("profiles").find(p => p.id === req.query.id);
        
        var person = client.db("people").collection("profiles").find(p => p.id === req.query.id);
        console.log('person: '+person.id);
      //const person = client.photos.find(p => p.id === req.query.id);
      res.render("photo", {
        title: `About ${person.firstname} ${person.lastname}`,
        client: person,
        person
      });
    });



}


slunatko();


var http = require('http');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write('Yo!');
    res.end();
}).listen(process.env.PORT || 3000);

//const server = app.listen(3000, () => {
  //console.log(`Express running → PORT ${server.address().port}`);
//});
