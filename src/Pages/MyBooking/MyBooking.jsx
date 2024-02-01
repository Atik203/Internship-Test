import { useState } from "react";
import { Helmet } from "react-helmet";
import TableData from "../../Components/TableData/TableData";
import Swal from "sweetalert2";

const MyBooking = () => {
  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("booking")) || []
  );
  const handleCancel = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedBookings = bookings.filter((booking) => booking.id !== id);
        localStorage.setItem("booking", JSON.stringify(updatedBookings));
        setBookings(updatedBookings);

        Swal.fire({
          title: "Cancelled",
          text: "Booking has been cancelled.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto max-w-[1440px] min-h-screen">
      <Helmet>
        <title>ShowFlim | My Bookings</title>
      </Helmet>
      {bookings.length > 0 ? (
        <div className="overflow-x-auto my-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Show Title</th>
                <th>Name</th>
                <th>Email</th>
                <th>Booking Date</th>
                <th>Show Time & Day</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <TableData
                  key={index}
                  booking={booking}
                  handleCancel={handleCancel}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-20">
          <h1 className="text-2xl font-bold">You have not made any booking</h1>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
