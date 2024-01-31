import React from "react";
import { Helmet } from "react-helmet";

const MyBooking = () => {
  return (
    <div className="w-11/12 mx-auto max-w-[1440px] min-h-screen">
      <Helmet>
        <title>ShowFlim | My Bookings</title>
      </Helmet>
      <h1>Currently none</h1>
    </div>
  );
};

export default MyBooking;
