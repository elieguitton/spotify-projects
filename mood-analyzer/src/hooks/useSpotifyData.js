import { useState, useEffect } from "react";

const useSpotifyData = (type) => {
  const [data, setData] = useState({
    long_term: [],
    medium_term: [],
    short_term: []
  });

  useEffect(() => {
    const fetchData = async (timeRange) => {
      const token = localStorage.getItem("spotify_token");
      if (!token) return;

      const res = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=5`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      return result.items || [];
    };

    const fetchAllData = async () => {
      const longTerm = await fetchData("long_term");
      const mediumTerm = await fetchData("medium_term");
      const shortTerm = await fetchData("short_term");

      setData({ long_term: longTerm, medium_term: mediumTerm, short_term: shortTerm });
    };

    fetchAllData();
  }, [type]);

  return data;
};

export default useSpotifyData;
