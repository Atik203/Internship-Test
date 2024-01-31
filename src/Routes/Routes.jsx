import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import ErrorPage from "./../Pages/ErrorPage/ErrorPage";
import MyBooking from "../Pages/MyBooking/MyBooking";
import AllShows from "../Pages/AllShows/AllShows";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-shows",
        element: <AllShows></AllShows>,
      },
      {
        path: "my-booking",
        element: <MyBooking></MyBooking>,
      },
    ],
  },
]);
export default router;
