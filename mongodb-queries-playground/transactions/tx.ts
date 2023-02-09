import { MongoClient, ObjectId } from "mongodb";

export async function bookListing(
  client: MongoClient,
  username: string,
  listing: string,
  reservationDate: string
) {
  const session = client.startSession();
  const transactionOptions = {};

  try {
    session.startTransaction(transactionOptions);

    // check the booking list of listing
    const listingAvailability = await client
      .db("sample_airbnb")
      .collection("listingsAndReviews")
      .findOne({
        name: listing,
        "reservations.date": reservationDate,
      });

    if (listingAvailability) return session.abortTransaction();

    // update the booking list
    const updateResponse = await client
      .db("sample_airbnb")
      .collection("listingsAndReviews")
      .updateOne(
        {
          name: listing,
        },
        {
          $addToSet: {
            reservations: {
              date: reservationDate,
              user: username,
            },
          },
        }
      );

    // update the user booking list
    const userResponse = await client
      .db("sample_airbnb")
      .collection("users")
      .updateOne(
        {
          name: username,
        },
        {
          $addToSet: {
            reservations: {
              listing: listing,
              date: reservationDate,
            },
          },
        }
      );

    await session.commitTransaction();

    return { updateResponse, userResponse };
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
  } finally {
    await session.endSession();
  }
}
