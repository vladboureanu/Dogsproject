const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/dogs";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('dogs');
    const movies = database.collection('breeds');
    const query = { breed: 'American Foxhound' };
    const options = {
      projection: { _id: 0, breed: 1 },
    };
    const movie = await movies.findOne(query, options);
    console.log(movie);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
