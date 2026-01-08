import { useState } from 'react';
import { ArrowLeft, MapPin, Navigation, Circle } from 'lucide-react';
import { motion } from 'motion/react';

interface LocationSelectScreenProps {
  onConfirm: (pickup: string, destination: string) => void;
  onBack: () => void;
}

export function LocationSelectScreen({ onConfirm, onBack }: LocationSelectScreenProps) {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [focusedInput, setFocusedInput] = useState<'pickup' | 'destination'>('destination');

  const suggestions = [
    { name: 'Diani Beach Road', area: 'Ukunda, Kwale County' },
    { name: 'Mombasa CBD', area: 'Mombasa, Kenya' },
    { name: 'Likoni Ferry', area: 'Mombasa South Coast' },
    { name: 'Ukunda Airstrip', area: 'Ukunda, Kwale County' },
    { name: 'Tiwi Beach', area: 'South Coast, Kenya' },
    { name: 'Shimba Hills', area: 'Kwale County' },
  ];

  const handleSuggestionClick = (location: string) => {
    if (focusedInput === 'pickup') {
      setPickup(location);
      setFocusedInput('destination');
    } else {
      setDestination(location);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Map Preview */}
      <div className="h-64 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 relative">
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            <line x1="50" y1="0" x2="100" y2="300" stroke="#94a3b8" strokeWidth="2" />
            <line x1="200" y1="0" x2="220" y2="300" stroke="#94a3b8" strokeWidth="3" />
            <line x1="300" y1="0" x2="340" y2="300" stroke="#94a3b8" strokeWidth="2" />
          </svg>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg z-10"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Route Line Preview */}
        {pickup && destination && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="w-3 h-3 bg-[#2563EB] rounded-full border-2 border-white" />
            <div className="w-0.5 h-20 bg-[#2563EB] opacity-50" />
            <div className="w-3 h-3 bg-[#1d4ed8] rounded-full border-2 border-white" />
          </motion.div>
        )}
      </div>

      {/* Location Inputs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-4 py-6 bg-white shadow-lg"
      >
        <div className="space-y-3">
          {/* Pickup */}
          <div className="flex items-center gap-3">
            <Circle className="w-3 h-3 text-[#2563EB] flex-shrink-0" />
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onFocus={() => setFocusedInput('pickup')}
              placeholder="Pickup location"
              className="flex-1 py-3 px-4 bg-gray-100 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-[#2563EB] transition-all"
            />
            <button className="p-2">
              <Navigation className="w-5 h-5 text-[#2563EB]" />
            </button>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => setFocusedInput('destination')}
              placeholder="Where to?"
              className="flex-1 py-3 px-4 bg-gray-100 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-[#2563EB] transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Suggestions */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-sm text-gray-500 mb-3">Suggested Locations</p>
        <div className="space-y-1">
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSuggestionClick(suggestion.name)}
              className="w-full flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm">{suggestion.name}</p>
                <p className="text-xs text-gray-500">{suggestion.area}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      {pickup && destination && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="px-4 py-4 bg-white border-t border-gray-100"
        >
          <button
            onClick={() => onConfirm(pickup, destination)}
            className="w-full bg-[#2563EB] text-white py-4 rounded-xl hover:bg-[#1d4ed8] transition-colors"
          >
            Confirm Locations
          </button>
        </motion.div>
      )}
    </div>
  );
}