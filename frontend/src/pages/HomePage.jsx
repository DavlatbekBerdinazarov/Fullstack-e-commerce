import React from "react";
import Home from "../components/homepage/Home";
import PopularWomen from "../components/homepage/PopularWomen";
import ExclusiveOffer from "../components/homepage/ExclusiveOffer";
import NewCollections from "../components/homepage/NewColections";
import OfferInEmail from "../components/homepage/OfferInEmail";

export default function HomePage() {
  return (
    <main>
      <div>
        <Home/>
      </div>
      <div className="md:container mx-auto lg:px-10 px-[15px]">
        <div>
          <PopularWomen/>
        </div>

        <div className="mt-12">
          <ExclusiveOffer/>
        </div>

        <div className="mt-1">
          <NewCollections/>
        </div>

        <div>
          <OfferInEmail/>
        </div>
        
      </div>
    </main>
  );
}
