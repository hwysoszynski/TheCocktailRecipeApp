import { useState } from 'react';
import { Search, Wine, Sparkles, Droplet } from 'lucide-react';
import { Cocktail } from '../types/cocktail';
import { motion } from 'motion/react';

interface HomeScreenProps {
  cocktails: Cocktail[];
  onCocktailSelect: (cocktail: Cocktail) => void;
  darkMode?: boolean;
}

export function HomeScreen({ cocktails, onCocktailSelect, darkMode = false }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'ingredient' | 'flavour' | 'spirit'>('all');

  const filteredCocktails = cocktails.filter((cocktail) => {
    if (!searchQuery) return false;

    const query = searchQuery.toLowerCase();

    switch (searchType) {
      case 'ingredient':
        return cocktail.ingredients.some((ing) => ing.name.toLowerCase().includes(query));
      case 'flavour':
        return cocktail.flavourProfile.some((flavour) => flavour.toLowerCase().includes(query));
      case 'spirit':
        return cocktail.baseSpirit.toLowerCase().includes(query);
      default:
        return (
          cocktail.name.toLowerCase().includes(query) ||
          cocktail.ingredients.some((ing) => ing.name.toLowerCase().includes(query)) ||
          cocktail.flavourProfile.some((flavour) => flavour.toLowerCase().includes(query)) ||
          cocktail.baseSpirit.toLowerCase().includes(query)
        );
    }
  });

  const popularSpirits = ['Gin', 'Vodka', 'Rum', 'Whiskey', 'Tequila'];
  const popularFlavours = ['Citrus', 'Sweet', 'Bitter', 'Fresh', 'Strong'];

  return (
    <div className="pb-28 px-4 pt-6 h-screen overflow-y-auto">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <h1 className={darkMode ? 'text-gray-100 mb-1' : 'text-gray-800 mb-1'}>Cocktail Finder</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Discover your perfect drink</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4"
        >
          <div className={`backdrop-blur-xl border rounded-3xl shadow-xl shadow-black/10 p-3 ${
            darkMode ? 'bg-gray-800/40 border-gray-700/40' : 'bg-white/30 border-white/40'
          }`}>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
              <input
                type="text"
                placeholder="Search cocktails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-3 py-2.5 backdrop-blur-sm border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4281A4]/50 transition-all text-sm ${
                  darkMode 
                    ? 'bg-gray-700/50 border-gray-600/60 text-gray-100 placeholder:text-gray-500' 
                    : 'bg-white/50 border-white/60 text-gray-900 placeholder:text-gray-500'
                }`}
              />
            </div>

            {/* Search Type Filters */}
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {[
                { value: 'all', label: 'All', icon: Search },
                { value: 'ingredient', label: 'Ingredient', icon: Droplet },
                { value: 'flavour', label: 'Flavour', icon: Sparkles },
                { value: 'spirit', label: 'Spirit', icon: Wine },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setSearchType(value as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap text-sm ${
                    searchType === value
                      ? 'bg-[#4281A4]/80 text-white backdrop-blur-sm shadow-lg'
                      : darkMode
                        ? 'bg-gray-700/40 text-gray-300 hover:bg-gray-700/60'
                        : 'bg-white/40 text-gray-700 hover:bg-white/60'
                  }`}
                >
                  <Icon size={14} />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Search Results */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4"
          >
            <h2 className={`mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Results ({filteredCocktails.length})
            </h2>
            <div className="space-y-2">
              {filteredCocktails.map((cocktail, index) => (
                <motion.button
                  key={cocktail.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onCocktailSelect(cocktail)}
                  className={`w-full backdrop-blur-xl border rounded-2xl shadow-lg shadow-black/5 p-3 transition-all ${
                    darkMode 
                      ? 'bg-gray-800/40 border-gray-700/40 hover:bg-gray-800/60' 
                      : 'bg-white/30 border-white/40 hover:bg-white/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-[#48A9A6] to-[#4281A4] flex-shrink-0">
                      <img
                        src={cocktail.imageUrl}
                        alt={cocktail.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className={darkMode ? 'text-gray-100' : 'text-gray-800'}>{cocktail.name}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{cocktail.baseSpirit}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cocktail.flavourProfile.slice(0, 2).map((flavour) => (
                          <span
                            key={flavour}
                            className={`text-xs px-2 py-0.5 backdrop-blur-sm rounded-lg ${
                              darkMode 
                                ? 'bg-gray-700/50 text-gray-300' 
                                : 'bg-white/50 text-gray-700'
                            }`}
                          >
                            {flavour}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Access Chips - Only show when no search */}
        {!searchQuery && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4"
            >
              <h2 className={`mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Popular Spirits</h2>
              <div className="flex flex-wrap gap-2">
                {popularSpirits.map((spirit, index) => (
                  <motion.button
                    key={spirit}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    onClick={() => {
                      setSearchType('spirit');
                      setSearchQuery(spirit);
                    }}
                    className={`backdrop-blur-xl bg-gradient-to-br border rounded-2xl shadow-lg shadow-black/5 px-4 py-2.5 transition-all ${
                      darkMode
                        ? 'from-[#4281A4]/30 to-[#48A9A6]/30 border-gray-700/40 hover:from-[#4281A4]/40 hover:to-[#48A9A6]/40'
                        : 'from-[#4281A4]/20 to-[#48A9A6]/20 border-white/40 hover:from-[#4281A4]/30 hover:to-[#48A9A6]/30'
                    }`}
                  >
                    <span className={`text-sm ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{spirit}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className={`mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Popular Flavours</h2>
              <div className="flex flex-wrap gap-2">
                {popularFlavours.map((flavour, index) => (
                  <motion.button
                    key={flavour}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    onClick={() => {
                      setSearchType('flavour');
                      setSearchQuery(flavour);
                    }}
                    className={`backdrop-blur-xl bg-gradient-to-br border rounded-2xl shadow-lg shadow-black/5 px-4 py-2.5 transition-all ${
                      darkMode
                        ? 'from-[#D4B483]/30 to-[#C1666B]/30 border-gray-700/40 hover:from-[#D4B483]/40 hover:to-[#C1666B]/40'
                        : 'from-[#D4B483]/30 to-[#C1666B]/20 border-white/40 hover:from-[#D4B483]/40 hover:to-[#C1666B]/30'
                    }`}
                  >
                    <span className={`text-sm ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{flavour}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
