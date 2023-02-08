import { MongoClient, ObjectId } from "mongodb";


async function listDatabase(client: MongoClient){
   const databases =  await client.db().admin().listDatabases();
  return databases;
}


async function createListing(listing:any, client: MongoClient) {
  const resp = await client.db('sample_airbnb').collection('listingsAndReviews').insertOne(listing);
  return resp;
}


async function getListing(listingId: any, client: MongoClient){
  const resp = await client.db('sample_airbnb').collection('listingsAndReviews').findOne({
  _id: new ObjectId(listingId)
  })
  return resp;
}


async function getAtleastXBedroomListings(bedrooms: number, limit: number, page: number, client: MongoClient){
  const query = { bedrooms : {  $gte : bedrooms } };
  const cursor =  client.db('sample_airbnb').collection('listingsAndReviews').find(query, {
    sort: {
      bedrooms: 1
    },
    skip: page * limit
  }).limit(10);
  const data = (await cursor.toArray()).map(doc => doc._id);
  return data;
}

async function main() {
  const mongo_uri ="";
  const client = new MongoClient(mongo_uri);
  try {
    await client.connect();
    console.log("connected");
    const listing = {
      name: 'meme loft',
      summary: 'a wonderfuuul loft',
      bedrooms: 1,
      bathrooms: 1
    }

    // console.log((await createListing(listing,client)).insertedId);
    // console.log((await getListing('63e3cd5c68e85de3e4b6d4e1',client)));
    console.log((await getAtleastXBedroomListings(1,10, 1, client)));
    console.log((await getAtleastXBedroomListings(1,10, 2, client)));
    

  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
