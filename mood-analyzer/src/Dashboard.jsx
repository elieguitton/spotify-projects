import { useState, useEffect } from "react";
import useSpotifyData from "./hooks/useSpotifyData";
import TabButton from "./components/TabButton";
import TopList from "./components/TopList";
import { fetchAudioFeatures } from "./utils"; // N'oublie pas d'importer cette fonction

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("musiques");
  const [activeSubTab, setActiveSubTab] = useState("long_term");
  const [selectedTrackId, setSelectedTrackId] = useState(null); // Suivre le morceau sélectionné
  const [audioFeatures, setAudioFeatures] = useState(null); // Suivre les caractéristiques audio du morceau sélectionné

  const topTracks = useSpotifyData("tracks");
  const topArtists = useSpotifyData("artists");

  const getActiveData = () =>
    activeTab === "musiques"
      ? topTracks[activeSubTab]
      : topArtists[activeSubTab];

  useEffect(() => {
    // Réinitialiser les caractéristiques audio quand le morceau sélectionné change
    if (selectedTrackId) {
      const fetchFeatures = async () => {
        const features = await fetchAudioFeatures(selectedTrackId);
        setAudioFeatures(features);
      };
      fetchFeatures();
    } else {
      setAudioFeatures(null); // Réinitialiser si aucun morceau n'est sélectionné
    }
  }, [selectedTrackId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7EDE2] to-[#F3D9DC] text-gray-800 font-light">
      {/* Barre de navigation supérieure */}
      <nav className="flex justify-center gap-6 py-6 bg-[#1B1B1B] text-black shadow-lg">
        <TabButton
          label="🎶 Musiques"
          isActive={activeTab === "musiques"}
          onClick={() => setActiveTab("musiques")}
        />
        <TabButton
          label="🎤 Artistes"
          isActive={activeTab === "artistes"}
          onClick={() => setActiveTab("artistes")}
        />
      </nav>

      <h2 className="flex justify-center gap-6 py-6">
        MAJ: Spotify a changé sa politique d'API donc beaucoup de features sont
        dépréciées et ne fonctionnent plus.
      </h2>

      <div className="max-w-3xl mx-auto p-6">
        {/* Sous-onglets pour la période */}
        <div className="flex justify-center gap-4 my-6">
          <TabButton
            label="Top 12 mois"
            isActive={activeSubTab === "long_term"}
            onClick={() => setActiveSubTab("long_term")}
          />
          <TabButton
            label="Top 6 mois"
            isActive={activeSubTab === "medium_term"}
            onClick={() => setActiveSubTab("medium_term")}
          />
          <TabButton
            label="Top 4 semaines"
            isActive={activeSubTab === "short_term"}
            onClick={() => setActiveSubTab("short_term")}
          />
        </div>

        {/* Liste des musiques ou artistes */}
        <TopList
          items={getActiveData()}
          type={activeTab === "musiques" ? "tracks" : "artists"}
          onTrackClick={(trackId) => setSelectedTrackId(trackId)} // Passer la fonction de clic
        />

        {/* Affichage des audio features quand un morceau est sélectionné */}
        {selectedTrackId && audioFeatures && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">
              Audio Features de "
              {
                getActiveData().find((track) => track.id === selectedTrackId)
                  ?.name
              }
              "
            </h3>
            <ul>
              <li>
                <strong>Acousticness:</strong> {audioFeatures.acousticness}
              </li>
              <li>
                <strong>Danceability:</strong> {audioFeatures.danceability}
              </li>
              <li>
                <strong>Instrumentalness:</strong>{" "}
                {audioFeatures.instrumentalness}
              </li>
              <li>
                <strong>Loudness:</strong> {audioFeatures.loudness}
              </li>
              <li>
                <strong>Speechiness:</strong> {audioFeatures.speechiness}
              </li>
              <li>
                <strong>Tempo:</strong> {audioFeatures.tempo} BPM
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
