'use client';

import { useEffect } from 'react';

interface StoryModalProps {
  isOpen: boolean;
  onStartFromBeginning: () => void;
  onJumpToNow: () => void;
}

export default function StoryModal({
  isOpen,
  onStartFromBeginning,
  onJumpToNow
}: StoryModalProps) {
  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onJumpToNow(); // Default action when closing with Escape
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onJumpToNow]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onJumpToNow}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full shadow-2xl animate-scale-in">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Welcome to Ray&apos;s Story! 🌱
        </h2>

        <p className="text-gray-600 text-lg mb-8 text-center">
          Would you like to start from the beginning?
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={onStartFromBeginning}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Start from Beginning
          </button>

          <button
            onClick={onJumpToNow}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Jump to Now
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Press ESC to close
        </p>
      </div>
    </div>
  );
}
