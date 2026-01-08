import { ArrowLeft, MapPin, Clock, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface RideHistoryScreenProps {
  onBack: () => void;
}

const trips = [
  {
    id: 1,
    date: 'Today, 10:30 AM',
    pickup: 'Diani Beach Road',
    destination: 'Ukunda Airstrip',
    fare: 450,
    driver: 'James Kamau',
    rating: 5,
    vehicle: 'Toyota Axio',
  },
  {
    id: 2,
    date: 'Yesterday, 6:15 PM',
    pickup: 'Mombasa CBD',
    destination: 'Likoni Ferry',
    fare: 680,
    driver: 'Mary Njeri',
    rating: 4,
    vehicle: 'Honda Fit',
  },
  {
    id: 3,
    date: 'Jan 1, 2:45 PM',
    pickup: 'Tiwi Beach',
    destination: 'Diani Beach Road',
    fare: 520,
    driver: 'Peter Otieno',
    rating: 5,
    vehicle: 'Nissan Note',
  },
  {
    id: 4,
    date: 'Dec 31, 11:20 AM',
    pickup: 'Ukunda Town',
    destination: 'Shimba Hills',
    fare: 850,
    driver: 'Grace Wanjiru',
    rating: 5,
    vehicle: 'Toyota Probox',
  },
];

export function RideHistoryScreen({ onBack }: RideHistoryScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-6 px-6 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8]">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-white">Ride History</h2>
            <p className="text-white/80 text-sm">Your past trips</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 px-6 py-4 border-b border-gray-100">
        <button className="px-4 py-2 bg-[#2563EB] text-white rounded-full text-sm">
          All Trips
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
          This Week
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
          This Month
        </button>
      </div>

      {/* Trip List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4">
          {trips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-2 border-gray-100 rounded-2xl p-4 hover:border-[#2563EB]/30 hover:shadow-md transition-all cursor-pointer"
            >
              {/* Date and Fare */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{trip.date}</span>
                </div>
                <p className="font-medium">KES {trip.fare}</p>
              </div>

              {/* Route */}
              <div className="flex gap-3 mb-3">
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-[#2563EB]" />
                  <div className="w-0.5 h-8 bg-gray-300" />
                  <MapPin className="w-3 h-3 text-[#2563EB]" fill="currentColor" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Pickup</p>
                    <p className="text-sm">{trip.pickup}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="text-sm">{trip.destination}</p>
                  </div>
                </div>
              </div>

              {/* Driver Info */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                    {trip.driver.split(' ')[0][0]}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{trip.driver}</p>
                    <p className="text-xs text-gray-500">{trip.vehicle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{trip.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}