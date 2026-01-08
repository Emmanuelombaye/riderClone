import { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

interface IncomingRideRequestProps {
  onAccept: () => void;
  onReject: () => void;
}

export function IncomingRideRequest({ onAccept, onReject }: IncomingRideRequestProps) {
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onReject();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onReject]);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Map with Pickup Location */}
      <div className="flex-1 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 relative">
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 400 800">
            <line x1="50" y1="0" x2="150" y2="800" stroke="#94a3b8" strokeWidth="2" />
            <line x1="200" y1="0" x2="250" y2="800" stroke="#94a3b8" strokeWidth="3" />
            <line x1="300" y1="0" x2="350" y2="800" stroke="#94a3b8" strokeWidth="2" />
            {/* Route suggestion */}
            <line x1="200" y1="300" x2="200" y2="500" stroke="#2563EB" strokeWidth="4" strokeDasharray="10,5" />
          </svg>
        </div>

        {/* Pickup Pin */}
        <motion.div
          initial={{ scale: 0, y: -50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-16 h-16 bg-[#2563EB] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
            <MapPin className="w-8 h-8 text-white" fill="white" />
          </div>
        </motion.div>

        {/* Timer */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-12 left-1/2 -translate-x-1/2"
        >
          <div className="bg-white rounded-full shadow-xl px-6 py-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#2563EB]" />
            <span className="font-medium">{timeLeft}s</span>
          </div>
        </motion.div>
      </div>

      {/* Ride Request Details */}
      <motion.div
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-white rounded-t-3xl shadow-2xl px-6 py-6"
      >
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2>New Ride Request</h2>
            <div className="bg-blue-50 px-4 py-2 rounded-full">
              <p className="text-sm text-[#2563EB] font-medium">KES 450</p>
            </div>
          </div>

          {/* Trip Details */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex flex-col items-center gap-1 pt-2">
                <div className="w-3 h-3 rounded-full bg-[#2563EB]" />
                <div className="w-0.5 h-16 bg-gray-300" />
                <MapPin className="w-4 h-4 text-[#2563EB]" fill="currentColor" />
              </div>
              <div className="flex-1 space-y-5">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Pickup</p>
                  <p className="text-sm font-medium">Diani Beach Road</p>
                  <p className="text-xs text-gray-600">Ukunda, Kwale County</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Destination</p>
                  <p className="text-sm font-medium">Ukunda Airstrip</p>
                  <p className="text-xs text-gray-600">Ukunda Town</p>
                </div>
              </div>
            </div>

            {/* Trip Stats */}
            <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Navigation className="w-4 h-4" />
                <span>2.5 km away</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Clock className="w-4 h-4" />
                <span>8 min trip</span>
              </div>
            </div>
          </div>

          {/* Passenger Info */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-xl">
              👤
            </div>
            <div>
              <p className="text-sm font-medium">John M.</p>
              <p className="text-xs text-gray-600">4.8 ★ • 52 trips</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onReject}
            className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={onAccept}
            className="flex-1 bg-[#2563EB] text-white py-4 rounded-xl hover:bg-[#1d4ed8] transition-colors"
          >
            Accept Ride
          </button>
        </div>
      </motion.div>
    </div>
  );
}