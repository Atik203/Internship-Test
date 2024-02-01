import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ShowCard = ({ show }) => {
  const { id, name, externals, type, language, genres, image, status, rating } =
    show;
  const Rating = rating?.average || "Not Available";
  const imageUrl =
    image?.original ||
    image?.medium ||
    "https://i.ibb.co/0cbkS4X/No-image-available-svg.png";

  const completed = status === "Ended" ? "Completed" : "Ongoing";
  const imdbLink = externals?.imdb || "https://www.imdb.com/";

  return (
    <div className="relative group card bg-base-100 h-[580px] shadow-xl overflow-hidden">
      <figure className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full transition-opacity group-hover:opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Link to={`/details/${id}`}>
            {" "}
            <button className="btn btn-primary text-white border-none hover:text-black hover:bg-gray-300 bg-red-500">
              Details
            </button>
          </Link>
        </div>
      </figure>
      <div className="flex items-center justify-between p-4">
        <h2 className="card-title text-3xl font-bold ">{name}</h2>
        <a
          href={show?.url}
          rel="noreferrer"
          target="_blank"
          className="text-gray-500 text-right cursor-pointer"
        >
          <span className="hover:text-blue-600 hover:underline">
            #{completed}
          </span>
          , <span className="hover:text-blue-600 hover:underline">#{type}</span>
        </a>
      </div>
      <div className="flex items-center justify-between pl-4 pr-4">
        <p className="text-gray-500 mb-2">Language: {language}</p>
      </div>
      <p className="pl-4 pr-4 text-gray-500 mb-2">
        Genres: {genres?.join(", ")}
      </p>
      <div className="flex items-center justify-start pl-4 pb-4 gap-3">
        <a
          href={`https://www.imdb.com/title/${imdbLink}/`}
          rel="noreferrer"
          target="_blank"
          className=""
        >
          <img
            src="../../../public/imdb.png"
            alt=""
            className="w-10"
            title="IMDb Rating"
          />
        </a>
        <div className="rating">
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <span className="ml-1 font-semibold">{Rating}</span>
        </div>
      </div>
    </div>
  );
};

ShowCard.propTypes = {
  show: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    externals: PropTypes.shape({
      imdb: PropTypes.string,
    }),
    type: PropTypes.string,
    language: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    runtime: PropTypes.number,
    premiered: PropTypes.string,
    ended: PropTypes.string,
    image: PropTypes.shape({
      original: PropTypes.string,
      medium: PropTypes.string,
    }),
    status: PropTypes.string,
    rating: PropTypes.shape({
      average: PropTypes.number,
    }),
    url: PropTypes.string,
  }).isRequired,
};

export default ShowCard;
