import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { Link } from "react-router-dom";
// ..

const Banner = () => {
  return (
    <div className="mx-auto">
      <div className="relative">
        <img
          src={
            "https://i.ibb.co/HBNHryZ/cartoon-style-illustration-121223-1791.jpg"
          }
          className="h-[350px] md:h-[400px] lg:h-[650px] w-full transition-opacity opacity-40"
        />
      </div>
      <div
        className="w-2/3 mx-auto absolute top-52 md:top-56 lg:top-72 -mt-20 md:-mt-20 ml-12 md:ml-24 lg:-mt-8 lg:ml-44"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <h1 className="text-2xl max-w-4xl mx-auto md:text-3xl my-3 md:my-5 lg:text-5xl text-center font-bold">
          Explore the World of Entertainment with ShowFlim
        </h1>
        <h3 className="text-center max-w-3xl mx-auto  font-semibold text-base md:text-xl">
          Immerse yourself in a vast collection of movies and TV shows. ShowFlim
          provides the ultimate streaming experience for cinephiles.
        </h3>
        <div className="text-center mt-2 md:mt-4">
          <Link
            to={"/all-shows"}
            className="btn text-center text-sm md:text-base bg-red-500 text-white border-none hover:text-black hover:bg-gray-200"
          >
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
AOS.init();
