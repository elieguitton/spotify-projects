import { useState } from "react";
import useSpotifyData from "./hooks/useSpotifyData";
import TabButton from "./components/TabButton";
import TopList from "./components/TopList";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("musiques");
  const [activeSubTab, setActiveSubTab] = useState("long_term");

  const topTracks = useSpotifyData("tracks");
  const topArtists = useSpotifyData("artists");

  const getActiveData = () => (activeTab === "musiques" ? topTracks[activeSubTab] : topArtists[activeSubTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7EDE2] to-[#F3D9DC] text-gray-800 font-light">
      {/* 🌍 Barre de navigation supérieure */}
      <nav className="flex justify-center gap-6 py-6 bg-[#1B1B1B] text-black shadow-lg">
        <TabButton label="🎶 Musiques" isActive={activeTab === "musiques"} onClick={() => setActiveTab("musiques")} />
        <TabButton label="🎤 Artistes" isActive={activeTab === "artistes"} onClick={() => setActiveTab("artistes")} />
      </nav>

      <div className="max-w-3xl mx-auto p-6">
        {/* 🗂️ Sous-onglets */}
        <div className="flex justify-center gap-4 my-6">
          <TabButton label="Top 12 mois" isActive={activeSubTab === "long_term"} onClick={() => setActiveSubTab("long_term")} />
          <TabButton label="Top 6 mois" isActive={activeSubTab === "medium_term"} onClick={() => setActiveSubTab("medium_term")} />
          <TabButton label="Top 4 semaines" isActive={activeSubTab === "short_term"} onClick={() => setActiveSubTab("short_term")} />
</div>

        {/* 📋 Liste des musiques ou artistes selon l'onglet actif */}
        <TopList items={getActiveData()} type={activeTab === "musiques" ? "tracks" : "artists"} />
      </div>
    </div>
  );
};

export default Dashboard;
