import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { CocktailList } from './components/CocktailList';
import { SettingsScreen } from './components/SettingsScreen';
import { CocktailDetail } from './components/CocktailDetail';
import { AddCocktailForm } from './components/AddCocktailForm';
import { EditCocktailForm } from './components/EditCocktailForm';
import { BottomNav } from './components/BottomNav';
import { MOCK_COCKTAILS, Cocktail } from './types/cocktail';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'list' | 'settings'>('home');
  const [cocktails, setCocktails] = useState<Cocktail[]>(MOCK_COCKTAILS);
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCocktail, setEditingCocktail] = useState<Cocktail | null>(null);
  const [darkMode, setDarkMode] = useState(false);

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
    const id = (cocktails.length + 1).toString();
    setCocktails((prev) => [...prev, { ...newCocktail, id }]);
  };

  const handleEditCocktail = (id: string, updatedCocktail: Omit<Cocktail, 'id'>) => {
    setCocktails((prev) =>
      prev.map((cocktail) =>
        cocktail.id === id ? { ...updatedCocktail, id } : cocktail
      )
    );
    // Update selected cocktail if it's the one being modified
    if (selectedCocktail?.id === id) {
      setSelectedCocktail({ ...updatedCocktail, id });
    }
  };

  const handleOpenEdit = (cocktail: Cocktail) => {
    setEditingCocktail(cocktail);
    setSelectedCocktail(null); // Close detail view
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
            onEdit={handleOpenEdit}
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

      {/* Edit Cocktail Form Modal */}
      <AnimatePresence>
        {editingCocktail && (
          <EditCocktailForm
            cocktail={editingCocktail}
            onClose={() => setEditingCocktail(null)}
            onSave={handleEditCocktail}
            darkMode={darkMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}