import { useState } from 'react';
import { Cocktail } from '../types/cocktail';
import { Star, Heart, Filter, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CocktailListProps {
  cocktails: Cocktail[];
  onCocktailSelect: (cocktail: Cocktail) => void;
  onToggleFavourite: (id: string) => void;
  onToggleHasHad: (id: string) => void;
  onUpdateRating: (id: string, rating: number) => void;
  onAddClick: () => void;
  darkMode?: boolean;
}

export function CocktailList({
  cocktails,
  onCocktailSelect,
  onToggleFavourite,
  onToggleHasHad,
  onUpdateRating,
  onAddClick,
  darkMode = false,
}: CocktailListProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    baseSpirit: 'all',
    hasHad: 'all',
    favourites: false,
    minRating: 0,
  });

  const filteredCocktails = cocktails.filter((cocktail) => {
    if (filters.baseSpirit !== 'all' && cocktail.baseSpirit !== filters.baseSpirit) {
      return false;
    }
    if (filters.hasHad === 'had' && !cocktail.hasHad) {
      return false;
    }
    if (filters.hasHad === 'notHad' && cocktail.hasHad) {
      return false;
    }
    if (filters.favourites && !cocktail.isFavourite) {
      return false;
    }
    if (filters.minRating > 0 && (cocktail.rating || 0) < filters.minRating) {
      return false;
    }
    return true;
  });

  const baseSpirits = ['all', ...Array.from(new Set(cocktails.map((c) => c.baseSpirit)))];

  return (
    <div className="pb-32 px-4 pt-16">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between"
        >
          <div>
            <h1 className={darkMode ? 'text-gray-100' : 'text-gray-800'}>All Cocktails</h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{filteredCocktails.length} cocktails</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`backdrop-blur-xl border rounded-2xl shadow-lg shadow-black/5 p-3 transition-all ${
              showFilters 
                ? 'bg-[#4281A4]/80 text-white border-[#4281A4]/40' 
                : darkMode
                  ? 'bg-gray-800/40 text-gray-300 border-gray-700/40 hover:bg-gray-800/60'
                  : 'bg-white/30 text-gray-700 border-white/40 hover:bg-white/40'
            }`}
          >
            <Filter size={24} />
          </button>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className={`backdrop-blur-xl border rounded-3xl shadow-xl shadow-black/10 p-6 ${
                darkMode ? 'bg-gray-800/40 border-gray-700/40' : 'bg-white/30 border-white/40'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={darkMode ? 'text-gray-100' : 'text-gray-800'}>Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className={darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Base Spirit Filter */}
                <div className="mb-4">
                  <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Base Spirit</label>
                  <div className="flex flex-wrap gap-2">
                    {baseSpirits.map((spirit) => (
                      <button
                        key={spirit}
                        onClick={() => setFilters({ ...filters, baseSpirit: spirit })}
                        className={`px-4 py-2 rounded-xl text-sm transition-all ${
                          filters.baseSpirit === spirit
                            ? 'bg-[#4281A4]/80 text-white backdrop-blur-sm shadow-lg'
                            : darkMode
                              ? 'bg-gray-700/40 text-gray-300 hover:bg-gray-700/60'
                              : 'bg-white/40 text-gray-700 hover:bg-white/60'
                        }`}
                      >
                        {spirit === 'all' ? 'All' : spirit}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Has Had Filter */}
                <div className="mb-4">
                  <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'all', label: 'All' },
                      { value: 'had', label: 'Had' },
                      { value: 'notHad', label: "Haven't Had" },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setFilters({ ...filters, hasHad: value })}
                        className={`flex-1 px-4 py-2 rounded-xl text-sm transition-all ${
                          filters.hasHad === value
                            ? 'bg-[#48A9A6]/80 text-white backdrop-blur-sm shadow-lg'
                            : darkMode
                              ? 'bg-gray-700/40 text-gray-300 hover:bg-gray-700/60'
                              : 'bg-white/40 text-gray-700 hover:bg-white/60'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Favourites Toggle */}
                <div className="mb-4">
                  <button
                    onClick={() => setFilters({ ...filters, favourites: !filters.favourites })}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                      filters.favourites
                        ? 'bg-[#C1666B]/80 text-white backdrop-blur-sm shadow-lg'
                        : darkMode
                          ? 'bg-gray-700/40 text-gray-300 hover:bg-gray-700/60'
                          : 'bg-white/40 text-gray-700 hover:bg-white/60'
                    }`}
                  >
                    <span className="text-sm">Favourites Only</span>
                    <Heart size={18} fill={filters.favourites ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Min Rating Filter */}
                <div>
                  <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Minimum Rating</label>
                  <div className="flex gap-2">
                    {[0, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilters({ ...filters, minRating: rating })}
                        className={`flex-1 px-4 py-2 rounded-xl text-sm transition-all ${
                          filters.minRating === rating
                            ? 'bg-[#D4B483]/90 text-white backdrop-blur-sm shadow-lg'
                            : darkMode
                              ? 'bg-gray-700/40 text-gray-300 hover:bg-gray-700/60'
                              : 'bg-white/40 text-gray-700 hover:bg-white/60'
                        }`}
                      >
                        {rating === 0 ? 'Any' : `${rating}★`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cocktail List */}
        <div className="space-y-4">
          {filteredCocktails.map((cocktail, index) => (
            <motion.div
              key={cocktail.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`backdrop-blur-xl border rounded-3xl shadow-xl shadow-black/10 overflow-hidden ${
                darkMode ? 'bg-gray-800/40 border-gray-700/40' : 'bg-white/30 border-white/40'
              }`}
            >
              <button
                onClick={() => onCocktailSelect(cocktail)}
                className={`w-full p-4 text-left transition-all ${
                  darkMode ? 'hover:bg-gray-700/30' : 'hover:bg-white/20'
                }`}
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-[#48A9A6] to-[#4281A4] flex-shrink-0">
                    <img
                      src={cocktail.imageUrl}
                      alt={cocktail.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={darkMode ? 'text-gray-100' : 'text-gray-800'}>{cocktail.name}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{cocktail.baseSpirit}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavourite(cocktail.id);
                        }}
                        className="p-1"
                      >
                        <Heart
                          size={20}
                          className={cocktail.isFavourite ? 'text-[#C1666B]' : 'text-gray-400'}
                          fill={cocktail.isFavourite ? 'currentColor' : 'none'}
                        />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {cocktail.flavourProfile.slice(0, 3).map((flavour) => (
                        <span
                          key={flavour}
                          className="text-xs px-2 py-1 bg-white/50 backdrop-blur-sm rounded-lg text-gray-700"
                        >
                          {flavour}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>

              {/* Actions */}
              <div className="px-4 pb-4 flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleHasHad(cocktail.id);
                  }}
                  className={`flex-1 px-4 py-2 rounded-xl text-sm transition-all ${
                    cocktail.hasHad
                      ? 'bg-[#48A9A6]/80 text-white backdrop-blur-sm shadow-lg'
                      : 'bg-white/40 text-gray-700 hover:bg-white/60'
                  }`}
                >
                  {cocktail.hasHad ? 'Had it ✓' : 'Mark as Had'}
                </button>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateRating(cocktail.id, star);
                      }}
                      className="p-1"
                    >
                      <Star
                        size={16}
                        className={
                          (cocktail.rating || 0) >= star ? 'text-[#D4B483]' : 'text-gray-400'
                        }
                        fill={(cocktail.rating || 0) >= star ? 'currentColor' : 'none'}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCocktails.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600">No cocktails match your filters</p>
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onAddClick}
        className="fixed bottom-32 right-6 w-16 h-16 bg-gradient-to-r from-[#4281A4] to-[#48A9A6] text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-[#4281A4]/50 transition-shadow"
      >
        <Plus size={28} />
      </motion.button>
    </div>
  );
}
