import { useEffect } from 'react';
import { Phone, MessageSquare, Navigation, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationToPickupProps {
  onArrived: () => void;
}

export function NavigationToPickup({ onArrived }: NavigationToPickupProps) {
  useEffect(() => {
    // Auto-arrive after 5 seconds
    const timer = setTimeout(() => {
      onArrived();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onArrived]);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Map with Navigation */}
      <div className="flex-1 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 relative">
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 400 800">
            {/* Animated route */}
            <motion.path
              d="M 200 600 L 200 400 L 250 200"
              stroke="#2563EB"
              strokeWidth="4"
              fill="none"
              strokeDasharray="10,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </div>

        {/* Your Car Moving */}
        <motion.div
          animate={{
            top: ['75%', '50%', '25%'],
            left: ['50%', '50%', '62.5%'],
          }}
          transition={{
            duration: 5,
            ease: 'linear',
          }}
          className="absolute -translate-x-1/2"
        >
          <div className="w-16 h-16 bg-[#2563EB] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
            <span className="text-2xl">🚗</span>
          </div>
        </motion.div>

        {/* Pickup Location Pin */}
        <div className="absolute top-1/4 right-1/3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#2563EB]">
              <MapPin className="w-7 h-7 text-[#2563EB]" fill="#2563EB" />
            </div>
          </motion.div>
        </div>

        {/* Navigation Info */}
        <div className="absolute top-12 left-4 right-4 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Heading to pickup</p>
            <div className="flex items-center gap-2 bg-[#2563EB] text-white px-3 py-1 rounded-full text-xs">
              <Navigation className="w-3 h-3" />
              <span>2.5 km</span>
            </div>
          </div>
          <p className="text-lg font-medium">Diani Beach Road</p>
          <p className="text-sm text-gray-600">ETA: 3 minutes</p>
        </div>
      </div>

      {/* Passenger Info Bottom Sheet */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-white border-t-2 border-gray-100 px-6 py-4"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-xl flex-shrink-0">
            👤
          </div>

          <div className="flex-1">
            <p className="font-medium">John M.</p>
            <p className="text-xs text-gray-600">4.8 ★ • Waiting at pickup</p>
            <p className="text-xs text-gray-500 mt-1">Standard ride • KES 450</p>
          </div>

          <div className="flex gap-2">
            <button className="w-11 h-11 bg-[#2563EB]/10 rounded-full flex items-center justify-center hover:bg-[#2563EB]/20 transition-colors">
              <Phone className="w-5 h-5 text-[#2563EB]" />
            </button>
            <button className="w-11 h-11 bg-[#2563EB]/10 rounded-full flex items-center justify-center hover:bg-[#2563EB]/20 transition-colors">
              <MessageSquare className="w-5 h-5 text-[#2563EB]" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={onArrived}
          className="w-full bg-[#2563EB] text-white py-4 rounded-xl hover:bg-[#1d4ed8] transition-colors"
        >
          I've Arrived
        </button>
      </motion.div>
    </div>
  );
}