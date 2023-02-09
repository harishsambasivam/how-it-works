import { MongoClient, UpdateOptions } from "mongodb";

export const updateListing = async (
  filter: any,
  options: UpdateOptions = {},
  data: any,
  client: MongoClient
) => {
  const res = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne(filter, { $set: data }, options);
  return res;
};

// db.listingsAndReviews.updateOne({bathrooms: {$gt: 2}}, {$set: {isActive: true}});
