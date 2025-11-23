import { X, Star, Heart, Check, Edit2 } from 'lucide-react';
import { Cocktail } from '../types/cocktail';
import { motion } from 'motion/react';

interface CocktailDetailProps {
  cocktail: Cocktail;
  onClose: () => void;
  onToggleFavourite: (id: string) => void;
  onToggleHasHad: (id: string) => void;
  onUpdateRating: (id: string, rating: number) => void;
  onEdit: (cocktail: Cocktail) => void;
  darkMode?: boolean;
}

export function CocktailDetail({
  cocktail,
  onClose,
  onToggleFavourite,
  onToggleHasHad,
  onUpdateRating,
  onEdit,
  darkMode = false,
}: CocktailDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto"
      >
        <div className="mx-auto max-w-md px-4 pb-8">
          <div className={`backdrop-blur-xl border rounded-t-[2rem] shadow-2xl overflow-hidden ${
            darkMode ? 'bg-gray-800/95 border-gray-700/40' : 'bg-white/95 border-white/40'
          }`}>
            {/* Header Image */}
            <div className="relative h-64 bg-gradient-to-br from-[#48A9A6] to-[#4281A4]">
              <img
                src={cocktail.imageUrl}
                alt={cocktail.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 backdrop-blur-xl bg-white/30 border border-white/40 rounded-full flex items-center justify-center hover:bg-white/40 transition-all"
              >
                <X size={20} className="text-white" />
              </button>

              {/* Edit Button */}
              <button
                onClick={() => onEdit(cocktail)}
                className="absolute top-4 right-16 w-10 h-10 backdrop-blur-xl bg-white/30 border border-white/40 rounded-full flex items-center justify-center hover:bg-white/40 transition-all"
              >
                <Edit2 size={18} className="text-white" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-white mb-1">{cocktail.name}</h2>
                <p className="text-white/90">{cocktail.baseSpirit}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Quick Actions */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => onToggleFavourite(cocktail.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl transition-all ${
                    cocktail.isFavourite
                      ? 'bg-[#C1666B]/80 text-white backdrop-blur-sm shadow-lg'
                      : darkMode
                        ? 'bg-gray-700/60 text-gray-200 hover:bg-gray-700/80'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80'
                  }`}
                >
                  <Heart
                    size={18}
                    fill={cocktail.isFavourite ? 'currentColor' : 'none'}
                  />
                  <span className="text-sm">Favourite</span>
                </button>
                <button
                  onClick={() => onToggleHasHad(cocktail.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl transition-all ${
                    cocktail.hasHad
                      ? 'bg-[#48A9A6]/80 text-white backdrop-blur-sm shadow-lg'
                      : darkMode
                        ? 'bg-gray-700/60 text-gray-200 hover:bg-gray-700/80'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80'
                  }`}
                >
                  <Check size={18} />
                  <span className="text-sm">{cocktail.hasHad ? 'Had It' : 'Mark as Had'}</span>
                </button>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h3 className={`mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Your Rating</h3>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => onUpdateRating(cocktail.id, star)}
                      className="p-2 hover:scale-110 transition-transform"
                    >
                      <Star
                        size={28}
                        className={
                          (cocktail.rating || 0) >= star ? 'text-yellow-500' : 'text-gray-300'
                        }
                        fill={(cocktail.rating || 0) >= star ? 'currentColor' : 'none'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className={`mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>About</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{cocktail.description}</p>
              </div>

              {/* Flavour Profile */}
              <div className="mb-6">
                <h3 className={`mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Flavour Profile</h3>
                <div className="flex flex-wrap gap-2">
                  {cocktail.flavourProfile.map((flavour) => (
                    <span
                      key={flavour}
                      className={`px-4 py-2 bg-gradient-to-br from-[#D4B483]/30 to-[#C1666B]/20 backdrop-blur-sm border rounded-xl ${
                        darkMode ? 'border-gray-700/40 text-gray-200' : 'border-white/40 text-gray-700'
                      }`}
                    >
                      {flavour}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-6">
                <h3 className={`mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Ingredients</h3>
                <div className="space-y-2">
                  {cocktail.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between px-4 py-3 backdrop-blur-sm rounded-xl ${
                        darkMode ? 'bg-gray-700/60' : 'bg-white/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#4281A4] to-[#48A9A6]" />
                        <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>{ingredient.name}</span>
                      </div>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {ingredient.amount} {ingredient.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h3 className={`mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Instructions</h3>
                <div className="space-y-3">
                  {cocktail.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-[#4281A4] to-[#48A9A6] flex items-center justify-center text-white">
                        {index + 1}
                      </div>
                      <p className={`pt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}