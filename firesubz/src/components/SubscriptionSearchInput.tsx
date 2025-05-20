"use client"

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // Assuming you want to use your Input component
import useDebounce from "@/hooks/use-debounce"; // Assuming you want to use your Input component
import { type Subscription } from "@/server/db/schema";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react"; // Assuming you want to use your Input component
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

const SubscriptionSearchInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [searchResults, setSearchResults] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!debouncedQuery) {
        setSearchResults([]); // State to control visibility of results
        setShowResults(false); // Hide results when query is empty
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/subscriptions/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (!response.ok) {
          throw new Error(`Error fetching subscriptions: ${response.statusText}`);
        } // State to control visibility of results
        const data = await response.json();
        setSearchResults(data.subscriptions.slice(0, 10)); // Limit to first 10 results
        setShowResults(true); // Show results when data is fetched
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        setSearchResults([]);
        setShowResults(false); // Hide results on error
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();

  }, [debouncedQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };
  const handleInputBlur = () => {
    // Delay hiding results to allow clicking on a result
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };
  // Animation variants for the results list
  const resultsVariants = { // Animation variants for the results list
    hidden: { opacity: 0, y: -10 }, // Animation variants for the results list
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.05 } }, // Animation variants for the results list
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }, // Animation variants for the results list // Removed extra comma
  }; // Animation variants for the results list

  const resultItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search subscriptions..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="w-full px-10 py-3  border border-gray-700 rounded-md focus:outline-none focus:ring-0 focus:border-blue-500"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400 animate-spin" />
        )}
      </div>


      <AnimatePresence>
        {showResults && (searchResults.length > 0 || (debouncedQuery && !loading && searchResults.length === 0)) && (
          <motion.div
            className="absolute z-10 w-full bg-white border border-gray-700 rounded-md shadow-lg mt-2 max-h-60 overflow-y-auto"
            variants={resultsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((subscription) => (
                  <motion.li
                    key={subscription.id}
                    variants={resultItemVariants}
                  >
                    <Link href={`/dashboard/subscriptions/${subscription.id}`} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center w-full">
                      <div className="flex flex-row items-center justify-between w-full">
                        <div>
                          <div className="font-medium">{subscription.name}</div>
                          <div className="text-xs text-neutral-500">{subscription.price}</div>
                        </div>
                        <div className="text-xs rounded-full px-2 py-1 bg-black text-white">{subscription.category}</div>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-2 text-center text-sm text-gray-400">
                No subscriptions found.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscriptionSearchInput;