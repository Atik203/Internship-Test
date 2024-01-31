import axios from "axios";
import { useEffect, useState } from "react";
import ShowCard from "../ShowCard/ShowCard";

const PopularShows = () => {
  const [shows, setShow] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => setShow(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredShows = shows
    .filter(
      (show) =>
        show.show.image && (show.show.image.original || show.show.image.medium)
    )
    .slice(0, 6);

  return (
    <div>
      <h1 className="text-center mt-20 lg:text-4xl text-xl font-bold">
        Most Popular Shows
      </h1>
      <div className="mt-20 mb-24 grid gap-12 items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {" "}
        {filteredShows?.map((show) => (
          <ShowCard key={show.show.id} show={show.show}></ShowCard>
        ))}
      </div>
    </div>
  );
};

export default PopularShows;
