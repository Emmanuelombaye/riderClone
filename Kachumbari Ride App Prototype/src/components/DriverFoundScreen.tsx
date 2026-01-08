import { useEffect, useState } from 'react';
import { Phone, MessageSquare, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { CancelRideModal } from './CancelRideModal';

interface DriverFoundScreenProps {
  pickup: string;
  destination: string;
  vehicleType: string;
  onStartTrip: () => void;
  onCancel?: () => void;
}

export function DriverFoundScreen({ pickup, destination, vehicleType, onStartTrip, onCancel }: DriverFoundScreenProps) {
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    // Auto-start trip after 5 seconds
    const timer = setTimeout(() => {
      onStartTrip();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onStartTrip]);

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = (reason: string) => {
    console.log('Ride cancelled. Reason:', reason);
    setShowCancelModal(false);
    // Call the onCancel callback if provided
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Map with Driver Location */}
      <div className="flex-1 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 relative">
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 400 800">
            <line x1="50" y1="0" x2="150" y2="800" stroke="#94a3b8" strokeWidth="2" />
            <line x1="200" y1="0" x2="250" y2="800" stroke="#94a3b8" strokeWidth="3" />
            <line x1="300" y1="0" x2="350" y2="800" stroke="#94a3b8" strokeWidth="2" />
          </svg>
        </div>

        {/* Driver Car Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-[#2563EB] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
              <span className="text-2xl">🚗</span>
            </div>
            {/* Moving animation */}
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-black/20 rounded-full blur-sm"
            />
          </div>
        </motion.div>

        {/* Your Location Pin */}
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#2563EB]">
            <div className="w-3 h-3 bg-[#2563EB] rounded-full" />
          </div>
        </div>
      </div>

      {/* Driver Info Bottom Sheet */}
      <motion.div
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-white rounded-t-3xl shadow-2xl px-6 py-6"
      >
        {/* ETA Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white px-6 py-3 rounded-full shadow-lg"
        >
          <p className="text-sm">Arrives in 3 min</p>
        </motion.div>

        {/* Driver Card */}
        <div className="flex items-center gap-4 mb-6 mt-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
            👨🏾
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3>James Kamau</h3>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.9</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Toyota Axio • KCB 425T</p>
            <p className="text-xs text-gray-500">{vehicleType}</p>
          </div>

          <div className="flex gap-2">
            <button className="w-12 h-12 bg-[#2563EB]/10 rounded-full flex items-center justify-center hover:bg-[#2563EB]/20 transition-colors">
              <Phone className="w-5 h-5 text-[#2563EB]" />
            </button>
            <button className="w-12 h-12 bg-[#2563EB]/10 rounded-full flex items-center justify-center hover:bg-[#2563EB]/20 transition-colors">
              <MessageSquare className="w-5 h-5 text-[#2563EB]" />
            </button>
          </div>
        </div>

        {/* Trip Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-1 pt-1">
                <div className="w-3 h-3 rounded-full border-2 border-[#2563EB]" />
                <div className="w-0.5 h-8 bg-gray-300" />
                <div className="w-3 h-3 bg-[#2563EB] rounded-full" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Pickup</p>
                  <p className="text-sm">{pickup}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Dropoff</p>
                  <p className="text-sm">{destination}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="text-center py-2">
          <p className="text-sm text-gray-600">Driver is on the way...</p>
        </div>

        {/* Cancel Button */}
        <button
          onClick={handleCancelClick}
          className="mt-3 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Cancel Ride
        </button>
      </motion.div>

      {/* Cancel Ride Modal */}
      <CancelRideModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}