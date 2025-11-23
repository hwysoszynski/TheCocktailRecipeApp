import { useState } from 'react';
import { X, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { Cocktail, Ingredient } from '../types/cocktail';
import { motion } from 'motion/react';

interface EditCocktailFormProps {
  cocktail: Cocktail;
  onClose: () => void;
  onSave: (id: string, cocktail: Omit<Cocktail, 'id'>) => void;
  darkMode?: boolean;
}

export function EditCocktailForm({ cocktail, onClose, onSave, darkMode = false }: EditCocktailFormProps) {
  const [name, setName] = useState(cocktail.name);
  const [baseSpirit, setBaseSpirit] = useState(cocktail.baseSpirit);
  const [description, setDescription] = useState(cocktail.description);
  const [imageUrl, setImageUrl] = useState(cocktail.imageUrl);
  const [ingredients, setIngredients] = useState<Ingredient[]>(cocktail.ingredients);
  const [flavourProfile, setFlavourProfile] = useState<string[]>(cocktail.flavourProfile);
  const [flavourInput, setFlavourInput] = useState('');
  const [instructions, setInstructions] = useState<string[]>(cocktail.instructions);

  const units = ['ml', 'oz', 'cl', 'tsp', 'tbsp', 'dashes', 'drops', 'piece', 'leaves', 'wedge', 'cube', 'pinch'];

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: 'ml' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleUpdateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const handleAddFlavour = () => {
    if (flavourInput.trim()) {
      setFlavourProfile([...flavourProfile, flavourInput.trim()]);
      setFlavourInput('');
    }
  };

  const handleRemoveFlavour = (index: number) => {
    setFlavourProfile(flavourProfile.filter((_, i) => i !== index));
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleUpdateInstruction = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const handleSubmit = () => {
    if (!name || !baseSpirit || ingredients.length === 0) {
      alert('Please fill in at least name, base spirit, and one ingredient');
      return;
    }

    const validIngredients = ingredients.filter((ing) => ing.name && ing.amount);
    const validInstructions = instructions.filter((inst) => inst.trim());

    onSave(cocktail.id, {
      name,
      baseSpirit,
      description: description || 'A delicious cocktail',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400',
      ingredients: validIngredients,
      flavourProfile,
      instructions: validInstructions.length > 0 ? validInstructions : ['Mix and enjoy'],
      rating: cocktail.rating,
      hasHad: cocktail.hasHad,
      isFavourite: cocktail.isFavourite,
    });

    onClose();
  };

  const inputClasses = `w-full px-3 py-2.5 backdrop-blur-sm border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4281A4]/50 transition-all text-sm ${
    darkMode 
      ? 'bg-gray-700/60 border-gray-600/60 text-gray-100 placeholder:text-gray-500' 
      : 'bg-white/60 border-white/60 text-gray-900 placeholder:text-gray-600'
  }`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen py-8 px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="mx-auto max-w-md"
        >
          <div className={`backdrop-blur-xl border rounded-3xl shadow-2xl overflow-hidden ${
            darkMode ? 'bg-gray-800/95 border-gray-700/40' : 'bg-white/95 border-white/40'
          }`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4281A4] to-[#48A9A6] p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h2>Edit Cocktail</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 backdrop-blur-xl bg-white/30 border border-white/40 rounded-full flex items-center justify-center hover:bg-white/40 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-white/90">Update your cocktail recipe</p>
            </div>

            {/* Form */}
            <div className="p-4 sm:p-6 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Basic Info */}
              <div>
                <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cocktail Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Manhattan"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Base Spirit *</label>
                <input
                  type="text"
                  value={baseSpirit}
                  onChange={(e) => setBaseSpirit(e.target.value)}
                  placeholder="e.g., Whiskey, Gin, Rum"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your cocktail..."
                  rows={2}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <div>
                <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Image URL</label>
                <div className="relative">
                  <ImageIcon className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className={`${inputClasses} pl-10`}
                  />
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ingredients *</label>
                  <button
                    onClick={handleAddIngredient}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#4281A4]/80 text-white rounded-xl text-sm hover:bg-[#4281A4] transition-all"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
                <div className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="space-y-2">
                      <input
                        type="text"
                        value={ingredient.name}
                        onChange={(e) => handleUpdateIngredient(index, 'name', e.target.value)}
                        placeholder="Ingredient name"
                        className={inputClasses.replace('rounded-2xl', 'rounded-xl')}
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={ingredient.amount}
                          onChange={(e) => handleUpdateIngredient(index, 'amount', e.target.value)}
                          placeholder="Amt"
                          className={`flex-1 ${inputClasses.replace('rounded-2xl', 'rounded-xl').replace('py-2.5', 'py-2')}`}
                        />
                        <select
                          value={ingredient.unit}
                          onChange={(e) => handleUpdateIngredient(index, 'unit', e.target.value)}
                          className={`flex-1 px-2 ${inputClasses.replace('rounded-2xl', 'rounded-xl').replace('py-2.5', 'py-2').replace('w-full px-3', '')}`}
                        >
                          {units.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                        {ingredients.length > 1 && (
                          <button
                            onClick={() => handleRemoveIngredient(index)}
                            className="px-3 py-2 text-[#C1666B] hover:bg-[#C1666B]/10 rounded-xl transition-all flex-shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flavour Profile */}
              <div>
                <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Flavour Profile</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={flavourInput}
                    onChange={(e) => setFlavourInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFlavour())}
                    placeholder="e.g., Sweet, Bitter"
                    className={`flex-1 min-w-0 ${inputClasses.replace('rounded-2xl', 'rounded-xl').replace('py-2.5', 'py-2')}`}
                  />
                  <button
                    onClick={handleAddFlavour}
                    className="px-3 py-2 flex-shrink-0 bg-[#D4B483]/90 text-white rounded-xl text-sm hover:bg-[#D4B483] transition-all"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {flavourProfile.map((flavour, index) => (
                    <span
                      key={index}
                      className={`flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-br from-[#D4B483]/30 to-[#C1666B]/20 backdrop-blur-sm border rounded-xl text-sm ${
                        darkMode ? 'border-gray-700/40 text-gray-200' : 'border-white/40 text-gray-700'
                      }`}
                    >
                      {flavour}
                      <button onClick={() => handleRemoveFlavour(index)} className="hover:text-[#C1666B]">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Instructions</label>
                  <button
                    onClick={handleAddInstruction}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#48A9A6]/80 text-white rounded-xl text-sm hover:bg-[#48A9A6] transition-all"
                  >
                    <Plus size={16} />
                    Add Step
                  </button>
                </div>
                <div className="space-y-3">
                  {instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="w-7 h-7 flex-shrink-0 rounded-full bg-gradient-to-br from-[#4281A4] to-[#48A9A6] flex items-center justify-center text-white text-sm mt-1">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={instruction}
                        onChange={(e) => handleUpdateInstruction(index, e.target.value)}
                        placeholder="Step description"
                        className={`flex-1 min-w-0 ${inputClasses.replace('rounded-2xl', 'rounded-xl').replace('py-2.5', 'py-2')}`}
                      />
                      {instructions.length > 1 && (
                        <button
                          onClick={() => handleRemoveInstruction(index)}
                          className="p-2 flex-shrink-0 text-[#C1666B] hover:bg-[#C1666B]/10 rounded-xl transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={`p-4 sm:p-6 backdrop-blur-sm border-t flex gap-3 ${
              darkMode ? 'bg-gray-800/50 border-gray-700/40' : 'bg-white/50 border-white/40'
            }`}>
              <button
                onClick={onClose}
                className={`flex-1 px-4 py-2.5 rounded-2xl transition-all text-sm ${
                  darkMode ? 'bg-gray-700/60 text-gray-200 hover:bg-gray-700/80' : 'bg-white/60 text-gray-700 hover:bg-white/80'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#4281A4] to-[#48A9A6] text-white rounded-2xl hover:shadow-lg transition-all text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
