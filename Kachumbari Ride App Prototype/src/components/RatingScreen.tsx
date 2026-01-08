import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';

interface RatingScreenProps {
  onComplete: () => void;
}

const compliments = [
  'Great driving',
  'Friendly',
  'Clean car',
  'Safe',
  'On time',
  'Good conversation',
];

export function RatingScreen({ onComplete }: RatingScreenProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedCompliments, setSelectedCompliments] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  const handleComplimentToggle = (compliment: string) => {
    if (selectedCompliments.includes(compliment)) {
      setSelectedCompliments(selectedCompliments.filter((c) => c !== compliment));
    } else {
      setSelectedCompliments([...selectedCompliments, compliment]);
    }
  };

  const handleSubmit = () => {
    if (rating > 0) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="pt-16 pb-8 px-6 bg-gradient-to-br from-[#006B3F] to-[#00A86B]">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-white mb-2">Rate Your Trip</h2>
          <p className="text-white/90">How was your ride with James?</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Driver Info */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-4xl mb-4">
              👨🏾
            </div>
            <p className="font-medium">James Kamau</p>
            <p className="text-sm text-gray-600">Toyota Axio • KCB 425T</p>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform"
              >
                <Star
                  className={`w-12 h-12 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  } transition-colors`}
                />
              </motion.button>
            ))}
          </div>

          {rating > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 mb-8"
            >
              {rating === 5 && 'Excellent! 🌟'}
              {rating === 4 && 'Great! 👍'}
              {rating === 3 && 'Good'}
              {rating === 2 && 'Could be better'}
              {rating === 1 && 'Not satisfied'}
            </motion.p>
          )}

          {/* Compliments */}
          {rating >= 4 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <ThumbsUp className="w-5 h-5 text-[#006B3F]" />
                <p className="font-medium">Add compliments (optional)</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {compliments.map((compliment) => (
                  <button
                    key={compliment}
                    onClick={() => handleComplimentToggle(compliment)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedCompliments.includes(compliment)
                        ? 'bg-[#006B3F] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {compliment}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Feedback */}
          {rating > 0 && rating < 4 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-6"
            >
              <label className="block text-sm text-gray-700 mb-2">
                What could be improved? (optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your feedback..."
                rows={4}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#00A86B] resize-none"
              />
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full bg-[#2563EB] text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1d4ed8] transition-colors"
          >
            Submit Rating
          </button>

          <button
            onClick={onComplete}
            className="w-full text-gray-600 py-3 rounded-xl mt-3"
          >
            Skip
          </button>
        </motion.div>
      </div>
    </div>
  );
}