import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import { motion } from 'motion/react';

interface DriverEarningsProps {
  onBack: () => void;
}

const weeklyEarnings = [
  { day: 'Mon', amount: 3200, trips: 12 },
  { day: 'Tue', amount: 2800, trips: 9 },
  { day: 'Wed', amount: 4100, trips: 15 },
  { day: 'Thu', amount: 3600, trips: 13 },
  { day: 'Fri', amount: 4700, trips: 18 },
  { day: 'Sat', amount: 5200, trips: 20 },
  { day: 'Sun', amount: 3900, trips: 14 },
];

const recentTrips = [
  {
    id: 1,
    time: '10:30 AM',
    from: 'Diani Beach',
    to: 'Ukunda Airstrip',
    amount: 450,
  },
  {
    id: 2,
    time: '9:15 AM',
    from: 'Mombasa CBD',
    to: 'Likoni Ferry',
    amount: 680,
  },
  {
    id: 3,
    time: '8:00 AM',
    from: 'Tiwi Beach',
    to: 'Diani Beach',
    amount: 520,
  },
];

export function DriverEarnings({ onBack }: DriverEarningsProps) {
  const maxAmount = Math.max(...weeklyEarnings.map((d) => d.amount));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-6 px-6 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8]">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-white">Earnings</h2>
            <p className="text-white/80 text-sm">Track your income</p>
          </div>
        </div>

        {/* Total Earnings Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-white" />
            <p className="text-white/80 text-sm">This Week</p>
          </div>
          <p className="text-white text-3xl mb-3">KES 27,500</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#00FF88]" />
            <p className="text-[#00FF88] text-sm">+12% from last week</p>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Period Selector */}
        <div className="flex gap-2 mb-6">
          <button className="px-4 py-2 bg-[#2563EB] text-white rounded-full text-sm">
            This Week
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
            This Month
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
            All Time
          </button>
        </div>

        {/* Weekly Chart */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm">Daily Breakdown</h3>
            <p className="text-xs text-gray-500">101 trips this week</p>
          </div>

          <div className="flex items-end justify-between gap-2 h-48 mb-2">
            {weeklyEarnings.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ height: 0 }}
                animate={{ height: `${(day.amount / maxAmount) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex-1 bg-[#2563EB] rounded-t-lg min-h-[20px] relative group cursor-pointer"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  KES {day.amount}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between">
            {weeklyEarnings.map((day) => (
              <div key={day.day} className="flex-1 text-center">
                <p className="text-xs text-gray-600">{day.day}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Avg/Trip</p>
            <p className="font-medium">KES 452</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Total Trips</p>
            <p className="font-medium">101</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Online Hrs</p>
            <p className="font-medium">42.5h</p>
          </div>
        </div>

        {/* Recent Trips */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm">Today's Trips</h3>
            <button className="text-xs text-[#2563EB]">View All</button>
          </div>

          <div className="space-y-3">
            {recentTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-100 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-500">{trip.time}</p>
                  <p className="font-medium">KES {trip.amount}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>{trip.from}</span>
                  <span className="text-gray-400">→</span>
                  <span>{trip.to}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Download Statement */}
        <button className="w-full mt-6 border-2 border-gray-200 text-gray-700 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <Download className="w-5 h-5" />
          <span>Download Statement</span>
        </button>
      </div>
    </div>
  );
}