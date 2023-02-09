import { MongoClient } from "mongodb";

export async function createListing(listing: any, client: MongoClient) {
  const resp = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(listing);
  return resp;
}
