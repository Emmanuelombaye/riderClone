import { motion } from 'motion/react';
import { Car } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
          <Car className="w-14 h-14 text-[#2563EB]" strokeWidth={2} />
        </div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-white mb-2"
        >
          Kachumbari Ride
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-white/90 text-center"
        >
          Reliable Coastal Rides
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-12 text-white/60 text-xs"
      >
        by Kachumbari Travel & Tour
      </motion.div>
    </div>
  );
}