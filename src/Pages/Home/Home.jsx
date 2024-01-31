import React from "react";
import { Helmet } from "react-helmet";
import Banner from "./../../Components/Banner/Banner";
import PopularShows from "../../Components/PopularShows/PopularShows";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto max-w-[1440px] min-h-screen">
      <Helmet>
        <title>ShowFlim | Home</title>
      </Helmet>
      <Banner></Banner>
      <PopularShows></PopularShows>
    </div>
  );
};

export default Home;
