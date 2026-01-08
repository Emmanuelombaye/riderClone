import { useEffect } from 'react';
import { Phone, MessageSquare, Navigation, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface TripProgressScreenProps {
  destination: string;
  onTripComplete: () => void;
}

export function TripProgressScreen({ destination, onTripComplete }: TripProgressScreenProps) {
  useEffect(() => {
    // Auto-complete trip after 6 seconds
    const timer = setTimeout(() => {
      onTripComplete();
    }, 6000);
    return () => clearTimeout(timer);
  }, [onTripComplete]);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Map with Route */}
      <div className="flex-1 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 relative">
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 400 800">
            {/* Route line */}
            <motion.path
              d="M 100 200 Q 200 400 300 600"
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
            top: ['25%', '50%', '75%'],
            left: ['25%', '50%', '75%'],
          }}
          transition={{
            duration: 6,
            ease: 'linear',
          }}
          className="absolute"
        >
          <div className="w-16 h-16 bg-[#2563EB] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
            <span className="text-2xl">🚗</span>
          </div>
        </motion.div>

        {/* Top Info Bar */}
        <div className="absolute top-6 left-4 right-4 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Estimated arrival</p>
              <p className="text-lg">12 min</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Distance remaining</p>
              <p className="text-lg">5.2 km</p>
            </div>
          </div>
        </div>

        {/* Navigation Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 hover:bg-[#1d4ed8] transition-colors"
        >
          <Navigation className="w-5 h-5" />
          <span className="text-sm">View Route</span>
        </motion.button>
      </div>

      {/* Driver Info Bottom Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-white border-t border-gray-100 px-6 py-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-xl flex-shrink-0">
            👨🏾
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium">James Kamau</p>
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>4.9</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">Toyota Axio • KCB 425T</p>
          </div>

          <div className="flex gap-2">
            <button className="w-11 h-11 bg-[#006B3F]/10 rounded-full flex items-center justify-center hover:bg-[#006B3F]/20 transition-colors">
              <Phone className="w-5 h-5 text-[#006B3F]" />
            </button>
            <button className="w-11 h-11 bg-[#006B3F]/10 rounded-full flex items-center justify-center hover:bg-[#006B3F]/20 transition-colors">
              <MessageSquare className="w-5 h-5 text-[#006B3F]" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '65%' }}
              transition={{ duration: 2 }}
              className="h-full bg-[#00A86B] rounded-full"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Trip in progress to {destination}</p>
        </div>
      </motion.div>
    </div>
  );
}