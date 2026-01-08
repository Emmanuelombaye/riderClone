import { useState } from 'react';
import { Car, Phone } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginScreenProps {
  onLogin: () => void;
  onSignUp: () => void;
}

export function LoginScreen({ onLogin, onSignUp }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOTP = () => {
    if (phoneNumber.length >= 9) {
      setOtpSent(true);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
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
            <h2 className="text-white">Kachumbari Ride</h2>
            <p className="text-white/80 text-sm">Passenger Login</p>
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
          <h3 className="mb-2">Welcome Back</h3>
          <p className="text-gray-600 mb-8">
            {!otpSent
              ? 'Enter your phone number to continue'
              : 'Enter the 6-digit code sent to your phone'}
          </p>

          {!otpSent ? (
            <>
              <div className="mb-6">
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

              <button
                onClick={handleSendOTP}
                disabled={phoneNumber.length < 9}
                className="w-full bg-[#2563EB] text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1d4ed8] transition-colors"
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  placeholder="000000"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-center tracking-widest focus:border-[#2563EB] outline-none transition-colors"
                  maxLength={6}
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
                className="w-full bg-[#2563EB] text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1d4ed8] transition-colors mb-4"
              >
                Verify & Login
              </button>

              <button
                onClick={() => setOtpSent(false)}
                className="w-full text-[#2563EB] py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Change Number
              </button>
            </>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 text-center">
        <p className="text-gray-600 mb-2">Don't have an account?</p>
        <button
          onClick={onSignUp}
          className="text-[#2563EB] font-medium hover:text-[#1d4ed8]"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}