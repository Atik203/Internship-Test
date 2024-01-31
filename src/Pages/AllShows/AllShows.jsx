import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ShowCard from "../../Components/ShowCard/ShowCard";

const AllShows = () => {
  const [shows, setShow] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => setShow(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-11/12 mx-auto max-w-[1440px] min-h-screen">
      <Helmet>
        <title>ShowFlim | All Shows</title>
      </Helmet>
      <h1 className="text-center mt-10 lg:text-4xl text-xl font-bold">
        All Available Shows
      </h1>
      <div className="my-20 grid gap-12 items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {" "}
        {shows?.map((show) => (
          <ShowCard key={show.show.id} show={show.show}></ShowCard>
        ))}
      </div>
    </div>
  );
};

export default AllShows;
