"use client"

import { useState, useEffect } from "react";
import SubscriptionSearchInput from "./SubscriptionSearchInput";
import { motion, AnimatePresence } from "motion/react";

const SubscriptionSearchModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-start p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="w-full max-w-md mt-20"
            initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <SubscriptionSearchInput />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionSearchModal;