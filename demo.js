const { MongoClient, ServerApiVersion } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://pacholicek:nvf8394DEWeir@cluster0.elxcvlk.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
   
    try {
         await client.connect();
         await listDatabases(client);
        } catch(e) {
            console.error(e);
        } finally {
            await client.close();
        }
}

main().catch(console.error);

async function listDatabases(client) {
    const databasesLists = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesLists.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}