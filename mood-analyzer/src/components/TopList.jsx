const TopList = ({ items, type }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-[#3D405B]">
          {type === "tracks" ? "🎵 Vos morceaux préférés" : "🎤 Vos artistes favoris"}
        </h2>
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 p-3 bg-[#FFCAD4] rounded-md shadow-sm">
              <img
                src={item.images ? item.images[0]?.url : item.album.images[0]?.url}
                alt={item.name}
                className="w-16 h-16 rounded-md shadow-md object-cover"
              />
              <span className="text-[#3D405B]">
                {type === "tracks" ? `${item.name} - ${item.artists.map((artist) => artist.name).join(", ")}` : item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TopList;
  