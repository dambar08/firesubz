"use client"

import { useState, useEffect } from "react";
import SubscriptionSearchInput from "./SubscriptionSearchInput"; // Import the search input component
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

const SubscriptionSearchModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Effect to handle keyboard shortcut (e.g., Cmd+K) to open the modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-start p-4" // Dark, semi-transparent overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal} // Close modal when clicking outside
        >
          <motion.div
            className="w-full max-w-md mt-20" // Container to hold and position the search input
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside the search component
          >
            <SubscriptionSearchInput /> {/* The search input component */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionSearchModal;