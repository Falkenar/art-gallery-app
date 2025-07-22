import { useState, useEffect } from "react";
import { Shuffle, Plus, Filter, Palette, Heart, Grid3X3, Eye, Star, Building } from "lucide-react";

// Database simulato di opere d'arte
const artworks = [
  {
    id: 1,
    title: "La Gioconda",
    artist: "Leonardo da Vinci",
    year: "1503-1519",
    museum: "Louvre",
    category: "Ritratti",
    theme: "Ritratto",
    religion: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
  },
  {
    id: 2,
    title: "L'Annunciazione",
    artist: "Leonardo da Vinci",
    year: "1472-1475",
    museum: "Uffizi",
    category: "Religioso",
    theme: "Annunciazione",
    religion: true,
    testament: "Nuovo",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Leonardo_da_Vinci_-_Annunciazione_-_Google_Art_Project.jpg/1280px-Leonardo_da_Vinci_-_Annunciazione_-_Google_Art_Project.jpg"
  },
  {
    id: 3,
    title: "La Nascita di Venere",
    artist: "Sandro Botticelli",
    year: "1484-1486",
    museum: "Uffizi",
    category: "Mitologia",
    theme: "Miti greci",
    religion: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg"
  },
  {
    id: 4,
    title: "Giuditta che decapita Oloferne",
    artist: "Caravaggio",
    year: "1598-1602",
    museum: "Palazzo Barberini",
    category: "Religioso",
    theme: "Vecchio Testamento",
    religion: true,
    testament: "Vecchio",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Caravaggio_-_Giuditta_che_taglia_la_testa_a_Oloferne.jpg/800px-Caravaggio_-_Giuditta_che_taglia_la_testa_a_Oloferne.jpg"
  },
  {
    id: 5,
    title: "La Pietà",
    artist: "Michelangelo",
    year: "1498-1499",
    museum: "Basilica di San Pietro",
    category: "Religioso",
    theme: "Pietà",
    religion: true,
    testament: "Nuovo",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Michelangelo%27s_Pieta_5450_cut_out_black.jpg/800px-Michelangelo%27s_Pieta_5450_cut_out_black.jpg"
  },
  {
    id: 6,
    title: "Sansone e Dalila",
    artist: "Peter Paul Rubens",
    year: "1609-1610",
    museum: "National Gallery",
    category: "Religioso",
    theme: "Sansone e Dalila",
    religion: true,
    testament: "Vecchio",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Peter_Paul_Rubens_-_Samson_and_Delilah_-_WGA20280.jpg/1280px-Peter_Paul_Rubens_-_Samson_and_Delilah_-_WGA20280.jpg"
  },
  {
    id: 7,
    title: "Marina con pescatori",
    artist: "Claude Lorrain",
    year: "1640",
    museum: "Louvre",
    category: "Paesaggio",
    theme: "Marine",
    religion: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Claude_Lorrain_-_Seaport_with_the_Embarkation_of_Saint_Ursula_-_Google_Art_Project.jpg/1280px-Claude_Lorrain_-_Seaport_with_the_Embarkation_of_Saint_Ursula_-_Google_Art_Project.jpg"
  },
  {
    id: 8,
    title: "Vocazione di San Matteo",
    artist: "Caravaggio",
    year: "1599-1600",
    museum: "San Luigi dei Francesi",
    category: "Religioso",
    theme: "Nuovo Testamento",
    religion: true,
    testament: "Nuovo",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Calling_of_Saint_Matthew-Caravaggo_%281599-1600%29.jpg/1280px-The_Calling_of_Saint_Matthew-Caravaggo_%281599-1600%29.jpg"
  }
];

const museums = [
  { name: "Louvre", url: "https://www.louvre.fr", icon: "🏛️" },
  { name: "Prado", url: "https://www.museodelprado.es", icon: "🎨" },
  { name: "Uffizi", url: "https://www.uffizi.it", icon: "🏛️" },
  { name: "Metropolitan", url: "https://www.metmuseum.org", icon: "🏢" },
  { name: "National Gallery", url: "https://www.nationalgallery.org.uk", icon: "🖼️" },
  { name: "Rijksmuseum", url: "https://www.rijksmuseum.nl", icon: "🏛️" }
];

const App = () => {
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [activeView, setActiveView] = useState('random');
  const [filters, setFilters] = useState({
    category: 'all',
    theme: 'all',
    artist: 'all',
    museum: 'all'
  });

  useEffect(() => {
    getRandomArtwork();
  }, []);

  const getRandomArtwork = () => {
    const filteredArtworks = getFilteredArtworks();
    if (filteredArtworks.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredArtworks.length);
      setCurrentArtwork(filteredArtworks[randomIndex]);
    }
  };

  const getFilteredArtworks = () => {
    return artworks.filter(artwork => {
      if (filters.category !== 'all' && artwork.category !== filters.category) return false;
      if (filters.theme !== 'all' && artwork.theme !== filters.theme) return false;
      if (filters.artist !== 'all' && artwork.artist !== filters.artist) return false;
      if (filters.museum !== 'all' && artwork.museum !== filters.museum) return false;
      return true;
    });
  };

  const createGallery = (type, value, name) => {
    let filteredArtworks = [];
    
    switch(type) {
      case 'artist':
        filteredArtworks = artworks.filter(art => art.artist === value);
        break;
      case 'theme':
        filteredArtworks = artworks.filter(art => art.theme === value);
        break;
      case 'museum':
        filteredArtworks = artworks.filter(art => art.museum === value);
        break;
      case 'category':
        filteredArtworks = artworks.filter(art => art.category === value);
        break;
    }

    const newGallery = {
      id: Date.now(),
      name: name || `Galleria ${value}`,
      artworks: filteredArtworks,
      type,
      value
    };

    setGalleries([...galleries, newGallery]);
  };

  const deleteGallery = (id) => {
    setGalleries(galleries.filter(g => g.id !== id));
  };

  const uniqueArtists = [...new Set(artworks.map(art => art.artist))];
  const uniqueThemes = [...new Set(artworks.map(art => art.theme))];
  const uniqueCategories = [...new Set(artworks.map(art => art.category))];
  const uniqueMuseums = [...new Set(artworks.map(art => art.museum))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Galleria Virtuale
          </h1>
          <p className="text-xl text-gray-300">Scopri l'arte del mondo, crea le tue gallerie</p>
        </header>

        {/* Navigation */}
        <nav className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-full p-2">
            <button
              onClick={() => setActiveView('random')}
              className={`px-6 py-3 rounded-full transition-all ${
                activeView === 'random' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Shuffle className="inline w-5 h-5 mr-2" />
              Scoperta
            </button>
            <button
              onClick={() => setActiveView('galleries')}
              className={`px-6 py-3 rounded-full transition-all ${
                activeView === 'galleries' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Grid3X3 className="inline w-5 h-5 mr-2" />
              Le Mie Gallerie
            </button>
            <button
              onClick={() => setActiveView('museums')}
              className={`px-6 py-3 rounded-full transition-all ${
                activeView === 'museums' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Building className="inline w-5 h-5 mr-2" />
              Musei
            </button>
          </div>
        </nav>

        {/* Random Discovery View */}
        {activeView === 'random' && (
          <div className="space-y-8">
            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filtri
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="bg-white/20 text-white rounded-lg p-2 backdrop-blur-sm"
                >
                  <option value="all">Tutte le categorie</option>
                  {uniqueCategories.map(cat => (
                    <option key={cat} value={cat} className="text-black">{cat}</option>
                  ))}
                </select>
                <select
                  value={filters.theme}
                  onChange={(e) => setFilters({...filters, theme: e.target.value})}
                  className="bg-white/20 text-white rounded-lg p-2 backdrop-blur-sm"
                >
                  <option value="all">Tutti i temi</option>
                  {uniqueThemes.map(theme => (
                    <option key={theme} value={theme} className="text-black">{theme}</option>
                  ))}
                </select>
                <select
                  value={filters.artist}
                  onChange={(e) => setFilters({...filters, artist: e.target.value})}
                  className="bg-white/20 text-white rounded-lg p-2 backdrop-blur-sm"
                >
                  <option value="all">Tutti gli artisti</option>
                  {uniqueArtists.map(artist => (
                    <option key={artist} value={artist} className="text-black">{artist}</option>
                  ))}
                </select>
                <select
                  value={filters.museum}
                  onChange={(e) => setFilters({...filters, museum: e.target.value})}
                  className="bg-white/20 text-white rounded-lg p-2 backdrop-blur-sm"
                >
                  <option value="all">Tutti i musei</option>
                  {uniqueMuseums.map(museum => (
                    <option key={museum} value={museum} className="text-black">{museum}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={getRandomArtwork}
                className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105"
              >
                <Shuffle className="inline w-5 h-5 mr-2" />
                Nuova Opera Casuale
              </button>
            </div>

            {/* Current Artwork Display */}
            {currentArtwork && (
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center">
                <div className="max-w-2xl mx-auto">
                  <img
                    src={currentArtwork.image}
                    alt={currentArtwork.title}
                    className="w-full h-96 object-contain rounded-2xl mb-6 bg-black/20"
                  />
                  <h2 className="text-3xl font-bold text-white mb-2">{currentArtwork.title}</h2>
                  <p className="text-xl text-purple-300 mb-2">{currentArtwork.artist}</p>
                  <p className="text-gray-400 mb-4">{currentArtwork.year} • {currentArtwork.museum}</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="bg-purple-600/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentArtwork.category}
                    </span>
                    <span className="bg-pink-600/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentArtwork.theme}
                    </span>
                  </div>
                  
                  {/* Quick Gallery Creation */}
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => createGallery('artist', currentArtwork.artist)}
                      className="bg-blue-600/50 hover:bg-blue-600/70 text-white px-4 py-2 rounded-full text-sm transition-all"
                    >
                      <Plus className="inline w-4 h-4 mr-1" />
                      Galleria {currentArtwork.artist}
                    </button>
                    <button
                      onClick={() => createGallery('theme', currentArtwork.theme)}
                      className="bg-green-600/50 hover:bg-green-600/70 text-white px-4 py-2 rounded-full text-sm transition-all"
                    >
                      <Plus className="inline w-4 h-4 mr-1" />
                      Tema: {currentArtwork.theme}
                    </button>
                    <button
                      onClick={() => createGallery('museum', currentArtwork.museum)}
                      className="bg-orange-600/50 hover:bg-orange-600/70 text-white px-4 py-2 rounded-full text-sm transition-all"
                    >
                      <Plus className="inline w-4 h-4 mr-1" />
                      {currentArtwork.museum}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Galleries View */}
        {activeView === 'galleries' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Le Tue Gallerie Virtuali</h2>
              <p className="text-gray-300">Hai creato {galleries.length} gallerie personalizzate</p>
            </div>
            
            {galleries.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center">
                <Palette className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">Nessuna galleria ancora</h3>
                <p className="text-gray-400">Inizia dalla sezione "Scoperta" per creare le tue prime gallerie!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleries.map(gallery => (
                  <div key={gallery.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-white">{gallery.name}</h3>
                      <button
                        onClick={() => deleteGallery(gallery.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-gray-400 mb-4">{gallery.artworks.length} opere</p>
                    {gallery.artworks.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {gallery.artworks.slice(0, 4).map(artwork => (
                          <img
                            key={artwork.id}
                            src={artwork.image}
                            alt={artwork.title}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                    <button className="w-full bg-purple-600/50 hover:bg-purple-600/70 text-white py-2 rounded-lg transition-all">
                      <Eye className="inline w-4 h-4 mr-2" />
                      Visualizza Galleria
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Museums View */}
        {activeView === 'museums' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">I Grandi Musei del Mondo</h2>
              <p className="text-gray-300">Esplora le collezioni dei musei più prestigiosi</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {museums.map(museum => (
                <div key={museum.name} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-4">{museum.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-4">{museum.name}</h3>
                  <div className="space-y-2">
                    <a
                      href={museum.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600/50 hover:bg-blue-600/70 text-white py-2 rounded-lg transition-all"
                    >
                      <Building className="inline w-4 h-4 mr-2" />
                      Sito Ufficiale
                    </a>
                    <button
                      onClick={() => createGallery('museum', museum.name)}
                      className="block w-full bg-purple-600/50 hover:bg-purple-600/70 text-white py-2 rounded-lg transition-all"
                    >
                      <Plus className="inline w-4 h-4 mr-2" />
                      Crea Galleria
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;