import { CheckCircle2, Download } from 'lucide-react';
import { motion } from 'motion/react';

interface TripCompletedScreenProps {
  fare: number;
  onRate: () => void;
}

export function TripCompletedScreen({ fare, onRate }: TripCompletedScreenProps) {
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Success Header */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-[#006B3F] to-[#00A86B]"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', damping: 12 }}
        >
          <CheckCircle2 className="w-24 h-24 text-white mb-4" strokeWidth={1.5} />
        </motion.div>
        <h2 className="text-white mb-2">Trip Completed!</h2>
        <p className="text-white/90">You've arrived at your destination</p>
      </motion.div>

      {/* Trip Summary */}
      <div className="flex-1 px-6 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Fare Card */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">Total Fare</p>
              <p className="text-3xl">KES {fare}</p>
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Base Fare</span>
                <span>KES {Math.floor(fare * 0.7)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Distance (8.5 km)</span>
                <span>KES {Math.floor(fare * 0.2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Time (15 min)</span>
                <span>KES {Math.floor(fare * 0.1)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-[#00A86B]/10 border-2 border-[#00A86B]/20 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paid with</p>
                <p className="font-medium">M-Pesa</p>
              </div>
              <div className="w-12 h-12 bg-[#006B3F] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-xl">
                  👨🏾
                </div>
                <div>
                  <p className="font-medium">James Kamau</p>
                  <p className="text-xs text-gray-600">Toyota Axio • KCB 425T</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <button
            onClick={onRate}
            className="w-full bg-[#2563EB] text-white py-4 rounded-xl mb-3 hover:bg-[#1d4ed8] transition-colors"
          >
            Rate Your Trip
          </button>

          <button className="w-full border-2 border-gray-200 text-gray-700 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5" />
            <span>Download Receipt</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}