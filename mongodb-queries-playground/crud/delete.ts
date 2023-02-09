import { MongoClient } from "mongodb";

export async function deleteListingByName(
  client: MongoClient,
  listingName: string
) {
  const resp = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .deleteOne({
      name: listingName,
    });
  return resp;
}

// deleting many documents from collection
// db.listingsAndReviews.deleteMany({bathrooms: {$gte : 10}})
