import axios from "axios";
import { useEffect, useState } from "react";

const useShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        setShows(response.data);
      } catch (error) {
        console.error("Error fetching", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return [shows, loading, setShows];
};

export default useShows;
