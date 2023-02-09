import { MongoClient, ObjectId } from "mongodb";
import { updateListing } from "./crud/update";
import { getListingByName } from "./crud/read";
import { deleteListingByName } from "./crud/delete";
import { getListingsByAvgPriceAndMaxStreets } from "./aggregations/listings";
import { bookListing } from "./transactions/tx";

async function main() {
  const mongo_uri =
    "mongodb+srv://margin:kCfejZSUhHodcExJ@cluster0.2xmch.mongodb.net";
  const client = new MongoClient(mongo_uri);
  try {
    await client.connect();
    console.log("connected");

    // const listing = {
    //   name: "meme loft",
    //   summary: "a wonderfuuul loft",
    //   bedrooms: 1,
    //   bathrooms: 1,
    // };

    // console.log((await createListing(listing,client)).insertedId);

    // console.log((await getListing('63e3cd5c68e85de3e4b6d4e1',client)));
    // console.log(await getAtleastXBedroomListings(1, 10, 1, client));
    // console.log(await getAtleastXBedroomListings(1, 10, 2, client));

    // update
    // const name = "Ribeira Charming Duplex2";
    // const data = await updateListing(
    //   { name },
    //   { upsert: true },
    //   { bedrooms: 10 },
    //   client
    // );
    // console.log(data);
    // console.log(await (await getListingByName(client, name))?.bedrooms);

    // delete
    // const resp = await deleteListingByName(client, name);
    // console.log(resp);

    // aggregation pipelines

    // const listings = await getListingsByAvgPriceAndMaxStreets(client, 10);
    // console.log(await listings.toArray());

    const booking = await bookListing(
      client,
      "vasanth",
      "Ocean View Waikiki Marina w/prkg",
      "2023-02-09T00:00:00"
    );

    console.log(booking);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
