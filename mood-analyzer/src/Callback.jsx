import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1).split("&").reduce((acc, item) => {
      let parts = item.split("=");
      acc[parts[0]] = decodeURIComponent(parts[1]);
      return acc;
    }, {});

    if (hash.access_token) {
      localStorage.setItem("spotify_token", hash.access_token);
      navigate("/dashboard");
    }
  }, []);

  return <div>Connexion en cours...</div>;
};

export default Callback;
