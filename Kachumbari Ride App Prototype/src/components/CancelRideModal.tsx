import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CancelRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const CANCELLATION_REASONS = [
  { id: 'driver-far', label: 'Driver too far' },
  { id: 'price-high', label: 'Price too high' },
  { id: 'changed-plans', label: 'Changed plans' },
  { id: 'app-issue', label: 'App issue' },
];

export function CancelRideModal({ isOpen, onClose, onConfirm }: CancelRideModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');

  const handleConfirm = () => {
    if (selectedReason) {
      onConfirm(selectedReason);
      setSelectedReason(''); // Reset for next time
    }
  };

  const handleClose = () => {
    setSelectedReason(''); // Reset on close
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-w-lg mx-auto"
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <h3>Why are you cancelling?</h3>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                This helps us improve your experience.
              </p>

              {/* Reasons List */}
              <div className="space-y-3 mb-6">
                {CANCELLATION_REASONS.map((reason) => (
                  <label
                    key={reason.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedReason === reason.id
                        ? 'border-[#2563EB] bg-[#2563EB]/5'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="cancellation-reason"
                      value={reason.id}
                      checked={selectedReason === reason.id}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="sr-only"
                    />
                    
                    {/* Custom Radio Button */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all ${
                          selectedReason === reason.id
                            ? 'border-[#2563EB]'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedReason === reason.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-1 bg-[#2563EB] rounded-full"
                          />
                        )}
                      </div>
                    </div>

                    <span className="text-sm font-medium text-gray-900">
                      {reason.label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleConfirm}
                  disabled={!selectedReason}
                  className={`w-full py-4 rounded-xl transition-all ${
                    selectedReason
                      ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8]'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Confirm Cancellation
                </button>

                <button
                  onClick={handleClose}
                  className="w-full py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}