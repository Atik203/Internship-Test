import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const TableData = ({ booking, handleCancel }) => {
  const { Name, image, schedule, network, name, date, email, id } = booking;

  const country = network?.country?.name || "United States";
  const showTime = schedule?.time || "Not Available";
  const showDay = schedule?.days[0] || "Not Available";
  const imageUrl =
    image?.original ||
    image?.medium ||
    "https://i.ibb.co/0cbkS4X/No-image-available-svg.png";

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={imageUrl} alt="Avatar " />
            </div>
          </div>
          <div>
            <Link to={`/details/${id}`}>
              {" "}
              <div className="font-bold hover:text-red-500  hover:underline">
                {name}
              </div>
            </Link>
            <div className="text-sm opacity-50">{country}</div>
          </div>
        </div>
      </td>
      <td>{Name}</td>
      <td>{email}</td>
      <td>
        {showTime} & {showDay}
      </td>
      <td>{date}</td>
      <th>
        <button
          onClick={() => handleCancel(id)}
          className="btn bg-red-500 px-2 text-white hover:text-black hover:bg-gray-300 btn-sm"
        >
          Cancel
        </button>
      </th>
    </tr>
  );
};

TableData.propTypes = {
  booking: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    image: PropTypes.shape({
      original: PropTypes.string,
      medium: PropTypes.string,
    }),
    schedule: PropTypes.shape({
      time: PropTypes.string,
      days: PropTypes.arrayOf(PropTypes.string),
    }),
    network: PropTypes.shape({
      country: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    language: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default TableData;
