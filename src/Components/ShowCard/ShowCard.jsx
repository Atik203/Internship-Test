import React from "react";
import { Link } from "react-router-dom";

const ShowCard = ({ show }) => {
  const {
    id,
    name,
    externals,
    type,
    language,
    genres,
    runtime,
    premiered,
    ended,
    image,
  } = show;

  const imageUrl =
    image?.original ||
    image?.medium ||
    "https://i.ibb.co/0cbkS4X/No-image-available-svg.png";

  const completed = ended ? new Date(ended).toLocaleDateString() : "Ongoing";
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
          <button className="btn btn-primary text-white border-none hover:text-black hover:bg-gray-300 bg-red-500">
            Details
          </button>
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
            #{completed === "Ongoing" ? "Ongoing" : "Completed"}
          </span>
          , <span className="hover:text-blue-600 hover:underline">#{type}</span>
        </a>
      </div>
      <div className="flex items-center justify-between pl-4 pr-4">
        <p className="text-gray-500 mb-2">Language: {language}</p>
      </div>
      <p className="pl-4 pr-4 text-gray-500 mb-2">
        Genres: {genres.join(", ")}
      </p>
      <a
        href={`https://www.imdb.com/title/${imdbLink}/`}
        rel="noreferrer"
        target="_blank"
        className="pb-4 pl-4 pr-4"
      >
        <img
          src="../../../public/imdb.png"
          alt=""
          className="w-10"
          title="IMDb Rating"
        />
      </a>
    </div>
  );
};

export default ShowCard;
