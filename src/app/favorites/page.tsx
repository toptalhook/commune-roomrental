"use client";

import React from "react";

import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/ListingCard";
import Heading from "@/components/Heading";

import { getCurrentUser } from "@/services/user";
import { getFavoriteListings } from "@/services/favorite";
import { useGlobalState } from "@/store";

const FavoritesPage = () => {
  // const user = await getCurrentUser();

  // if (!user) {
  //   return <EmptyState title="Unauthorized" subtitle="Please connect wallet" />;
  // }

  // const favorites = await getFavoriteListings();

  const [favoritedAppartments] = useGlobalState("favoritedAppartments");

  if (favoritedAppartments.length === 0) {
    return (
      <EmptyState
        title="No Favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <section className="main-container">
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div className=" main-container py-8 px-14 flex justify-start flex-wrap space-x-4 w-full">
        {favoritedAppartments.map((favoritedAppartment, index) => {
          return (
            <ListingCard key={index} data={favoritedAppartment} hasFavorited />
          );
        })}
      </div>
    </section>
  );
};

export default FavoritesPage;
