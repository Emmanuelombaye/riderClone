import { Search, Clock, User, Menu, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeScreenProps {
  onSearchClick: () => void;
  onHistoryClick: () => void;
}

export function HomeScreen({ onSearchClick, onHistoryClick }: HomeScreenProps) {
  return (
    <div className="h-screen flex flex-col relative">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50">
        {/* Mock map with roads and locations */}
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 400 800">
            <line x1="50" y1="0" x2="150" y2="800" stroke="#94a3b8" strokeWidth="2" />
            <line x1="200" y1="0" x2="250" y2="800" stroke="#94a3b8" strokeWidth="3" />
            <line x1="300" y1="0" x2="350" y2="800" stroke="#94a3b8" strokeWidth="2" />
            <line x1="0" y1="200" x2="400" y2="250" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="0" y1="400" x2="400" y2="420" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="0" y1="600" x2="400" y2="580" stroke="#cbd5e1" strokeWidth="2" />
          </svg>
        </div>

        {/* Current location pin */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-[#2563EB] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <MapPin className="w-8 h-8 text-white" fill="white" />
            </div>
            <div className="absolute inset-0 bg-[#2563EB] rounded-full animate-ping opacity-20" />
          </div>
        </motion.div>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <User className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-20 mt-auto bg-white rounded-t-3xl shadow-2xl px-6 py-6"
      >
        {/* Search Bar */}
        <button
          onClick={onSearchClick}
          className="w-full bg-gray-100 rounded-xl px-4 py-4 flex items-center gap-3 mb-6 hover:bg-gray-200 transition-colors"
        >
          <Search className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600">Where to?</span>
        </button>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={onHistoryClick}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-left">
              <p className="text-sm">Ride History</p>
              <p className="text-xs text-gray-500">View past trips</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="w-10 h-10 bg-[#2563EB]/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div className="text-left">
              <p className="text-sm">Saved Places</p>
              <p className="text-xs text-gray-500">Home, Work...</p>
            </div>
          </button>
        </div>

        {/* Recent Locations */}
        <div>
          <p className="text-sm text-gray-500 mb-3">Recent Locations</p>
          <div className="space-y-2">
            <button
              onClick={onSearchClick}
              className="w-full flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm">Diani Beach Road</p>
                <p className="text-xs text-gray-500">Ukunda, Kwale County</p>
              </div>
            </button>

            <button
              onClick={onSearchClick}
              className="w-full flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm">Mombasa CBD</p>
                <p className="text-xs text-gray-500">Mombasa, Kenya</p>
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}