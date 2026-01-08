import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { CancelRideModal } from './CancelRideModal';

interface SearchingDriverScreenProps {
  onDriverFound: () => void;
  onCancel?: () => void;
}

export function SearchingDriverScreen({ onDriverFound, onCancel }: SearchingDriverScreenProps) {
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    // Simulate finding a driver after 3 seconds
    const timer = setTimeout(() => {
      onDriverFound();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onDriverFound]);

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
      {/* Map Background */}
      <div className="flex-1 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 relative">
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 400 800">
            <line x1="50" y1="0" x2="150" y2="800" stroke="#94a3b8" strokeWidth="2" />
            <line x1="200" y1="0" x2="250" y2="800" stroke="#94a3b8" strokeWidth="3" />
            <line x1="300" y1="0" x2="350" y2="800" stroke="#94a3b8" strokeWidth="2" />
          </svg>
        </div>

        {/* Searching Animation */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="relative w-32 h-32"
          >
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-[#2563EB]/30 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-[#2563EB] rounded-full" />
            
            {/* Inner circle */}
            <div className="absolute inset-4 bg-[#2563EB] rounded-full flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Pulsing circles */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 border-4 border-[#2563EB] rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute inset-0 border-4 border-[#2563EB] rounded-full"
          />
        </div>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-t-3xl shadow-2xl px-6 py-8"
      >
        <div className="text-center">
          <h3 className="mb-2">Finding your ride</h3>
          <p className="text-gray-600 mb-6">Looking for nearby drivers...</p>

          {/* Loading dots */}
          <div className="flex justify-center gap-2 mb-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 bg-[#2563EB] rounded-full"
              />
            ))}
          </div>

          <button 
            onClick={handleCancelClick}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel Request
          </button>
        </div>
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