"use server";
import { db } from "@/lib/db";

import { getCurrentUser } from "./user";
import { getListingById } from "./listing";

export const createReview = async ({
    cleanliness,
    accuracy,
    check_in,
    communication,
    location_score,
    value,
    description,
    listingId,
}: {
    cleanliness: number,
    accuracy: number,
    check_in: number,
    communication: number,
    location_score: number,
    value: number,
    description: string,
    listingId: string
}) => {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized!");

    const listing = await getListingById(listingId);
    if (!listing) throw new Error("No listings!");

    console.log(listing, '****************')
    // if (!listing.Review.filter)
    // const review = await db.review.upsert({
    //     where: {
    //         listingId: listingId,
    //         userId: user.id,
    //     },
    //     create: {
    //         cleanliness,
    //         accuracy,
    //         check_in,
    //         communication,
    //         location_score,
    //         value,
    //         description,
    //         userId: user.id,
    //         listingId: listing.id,
    //     },
    //     update: {}
    // })
    // return review;
    return null
};

