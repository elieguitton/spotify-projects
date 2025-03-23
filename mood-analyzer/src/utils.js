

// Fonction pour récupérer les features d'une chanson
export const fetchAudioFeatures = async (trackId) => {
    const token = 'YOUR_ACCESS_TOKEN';  // Ton token d'accès ici
  
    const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await response.json();
    return data; // Retourne les audio features
  };
  