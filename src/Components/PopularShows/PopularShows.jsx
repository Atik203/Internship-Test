import ShowCard from "../ShowCard/ShowCard";
import useShows from "../../Hooks/useShows";
import { Link } from "react-router-dom";

const PopularShows = () => {
  const [shows] = useShows();

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
      <div className="text-center mb-20">
        <Link
          to={"/all-shows"}
          className="btn text-center text-sm md:text-base bg-red-500 text-white border-none hover:text-black hover:bg-gray-200"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default PopularShows;
