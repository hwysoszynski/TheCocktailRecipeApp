import { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { CocktailList } from './components/CocktailList';
import { SettingsScreen } from './components/SettingsScreen';
import { CocktailDetail } from './components/CocktailDetail';
import { AddCocktailForm } from './components/AddCocktailForm';
import { BottomNav } from './components/BottomNav';
import { Cocktail } from './types/cocktail';
import { AnimatePresence } from 'motion/react';
import { loadCocktails, saveCocktails, loadDarkMode, saveDarkMode } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'list' | 'settings'>('home');
  // Load cocktails from localStorage on initialization
  const [cocktails, setCocktails] = useState<Cocktail[]>(() => loadCocktails());
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  // Load dark mode preference from localStorage on initialization
  const [darkMode, setDarkMode] = useState(() => loadDarkMode());

  // Save cocktails to localStorage whenever they change
  useEffect(() => {
    saveCocktails(cocktails);
  }, [cocktails]);

  // Save dark mode preference to localStorage whenever it changes
  useEffect(() => {
    saveDarkMode(darkMode);
  }, [darkMode]);

  const handleToggleFavourite = (id: string) => {
    setCocktails((prev) =>
      prev.map((cocktail) =>
        cocktail.id === id
          ? { ...cocktail, isFavourite: !cocktail.isFavourite }
          : cocktail
      )
    );
    // Update selected cocktail if it's the one being modified
    if (selectedCocktail?.id === id) {
      setSelectedCocktail((prev) => prev ? { ...prev, isFavourite: !prev.isFavourite } : null);
    }
  };

  const handleToggleHasHad = (id: string) => {
    setCocktails((prev) =>
      prev.map((cocktail) =>
        cocktail.id === id ? { ...cocktail, hasHad: !cocktail.hasHad } : cocktail
      )
    );
    // Update selected cocktail if it's the one being modified
    if (selectedCocktail?.id === id) {
      setSelectedCocktail((prev) => prev ? { ...prev, hasHad: !prev.hasHad } : null);
    }
  };

  const handleUpdateRating = (id: string, rating: number) => {
    setCocktails((prev) =>
      prev.map((cocktail) =>
        cocktail.id === id ? { ...cocktail, rating } : cocktail
      )
    );
    // Update selected cocktail if it's the one being modified
    if (selectedCocktail?.id === id) {
      setSelectedCocktail((prev) => prev ? { ...prev, rating } : null);
    }
  };

  const handleCocktailSelect = (cocktail: Cocktail) => {
    setSelectedCocktail(cocktail);
  };

  const handleCloseDetail = () => {
    setSelectedCocktail(null);
  };

  const handleAddCocktail = (newCocktail: Omit<Cocktail, 'id'>) => {
    // Generate a unique ID based on timestamp to avoid conflicts
    const id = Date.now().toString();
    setCocktails((prev) => [...prev, { ...newCocktail, id }]);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-[#E4DFDA] via-[#D4B483]/20 to-[#48A9A6]/20'
    }`}>
      {/* Main Content */}
      <div className="relative">
        {activeTab === 'home' && (
          <HomeScreen cocktails={cocktails} onCocktailSelect={handleCocktailSelect} darkMode={darkMode} />
        )}
        {activeTab === 'list' && (
          <CocktailList
            cocktails={cocktails}
            onCocktailSelect={handleCocktailSelect}
            onToggleFavourite={handleToggleFavourite}
            onToggleHasHad={handleToggleHasHad}
            onUpdateRating={handleUpdateRating}
            onAddClick={() => setShowAddForm(true)}
            darkMode={darkMode}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsScreen
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} darkMode={darkMode} />

      {/* Cocktail Detail Modal */}
      <AnimatePresence>
        {selectedCocktail && (
          <CocktailDetail
            cocktail={selectedCocktail}
            onClose={handleCloseDetail}
            onToggleFavourite={handleToggleFavourite}
            onToggleHasHad={handleToggleHasHad}
            onUpdateRating={handleUpdateRating}
            darkMode={darkMode}
          />
        )}
      </AnimatePresence>

      {/* Add Cocktail Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <AddCocktailForm
            onClose={() => setShowAddForm(false)}
            onAdd={handleAddCocktail}
            darkMode={darkMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
