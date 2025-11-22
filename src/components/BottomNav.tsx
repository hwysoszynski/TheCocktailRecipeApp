import { Home, List, Settings } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'list' | 'settings';
  onTabChange: (tab: 'home' | 'list' | 'settings') => void;
  darkMode?: boolean;
}

export function BottomNav({ activeTab, onTabChange, darkMode = false }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-8 pt-4">
      <div className="mx-auto max-w-md">
        <div className={`backdrop-blur-xl border rounded-3xl shadow-xl shadow-black/10 px-6 py-3 ${
          darkMode 
            ? 'bg-gray-800/60 border-gray-700/30' 
            : 'bg-white/20 border-white/30'
        }`}>
          <div className="flex justify-around items-center">
            <button
              onClick={() => onTabChange('home')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === 'home'
                  ? darkMode 
                    ? 'bg-gray-700/60 backdrop-blur-sm shadow-lg'
                    : 'bg-white/40 backdrop-blur-sm shadow-lg'
                  : darkMode
                    ? 'hover:bg-gray-700/30'
                    : 'hover:bg-white/20'
              }`}
            >
              <Home
                className={`transition-all duration-300 ${
                  activeTab === 'home' 
                    ? 'text-[#4281A4] scale-110' 
                    : darkMode 
                      ? 'text-gray-300' 
                      : 'text-gray-700'
                }`}
                size={24}
              />
              <span
                className={`text-xs transition-all duration-300 ${
                  activeTab === 'home' 
                    ? 'text-[#4281A4]' 
                    : darkMode 
                      ? 'text-gray-300' 
                      : 'text-gray-700'
                }`}
              >
                Home
              </span>
            </button>

            <button
              onClick={() => onTabChange('list')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === 'list'
                  ? darkMode 
                    ? 'bg-gray-700/60 backdrop-blur-sm shadow-lg'
                    : 'bg-white/40 backdrop-blur-sm shadow-lg'
                  : darkMode
                    ? 'hover:bg-gray-700/30'
                    : 'hover:bg-white/20'
              }`}
            >
              <List
                className={`transition-all duration-300 ${
                  activeTab === 'list' 
                    ? 'text-[#4281A4] scale-110' 
                    : darkMode 
                      ? 'text-gray-300' 
                      : 'text-gray-700'
                }`}
                size={24}
              />
              <span
                className={`text-xs transition-all duration-300 ${
                  activeTab === 'list' 
                    ? 'text-[#4281A4]' 
                    : darkMode 
                      ? 'text-gray-300' 
                      : 'text-gray-700'
                }`}
              >
                Cocktails
              </span>
            </button>

            <button
              onClick={() => onTabChange('settings')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === 'settings'
                  ? darkMode 
                    ? 'bg-gray-700/60 backdrop-blur-sm shadow-lg'
                    : 'bg-white/40 backdrop-blur-sm shadow-lg'
                  : darkMode
                    ? 'hover:bg-gray-700/30'
                    : 'hover:bg-white/20'
              }`}
            >
              <Settings
                className={`transition-all duration-300 ${
                  activeTab === 'settings' 
                    ? 'text-[#4281A4] scale-110' 
                    : darkMode 
                      ? 'text-gray-300' 
                      : 'text-gray-700'
                }`}
                size={24}
              />
              <span
                className={`text-xs transition-all duration-300 ${
                  activeTab === 'settings' 
                    ? 'text-[#4281A4]' 
                    : darkMode 
                      ? 'text-gray-300' 
                      : 'text-gray-700'
                }`}
              >
                Settings
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
