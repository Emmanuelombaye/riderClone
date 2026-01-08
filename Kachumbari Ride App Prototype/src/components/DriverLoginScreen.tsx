import { useState } from 'react';
import { Car, Phone, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface DriverLoginScreenProps {
  onLogin: () => void;
}

export function DriverLoginScreen({ onLogin }: DriverLoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    if (phoneNumber.length >= 9 && pin.length === 4) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="pt-16 pb-8 px-6 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8]">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
            <Car className="w-7 h-7 text-[#2563EB]" />
          </div>
          <div>
            <h2 className="text-white">Kachumbari Driver</h2>
            <p className="text-white/80 text-sm">Partner Login</p>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="mb-2">Welcome Back, Partner</h3>
          <p className="text-gray-600 mb-8">Sign in to start accepting rides</p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
              <div className="flex items-center gap-3 border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#2563EB] transition-colors">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">+254</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="712 345 678"
                  className="flex-1 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">PIN</label>
              <div className="flex items-center gap-3 border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#2563EB] transition-colors">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.slice(0, 4))}
                  placeholder="****"
                  className="flex-1 outline-none tracking-widest"
                  maxLength={4}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={phoneNumber.length < 9 || pin.length !== 4}
            className="w-full bg-[#2563EB] text-white py-4 rounded-xl mt-8 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1d4ed8] transition-colors"
          >
            Sign In
          </button>

          <button className="w-full text-[#2563EB] py-3 rounded-xl mt-3">
            Forgot PIN?
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 text-center">
        <p className="text-gray-600 mb-2">Want to become a driver?</p>
        <button className="text-[#2563EB]">
          Apply Now
        </button>
      </div>
    </div>
  );
}