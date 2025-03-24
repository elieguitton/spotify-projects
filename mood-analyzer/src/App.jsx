import { Routes, Route } from "react-router-dom";
import Callback from "./Callback.jsx";
import Dashboard from "./Dashboard.jsx";
import "./index.css"; // Style global

const CLIENT_ID = "d04b524d7dba4bed82dba73de558c25d";
const REDIRECT_URI = "http://localhost:5173/callback";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = "user-top-read";

function App() {
  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=${RESPONSE_TYPE}`;
  };

  return (
    <div>
      <h1 className="text-center py-4">Spotify API Project</h1>
      <Routes>
        <Route
          path="/"
          element={
            <button onClick={handleLogin}>Se connecter avec Spotify</button>
          }
        />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
