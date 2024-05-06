"use client";

import React, { useState, useEffect } from "react";

import EmptyState from "@/components/EmptyState";
import ListingHead from "./_components/ListingHead";
import ListingInfo from "./_components/ListingInfo";
import ListingClient from "./_components/ListingClient";

import { getCurrentUser } from "@/services/user";
import { getListingById } from "@/services/listing";
import { categories } from "@/utils/constants";
import { Reviewdetails } from "@/components/Reviewdetails";

import { useGlobalState } from "@/store";
import { loadAppartment } from "@/Blockchain.services";

interface IParams {
  listingId: string;
}

const ListingPage = ({ params: { listingId } }: { params: IParams }) => {
  // const listing = await getListingById(listingId);
  const [appartment] = useGlobalState("appartment");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      await loadAppartment(listingId);
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    init();
  }, []);

  if (!appartment) return <EmptyState />;

  const {
    title,
    images: imageSrc,
    location,
    category,
    id,
    user: owner,
    price,
    description,
    romms: roomCount,
    guests: guestCount,
    bathrooms: bathroomCount,
  } = appartment;

  const tempcategory = categories.find((cate) => cate.label === category);

  const latlng = [location[2], location[3]];
  console.log(latlng);
  return (
    <section className="main-container">
      <div className="flex flex-col gap-6">
        <ListingHead
          title={title}
          image={imageSrc}
          country={location[1]}
          region={location[0]}
          id={id}
        />
      </div>

      <ListingClient
        id={id}
        price={price}
        // reservations={reservations}
        user={currentUser}
        title={title}
      >
        <ListingInfo
          user={owner}
          category={tempcategory}
          description={description}
          roomCount={roomCount}
          guestCount={guestCount}
          bathroomCount={bathroomCount}
          latlng={latlng}
        />
      </ListingClient>

      <Reviewdetails listingId={listingId} />
    </section>
  );
};

export default ListingPage;
