// src/app/dashboard/subscriptions/page.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { subscriptions } from "@/server/db/schema";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import SubscriptionForm from "@/components/SubscriptionForm";
import { getSubscriptions } from "@/lib/subscriptions";
import { createSubscription } from "./actions";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";
import { Button as ButtonUI } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

// Define the type for a single subscription based on the schema
type Subscription = typeof subscriptions._.inferSelect;

const ITEMS_PER_PAGE = 5; // Define how many subscriptions to show per page

export default function SubscriptionTracker() {
  const [allSubscriptions, setAllSubscriptions] = useState<Subscription[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);
  const [selectedDateOption, setSelectedDateOption] = useState<string>("today");
  const [openFilterPopover, setOpenFilterPopover] = useState(false);
  const [openCategoryPopover, setOpenCategoryPopover] = useState(false);
  const [openCustomDateDialog, setOpenCustomDateDialog] = useState(false);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [currentPage, setCurrentPage] = useState(1); // State for current page

  useEffect(() => {
    getSubscriptions().then(setAllSubscriptions);
  }, []);

  const calculateDateRange = (option: string) => {
    const now = new Date();
    switch (option) {
      case "today":
        return { from: now, to: now };
      case "lastThreeDays":
        const threeDaysAgo = new Date(now);
        threeDaysAgo.setDate(now.getDate() - 3);
        return { from: threeDaysAgo, to: now };
      case "lastWeek":
        const lastWeek = new Date(now);
        lastWeek.setDate(now.getDate() - 7);
        return { from: lastWeek, to: now };
      case "lastMonth":
        const lastMonth = new Date(now);
        lastMonth.setMonth(now.getMonth() - 1);
        return { from: lastMonth, to: now };
      default:
        return {};
    }
  };

  // Rewritten dateRangeMatch function
  const dateRangeMatch = (subscription: Subscription) => {
    const startDate = new Date(subscription.startDate);
    const renewalDate = subscription.renewalDate ? new Date(subscription.renewalDate) : null;

    // Determine the date range based on the selected option
    const range = selectedDateOption === "custom" ? dateRange : calculateDateRange(selectedDateOption);
    const from = range.from;
    const to = range.to;

    // If no valid range is defined, consider it a match
    if (!from || !to) {
      return true;
    }

    // Check if the start date falls within the range
    const isStartDateWithinRange = startDate >= from && startDate <= to;

    // Check if the renewal date falls within the range (if it exists)
    const isRenewalDateWithinRange = renewalDate
      ? renewalDate >= from && renewalDate <= to
      : false;

    // Return true if either date is within the range
    return isStartDateWithinRange || isRenewalDateWithinRange;
  };


  const handlePriceRangeChange = (values: number[]) => {
    if (values.length === 2) {
      setPriceRange(values);
    }
  };

  const filteredSubscriptions = allSubscriptions.filter((subscription) => {
    const categoryMatch =
      selectedCategory.length > 0
        ? selectedCategory.includes(subscription.category)
        : true;
    const currencyMatch = selectedCurrency
      ? subscription.currency === selectedCurrency
      : true;
    const frequencyMatch = selectedFrequency
      ? subscription.frequency === selectedFrequency
      : true;
    const priceMatch =
      subscription.price >= priceRange[0] && subscription.price <= priceRange[1];
    const dateMatch = dateRangeMatch(subscription);

    return categoryMatch && currencyMatch && frequencyMatch && priceMatch && dateMatch;
  });

  // Pagination Calculations
  const totalPages = Math.ceil(filteredSubscriptions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSubscriptions = filteredSubscriptions.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  const categories = [
    "sports",
    "news",
    "entertainment",
    "lifestyle",
    "technology",
    "finance",
    "politics",
    "other",
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Subscription Tracker
      </h1>
      <div className="flex items-center mt-6 mb-4">
        {/* Category Filter */}
        <Popover open={openCategoryPopover} onOpenChange={setOpenCategoryPopover}>
          <PopoverTrigger asChild>
            <Button variant="outline">Filter by Category</Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategory.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategory([...selectedCategory, category]);
                        } else {
                          setSelectedCategory(
                            selectedCategory.filter((c) => c !== category),
                          );
                        }
                        setCurrentPage(1); // Reset to first page on filter change
                      }}
                    />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Other Filters Popover */}
        <div className="ml-2">
          <Popover open={openFilterPopover} onOpenChange={setOpenFilterPopover}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="p-2"><Filter /></Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
              <div className="grid gap-4">
                {/* Currency Filter */}
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Currency</h4>
                  <div className="flex flex-wrap gap-2">
                    {["USD", "EUR", "GBP"].map((currency) => (
                      <ButtonUI
                        variant={
                          selectedCurrency === currency ? "default" : "outline"
                        }
                        key={currency}
                        onClick={() => {
                           setSelectedCurrency((prev) =>
                            prev === currency ? null : currency,
                           );
                           setCurrentPage(1); // Reset page
                         }
                        }
                        className="w-full justify-start px-3 py-1 text-sm"
                      >
                        {currency}
                      </ButtonUI>
                    ))}
                  </div>
                </div>
                {/* Frequency Filter */}
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Frequency</h4>
                  <div className="flex flex-wrap gap-2">
                    {["daily", "weekly", "monthly", "yearly"].map((frequency) => (
                      <ButtonUI
                        variant={
                          selectedFrequency === frequency ? "default" : "outline"
                        }
                        key={frequency}
                        onClick={() => {
                           setSelectedFrequency((prev) =>
                             prev === frequency ? null : frequency,
                           );
                           setCurrentPage(1); // Reset page
                         }
                        }
                        className="w-full justify-start px-3 py-1 text-sm"
                      >
                        {frequency}
                      </ButtonUI>
                    ))}
                  </div>
                </div>
                {/* Price Range Filter */}
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Price Range</h4>
                  <div className="w-full">
                    <Slider
                       defaultValue={[0, 100000]}
                       max={100000}
                       step={10}
                       onValueChange={(value) => {
                         handlePriceRangeChange(value);
                         setCurrentPage(1); // Reset page
                       }}
                    />
                    <div className="text-sm mt-2">Range: {priceRange[0]} - {priceRange[1]}</div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Date Filter and New Subscription Button */}
        <div className="ml-auto flex items-center">
          {/* Date Select */}
          <Select
            onValueChange={(value) => {
              setSelectedDateOption(value);
              if (value !== "custom") {
                setDateRange({}); // Reset custom range if another option is selected
              }
              setCurrentPage(1); // Reset page
            }}
            defaultValue={selectedDateOption}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="lastThreeDays">Last 3 Days</SelectItem>
              <SelectItem value="lastWeek">Last Week</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>

          {/* Custom Date Dialog Trigger */}
          {selectedDateOption === "custom" && (
            <Dialog open={openCustomDateDialog} onOpenChange={setOpenCustomDateDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2">
                  Select Custom Range
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[340px]">
                <DialogHeader>
                  <DialogTitle>Select Custom Date Range</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => {
                        setDateRange(range || {});
                    }}
                    initialFocus
                    className="flex justify-center" // Center the calendar
                  />
                  {dateRange.from && dateRange.to && (
                    <div className="text-sm text-center pt-2"> {/* Added text-center and padding */}
                      Range:{" "}
                      {dateRange.from.toLocaleDateString()} -{" "}
                      {dateRange.to.toLocaleDateString()}
                    </div>
                  )}
                </div>
                 <Button onClick={() => {
                     setOpenCustomDateDialog(false);
                     setCurrentPage(1); // Reset page after confirming range
                    }} className="mt-4 w-full">
                    Confirm
                 </Button>
              </DialogContent>
            </Dialog>
          )}

          {/* New Subscription Dialog */}
          <div className="ml-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>New Subscription</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add subscription</DialogTitle>
                  <DialogDescription>Add a new subscription.</DialogDescription>
                </DialogHeader>
                <SubscriptionForm
                  onSubmit={async (data) => {
                    try {
                      await createSubscription(data);
                      const updatedSubscriptions = await getSubscriptions(); // Refetch
                      setAllSubscriptions(updatedSubscriptions);
                      setCurrentPage(1); // Go to first page after adding
                      // Close dialog on success - needs dialog state management
                    } catch (error) {
                      console.error("Error creating subscription:", error);
                    }
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Subscription List */}
      <div className="space-y-4">
        {currentSubscriptions.length > 0 ? (
          currentSubscriptions.map((subscription: Subscription) => (
            <div key={subscription.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {subscription.name}
                  </h2>
                  <p className="text-gray-600">Category: {subscription.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">
                    {subscription.price} {subscription.currency}
                  </p>
                  {subscription.renewalDate ? (
                    <p className="text-sm text-gray-600">
                      Renews on:{" "}
                      {new Date(
                        subscription.renewalDate,
                      ).toLocaleDateString()}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">No subscriptions match the current filters.</div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(Math.max(1, currentPage - 1));
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {/* Simplified page number rendering - can be expanded */}
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              // Add logic here for ellipsis if needed for many pages
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(Math.min(totalPages, currentPage + 1));
                }}
                 className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
