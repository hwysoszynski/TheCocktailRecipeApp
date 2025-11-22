import { ChevronRight, Moon, Sun, Bell, Database, Info, Mail, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface SettingsScreenProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function SettingsScreen({ darkMode, onToggleDarkMode }: SettingsScreenProps) {
  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: darkMode ? Moon : Sun,
          label: 'Dark Mode',
          value: darkMode ? 'On' : 'Off',
          onClick: onToggleDarkMode,
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          value: 'Off',
          onClick: () => {},
        },
      ],
    },
    {
      title: 'Data',
      items: [
        {
          icon: Database,
          label: 'Export Data',
          onClick: () => {},
        },
        {
          icon: Database,
          label: 'Import Data',
          onClick: () => {},
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          icon: Info,
          label: 'Version',
          value: '1.0.0',
        },
        {
          icon: Mail,
          label: 'Contact Support',
          onClick: () => {},
        },
        {
          icon: Shield,
          label: 'Privacy Policy',
          onClick: () => {},
        },
      ],
    },
  ];

  return (
    <div className="pb-32 px-4 pt-16">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your experience</p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h2 className="text-gray-700 mb-3 px-2">{section.title}</h2>
              <div className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl shadow-xl shadow-black/10 overflow-hidden">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className={`w-full flex items-center justify-between p-4 hover:bg-white/20 transition-all ${
                      itemIndex !== section.items.length - 1 ? 'border-b border-white/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400/30 to-purple-400/30 backdrop-blur-sm flex items-center justify-center">
                        <item.icon size={20} className="text-gray-700" />
                      </div>
                      <span className="text-gray-800">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.value && <span className="text-sm text-gray-600">{item.value}</span>}
                      {item.onClick && <ChevronRight size={20} className="text-gray-400" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* App Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 backdrop-blur-xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 border border-white/40 rounded-3xl shadow-xl shadow-black/10 p-6 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-2xl">🍸</span>
          </div>
          <h3 className="text-gray-800 mb-2">Cocktail Finder</h3>
          <p className="text-sm text-gray-600 mb-4">
            Discover and track your favorite cocktails with style
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span>Made with ❤️</span>
            <span>•</span>
            <span>iOS 18 Design</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
