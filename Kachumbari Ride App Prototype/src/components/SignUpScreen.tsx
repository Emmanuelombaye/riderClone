import { useState } from 'react';
import { Car, User, Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface SignUpScreenProps {
  onSignUp: () => void;
}

export function SignUpScreen({ onSignUp }: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  const handleSubmit = () => {
    if (formData.fullName && formData.phoneNumber && formData.email) {
      onSignUp();
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
            <h2 className="text-white">Kachumbari Ride</h2>
            <p className="text-white/80 text-sm">Create Account</p>
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
          <h3 className="mb-2">Join Kachumbari</h3>
          <p className="text-gray-600 mb-8">Sign up to start riding along the coast</p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Full Name</label>
              <div className="flex items-center gap-3 border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#2563EB] transition-colors">
                <User className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="flex-1 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Email Address</label>
              <div className="flex items-center gap-3 border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#2563EB] transition-colors">
                <Mail className="w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="flex-1 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
              <div className="flex items-center gap-3 border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#2563EB] transition-colors">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">+254</span>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="712 345 678"
                  className="flex-1 outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!formData.fullName || !formData.email || !formData.phoneNumber}
            className="w-full bg-[#2563EB] text-white py-4 rounded-xl mt-8 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1d4ed8] transition-colors"
          >
            Create Account
          </button>

          <p className="text-xs text-gray-500 text-center mt-6 px-4">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
}