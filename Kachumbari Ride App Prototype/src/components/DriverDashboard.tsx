import { useState } from 'react';
import { DollarSign, Navigation, Clock, TrendingUp, Menu, User, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface DriverDashboardProps {
  onIncomingRequest: () => void;
  onViewEarnings: () => void;
}

export function DriverDashboard({ onIncomingRequest, onViewEarnings }: DriverDashboardProps) {
  const [isOnline, setIsOnline] = useState(false);

  const handleGoOnline = () => {
    setIsOnline(true);
    // Simulate incoming ride request after 3 seconds
    setTimeout(() => {
      onIncomingRequest();
    }, 3000);
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

        {/* Top Bar */}
        <div className="relative z-10 px-4 pt-12 pb-4">
          <div className="flex items-center justify-between">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Status Indicator */}
        {isOnline && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-32 left-1/2 -translate-x-1/2"
          >
            <div className="bg-[#00C853] text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm">You're Online</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-20 bg-white rounded-t-3xl shadow-2xl px-6 py-6"
      >
        {/* Online/Offline Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={isOnline ? 'text-[#00C853]' : 'text-gray-700'}>
                {isOnline ? 'You\'re Online' : 'You\'re Offline'}
              </h3>
              <p className="text-sm text-gray-600">
                {isOnline ? 'Ready to accept rides' : 'Go online to start earning'}
              </p>
            </div>
          </div>

          <button
            onClick={() => isOnline ? setIsOnline(false) : handleGoOnline()}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm transition-all ${
              isOnline
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-[#2563EB] text-white hover:bg-[#1d4ed8]'
            }`}
          >
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>
        </div>

        {/* Today's Stats */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-600">Today's Summary</p>
            <button
              onClick={onViewEarnings}
              className="text-sm text-[#2563EB]"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center mb-2">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs text-gray-600 mb-1">Earnings</p>
              <p className="font-medium">KES 2,450</p>
            </div>

            <div className="bg-gray-100 rounded-xl p-4">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center mb-2">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs text-gray-600 mb-1">Trips</p>
              <p className="font-medium">8</p>
            </div>

            <div className="bg-gray-100 rounded-xl p-4">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs text-gray-600 mb-1">Online</p>
              <p className="font-medium">5h 30m</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-3">
          <button
            onClick={onViewEarnings}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2563EB]/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">This Week</p>
                <p className="text-xs text-gray-500">KES 18,500 • 45 trips</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">→</span>
          </button>

          <button
            onClick={onViewEarnings}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">This Month</p>
                <p className="text-xs text-gray-500">KES 72,300 • 162 trips</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">→</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}