import { useEffect } from 'react';
import { Phone, MessageSquare, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

interface DriverTripProgressProps {
  onComplete: () => void;
}

export function DriverTripProgress({ onComplete }: DriverTripProgressProps) {
  useEffect(() => {
    // Auto-complete after 6 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 6000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Map with Route */}
      <div className="flex-1 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 relative">
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 400 800">
            {/* Route */}
            <motion.path
              d="M 100 600 Q 200 400 300 200"
              stroke="#2563EB"
              strokeWidth="4"
              fill="none"
              strokeDasharray="10,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: 'easeInOut' }}
            />
          </svg>
        </div>

        {/* Moving Car */}
        <motion.div
          animate={{
            top: ['75%', '50%', '25%'],
            left: ['25%', '50%', '75%'],
          }}
          transition={{
            duration: 6,
            ease: 'linear',
          }}
          className="absolute -translate-x-1/2"
        >
          <div className="w-16 h-16 bg-[#2563EB] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
            <span className="text-2xl">🚗</span>
          </div>
        </motion.div>

        {/* Top Info */}
        <div className="absolute top-12 left-4 right-4 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-gray-500">Destination</p>
              <p className="font-medium">Ukunda Airstrip</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">ETA</p>
              <p className="font-medium">5 min</p>
            </div>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mt-3">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '70%' }}
              transition={{ duration: 2 }}
              className="h-full bg-[#2563EB] rounded-full"
            />
          </div>
        </div>

        {/* Navigation Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2"
        >
          <Navigation className="w-5 h-5" />
          <span className="text-sm">Navigate</span>
        </motion.button>
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
            <p className="text-xs text-gray-600">Trip in progress</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-gray-500">5.2 km left</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-[#2563EB] font-medium">KES 450</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="w-11 h-11 bg-[#2563EB]/10 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#2563EB]" />
            </button>
            <button className="w-11 h-11 bg-[#2563EB]/10 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#2563EB]" />
            </button>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="w-full bg-[#2563EB] text-white py-4 rounded-xl hover:bg-[#1d4ed8] transition-colors"
        >
          Complete Trip
        </button>
      </motion.div>
    </div>
  );
}