// TopList.jsx
const TopList = ({ items, type, onTrackClick }) => {
    return (
      <ul className="space-y-4">
        {items.map(item => (
          <li 
            key={item.id} 
            onClick={() => onTrackClick(item.id)} // Appel de la fonction passée en prop
            className="flex items-center gap-3 p-3 bg-[#FFCAD4] rounded-md shadow-sm"
          >
            {type === "tracks" ? (
              <>
                <img src={item.album.images[0].url} alt={item.name} className="w-12 h-12 inline mr-4" />
                {item.name} - {item.artists.map(artist => artist.name).join(', ')}
              </>
            ) : (
              <>{item.name}</>
            )}
          </li>
        ))}
      </ul>
    );
  };
  
  export default TopList;
  