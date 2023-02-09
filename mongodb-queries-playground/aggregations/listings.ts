import { MongoClient } from "mongodb";

export async function getListingsByAvgPriceAndMaxStreets(
  client: MongoClient,
  limit: number
) {
  const pipeline = [
    {
      $match: {
        "address.country": "United States",
      },
    },
    {
      $group: {
        _id: "$address.suburb",
        streets: {
          $addToSet: "$address.street",
        },
        avgPrice: {
          $avg: "$price",
        },
      },
    },
    {
      $project: {
        _id: "$_id",
        streets: "$streets",
        streetCount: {
          $size: {
            $ifNull: ["$streets", []],
          },
        },
        avgPrice: "$avgPrice",
      },
    },
    {
      $sort: {
        streetCount: -1,
        avgPrice: -1,
      },
    },
    {
      $limit: limit,
    },
  ];

  const res = client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .aggregate(pipeline);
  return res;
}
