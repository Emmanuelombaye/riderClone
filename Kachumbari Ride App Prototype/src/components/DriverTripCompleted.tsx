import { CheckCircle2, DollarSign, Clock, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

interface DriverTripCompletedProps {
  onDone: () => void;
}

export function DriverTripCompleted({ onDone }: DriverTripCompletedProps) {
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Success Header */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8]"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', damping: 12 }}
        >
          <CheckCircle2 className="w-24 h-24 text-white mb-4" strokeWidth={1.5} />
        </motion.div>
        <h2 className="text-white mb-2">Trip Completed!</h2>
        <p className="text-white/90">Great job, partner</p>
      </motion.div>

      {/* Trip Summary */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Earnings Card */}
          <div className="bg-blue-50 border-2 border-[#2563EB] rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center mb-3">
              <DollarSign className="w-8 h-8 text-[#2563EB]" />
            </div>
            <p className="text-center text-sm text-gray-600 mb-2">You Earned</p>
            <p className="text-center text-4xl text-[#2563EB] mb-3">KES 450</p>
            <div className="bg-white/50 rounded-xl p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Base Fare</span>
                <span className="font-medium">KES 315</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Distance</span>
                <span className="font-medium">KES 90</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">KES 45</span>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h3 className="text-sm mb-3">Trip Details</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Distance</p>
                  <p className="text-sm font-medium">8.5 km</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm font-medium">15 minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Info */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-xl">
                👤
              </div>
              <div className="flex-1">
                <p className="font-medium">John M.</p>
                <p className="text-xs text-gray-600">Passenger</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Paid via</p>
                <p className="text-sm font-medium">M-Pesa</p>
              </div>
            </div>
          </div>

          {/* Updated Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Today's Earnings</p>
              <p className="text-xl font-medium text-[#2563EB]">KES 2,900</p>
              <p className="text-xs text-gray-600">9 trips</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Online Time</p>
              <p className="text-xl font-medium">5h 45m</p>
              <p className="text-xs text-gray-600">Today</p>
            </div>
          </div>

          <button
            onClick={onDone}
            className="w-full bg-[#2563EB] text-white py-4 rounded-xl hover:bg-[#1d4ed8] transition-colors"
          >
            Continue Driving
          </button>
        </motion.div>
      </div>
    </div>
  );
}