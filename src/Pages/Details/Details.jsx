import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import ReactLoading from "react-loading";
import ReactCountryFlag from "react-country-flag";

const Details = () => {
  const { id } = useParams();
  const [show, setShow] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.tvmaze.com/shows/${parseInt(id)}`
        );
        setShow(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <ReactLoading height={667} width={375} delay={2000} />;
  }

  const {
    name,
    externals,
    type,
    language,
    genres,
    runtime,
    premiered,
    rating,
    ended,
    image,
    summary,
    network,
    schedule,
    status,
  } = show;
  const country = network?.country?.name || "United States";
  const countryCode = network?.country?.code || "US";
  const Rating = rating?.average || "Not Available";
  const showTime = schedule?.time || "Not Available";
  const showDay = schedule?.days[0] || "Not Available";
  const imageUrl =
    image?.original ||
    image?.medium ||
    "https://i.ibb.co/0cbkS4X/No-image-available-svg.png";

  const completed = status === "Ended" ? "Completed" : "Ongoing";
  const imdbLink = externals?.imdb || "https://www.imdb.com/";

  return (
    <div className="w-11/12 mx-auto">
      <Helmet>
        <title>ShowFlim | Details</title>
      </Helmet>
      <h1 className="font-bold text-center text-3xl lg:text-5xl my-4 lg:my-6">
        {name}
      </h1>
      <div className="flex items-center justify-center gap-4 flex-col md:flex-row mb-20 mx-auto">
        <div className="md:w-1/3 lg:w-2/5">
          <img src={imageUrl} className="w-full lg:w-4/6 mx-auto" alt="" />
        </div>
        <div className="md:w-2/3 max-w-3xl mx-auto space-y-1">
          <h1 className="font-medium">Language: {language} </h1>

          <h1 className="font-medium">
            Country: {country}{" "}
            <span className="ml-2">
              <ReactCountryFlag
                countryCode={countryCode}
                style={{
                  fontSize: "1.5em",
                  lineHeight: "1em",
                }}
                svg
              />
            </span>
          </h1>
          <p className="">Genres: {genres?.join(", ")}</p>
          <h1>Broadcast network: {network?.name || "Not Available"}</h1>
          <h1>
            Broadcast period: {premiered} to {ended || "Ongoing"}
          </h1>
          <div
            className="text-justify"
            dangerouslySetInnerHTML={{ __html: summary }}
          ></div>
          <a
            href={show?.url}
            rel="noreferrer"
            target="_blank"
            className="text-gray-500 my-3 text-right cursor-pointer"
          >
            <span className="hover:text-blue-600 hover:underline">
              #{completed}
            </span>
            ,{" "}
            <span className="hover:text-blue-600 hover:underline">#{type}</span>
          </a>
          <div className="flex items-center justify-start gap-3">
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
          <p>
            Air Time: {showTime} & {showDay}{" "}
          </p>
          <div className="">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn text-white border-none bg-red-500 hover:text-black hover:bg-gray-300"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              open modal
            </button>
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">
                  Press ESC key or click the button below to close
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
