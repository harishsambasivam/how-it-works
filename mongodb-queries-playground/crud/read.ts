import { MongoClient, ObjectId } from "mongodb";

export async function getListing(listingId: any, client: MongoClient) {
  const resp = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .findOne({
      _id: new ObjectId(listingId),
    });
  return resp;
}

export async function listDatabase(client: MongoClient) {
  const databases = await client.db().admin().listDatabases();
  return databases;
}

export async function getAtleastXBedroomListings(
  bedrooms: number,
  limit: number,
  page: number,
  client: MongoClient
) {
  const query = { bedrooms: { $gte: bedrooms } };
  const cursor = client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .find(query, {
      sort: {
        bedrooms: 1,
      },
      skip: page * limit,
    })
    .limit(10);
  const data = (await cursor.toArray()).map((doc) => doc._id);
  return data;
}

export async function getListingByName(client: MongoClient, name: string) {
  const data = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .findOne({
      name,
    });
  return data;
}
