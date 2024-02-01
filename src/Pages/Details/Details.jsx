import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import ReactLoading from "react-loading";
import ReactCountryFlag from "react-country-flag";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Details = () => {
  const { id } = useParams();
  const [show, setShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

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

  const onSubmit = (data) => {
    const { Name, email, date, number } = data;
    const bookData = {
      Name,
      email,
      number,
      date,
      ...show,
    };

    const modal = document.getElementById("my_modal");
    if (modal) {
      modal.close();
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Booked it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const existingBookings =
          JSON.parse(localStorage.getItem("booking")) || [];
        existingBookings.push(bookData);
        localStorage.setItem("booking", JSON.stringify(existingBookings));

        Swal.fire({
          title: "Booked",
          text: "Show has been Booked.",
          icon: "success",
        });
      }
    });

    console.log(bookData);
  };

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
          <p>
            Runtime: {runtime || "Not Available"} {runtime && "Minute"}
          </p>
          <div className="">
            <button
              className="btn text-white border-none bg-red-500 hover:text-black hover:bg-gray-300"
              onClick={() => document.getElementById("my_modal").showModal()}
            >
              Book Now
            </button>

            <dialog
              id="my_modal"
              className="modal modal-bottom sm:modal-middle"
            >
              {" "}
              <div className="modal-box">
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                  <h2 className="text-2xl font-bold mb-4">Ticket Booking</h2>
                  <div className="space-y-2 mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Movie Title
                    </label>
                    <input
                      type="text"
                      disabled
                      className="mt-1 p-2 border rounded-md w-full"
                      value={name}
                    />
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Show Time{" "}
                    </label>{" "}
                    <input
                      type="text"
                      disabled
                      className="mt-1 p-2 border rounded-md w-full"
                      value={showTime}
                    />
                  </div>
                  <div className="mb-4 space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Show Day
                    </label>
                    <input
                      type="text"
                      disabled
                      className="mt-1 p-2 border rounded-md w-full"
                      value={showDay}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      {...register("Name", { required: "Name is required" })}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      {...register("date", { required: "Date is required" })}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                    {errors.date && (
                      <p className="text-sm text-red-600">
                        {errors.date.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="ticketNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ticket Number (Max: 10)
                    </label>

                    <input
                      type="number"
                      {...register("number")}
                      className="mt-1 p-2 border rounded-md w-full"
                      max={10}
                      min={1}
                      defaultValue={1}
                    />

                    {errors.ticketNumber && (
                      <p className="text-sm text-red-600">
                        {errors.ticketNumber.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-gray-300 hover:text-black"
                  >
                    Book Now
                  </button>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
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
