import { ArrowLeft, Car, Users, Briefcase, Clock, MapPin, Bike, TramFront, User } from 'lucide-react';
import { motion } from 'motion/react';

interface FareEstimateScreenProps {
  pickup: string;
  destination: string;
  onSelectVehicle: (vehicleType: string, fare: number) => void;
  onBack: () => void;
}

const vehicles = [
  {
    id: 'boda',
    name: 'Boda',
    description: 'Quick motorcycle rides',
    icon: Bike,
    capacity: '1-2',
    eta: '2 min',
    fare: 150,
  },
  {
    id: 'tuktuk',
    name: 'TukTuk',
    description: 'Affordable 3-wheeler',
    icon: TramFront,
    capacity: '1-3',
    eta: '3 min',
    fare: 250,
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Affordable car rides',
    icon: Car,
    capacity: '1-4',
    eta: '4 min',
    fare: 450,
  },
  {
    id: '7-seater',
    name: '7-Seater',
    description: 'Comfortable family rides',
    icon: Users,
    capacity: '1-7',
    eta: '6 min',
    fare: 750,
  },
  {
    id: '11-seater',
    name: '11-Seater',
    description: 'Group transport',
    icon: Users,
    capacity: '1-11',
    eta: '8 min',
    fare: 1200,
  },
  {
    id: '16-seater',
    name: '16-Seater',
    description: 'Medium groups & events',
    icon: Users,
    capacity: '1-16',
    eta: '10 min',
    fare: 1800,
  },
  {
    id: '28-seater',
    name: '28-Seater',
    description: 'Large groups & tours',
    icon: Briefcase,
    capacity: '1-28',
    eta: '15 min',
    fare: 3500,
  },
];

export function FareEstimateScreen({ pickup, destination, onSelectVehicle, onBack }: FareEstimateScreenProps) {
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Map Preview */}
      <div className="h-1/3 bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-50 relative">
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            <line x1="50" y1="50" x2="350" y2="250" stroke="#2563EB" strokeWidth="3" strokeDasharray="10,5" />
            <circle cx="50" cy="50" r="8" fill="#2563EB" />
            <circle cx="350" cy="250" r="8" fill="#1d4ed8" />
          </svg>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg z-10"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Trip Info */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Clock className="w-4 h-4 text-[#2563EB]" />
            <span>15 min</span>
            <span className="mx-1">•</span>
            <span>8.5 km</span>
          </div>
        </div>
      </div>

      {/* Vehicle Selection */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-1 overflow-y-auto px-4 py-6"
      >
        <div className="mb-4">
          <h3 className="mb-1">Choose a ride</h3>
          <div className="flex items-start gap-2 text-xs text-gray-600">
            <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#2563EB]" />
            <div>
              <p className="truncate">{pickup}</p>
              <p className="truncate text-gray-500">to {destination}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {vehicles.map((vehicle, index) => (
            <motion.button
              key={vehicle.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectVehicle(vehicle.name, vehicle.fare)}
              className="w-full bg-white border-2 border-gray-200 rounded-2xl p-4 hover:border-[#2563EB] hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <vehicle.icon className="w-8 h-8 text-[#2563EB]" />
                </div>

                {/* Info */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{vehicle.name}</p>
                    <span className="text-xs text-gray-500">{vehicle.eta}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{vehicle.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>{vehicle.capacity}</span>
                  </div>
                </div>

                {/* Fare */}
                <div className="text-right">
                  <p className="font-medium text-[#2563EB]">KES {vehicle.fare}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Payment Method */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Payment method</p>
              <p className="text-sm font-medium">M-Pesa</p>
            </div>
            <button className="text-sm text-[#2563EB] font-medium hover:text-[#1d4ed8]">Change</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}