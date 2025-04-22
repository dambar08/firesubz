// src/app/dashboard/subscriptions/page.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"; // Keep Dialog for New Subscription
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
import { Filter, CalendarIcon } from "lucide-react"; // Import CalendarIcon
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
import { format } from "date-fns";
import { type DateRange } from "react-day-picker"; 

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
  // Remove openCustomDateDialog state
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined); // Use DateRange type
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [currentPage, setCurrentPage] = useState(1); // State for current page

  useEffect(() => {
    getSubscriptions().then(setAllSubscriptions);
  }, []);

  const calculateDateRange = (option: string): DateRange | undefined => {
    const now = new Date();
    // Ensure time part is zeroed out for consistent comparisons
    now.setHours(0, 0, 0, 0);
    switch (option) {
      case "today":
        const todayEnd = new Date(now);
        todayEnd.setHours(23, 59, 59, 999);
        return { from: now, to: todayEnd };
      case "lastThreeDays":
        const threeDaysAgo = new Date(now);
        threeDaysAgo.setDate(now.getDate() - 3);
        const yesterdayEnd = new Date(now);
        yesterdayEnd.setDate(now.getDate()); // Today's end time is fine
        yesterdayEnd.setHours(23, 59, 59, 999);
        return { from: threeDaysAgo, to: yesterdayEnd };
      case "lastWeek":
        const lastWeekStart = new Date(now);
        lastWeekStart.setDate(now.getDate() - 7);
        const lastWeekEnd = new Date(now);
        lastWeekEnd.setHours(23, 59, 59, 999);
        return { from: lastWeekStart, to: lastWeekEnd };
      case "lastMonth":
        const lastMonthStart = new Date(now);
        lastMonthStart.setMonth(now.getMonth() - 1);
        const lastMonthEnd = new Date(now);
        lastMonthEnd.setHours(23, 59, 59, 999);
        return { from: lastMonthStart, to: lastMonthEnd };
      default:
        return undefined;
    }
  };

  // Rewritten dateRangeMatch function
  const dateRangeMatch = (subscription: Subscription) => {
    const startDate = new Date(subscription.startDate);
    startDate.setHours(0,0,0,0); // Normalize time
    const renewalDate = subscription.renewalDate ? new Date(subscription.renewalDate) : null;
    if (renewalDate) renewalDate.setHours(0,0,0,0); // Normalize time

    // Determine the date range based on the selected option
    const range = selectedDateOption === "custom" ? dateRange : calculateDateRange(selectedDateOption);

    // If no valid range is defined (e.g., initial state or error), consider it a match
    if (!range || !range.from || !range.to) {
      return true;
    }

    const from = range.from;
    const to = range.to;

    // Ensure 'to' date includes the whole day for comparison
    const toEndOfDay = new Date(to);
    toEndOfDay.setHours(23, 59, 59, 999);

    // Check if the start date falls within the range
    const isStartDateWithinRange = startDate >= from && startDate <= toEndOfDay;

    // Check if the renewal date falls within the range (if it exists)
    const isRenewalDateWithinRange = renewalDate
      ? renewalDate >= from && renewalDate <= toEndOfDay
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
      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-2 mt-6 mb-4">
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
                    <Label htmlFor={category} className="capitalize">{category}</Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Other Filters Popover */}
        <Popover open={openFilterPopover} onOpenChange={setOpenFilterPopover}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="p-2"><Filter /></Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80">
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
                      size="sm"
                      key={currency}
                      onClick={() => {
                        setSelectedCurrency((prev) =>
                          prev === currency ? null : currency,
                        );
                        setCurrentPage(1); // Reset page
                      }
                      }
                      className="flex-grow"
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
                      size="sm"
                      key={frequency}
                      onClick={() => {
                        setSelectedFrequency((prev) =>
                          prev === frequency ? null : frequency,
                        );
                        setCurrentPage(1); // Reset page
                      }
                      }
                       className="flex-grow capitalize"
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
                  <div className="text-sm mt-2 text-center">Range: ${priceRange[0]} - ${priceRange[1]}</div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Spacer to push Date/New button to the right */}
        <div className="flex-grow"></div>


        {/* Date Filter and New Subscription Button Container */}
        <div className="flex items-center gap-2">
          {/* Date Select */}
          <Select
            onValueChange={(value) => {
              setSelectedDateOption(value);
              if (value !== "custom") {
                setDateRange(undefined); // Reset custom range if another option is selected
              }
              setCurrentPage(1); // Reset page
            }}
            defaultValue={selectedDateOption}
          >
            <SelectTrigger className="w-auto sm:w-[180px]">
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

          {/* Custom Date Range Picker Trigger */}
          {selectedDateOption === "custom" && (
             <Popover>
               <PopoverTrigger asChild>
                 <Button
                   id="date"
                   variant={"outline"}
                   className={cn(
                     "w-auto justify-start text-left font-normal",
                     !dateRange && "text-muted-foreground"
                   )}
                 >
                   <CalendarIcon className="mr-2 h-4 w-4" />
                   {dateRange?.from ? (
                     dateRange.to ? (
                       <>
                         {format(dateRange.from, "LLL dd, y")} -{" "}
                         {format(dateRange.to, "LLL dd, y")}
                       </>
                     ) : (
                       format(dateRange.from, "LLL dd, y")
                     )
                   ) : (
                     <span>Pick a date range</span>
                   )}
                 </Button>
               </PopoverTrigger>
               <PopoverContent className="w-auto p-0" align="end">
                 <Calendar
                   initialFocus
                   mode="range"
                   defaultMonth={dateRange?.from}
                   selected={dateRange}
                   onSelect={(newRange) => {
                       setDateRange(newRange);
                       setCurrentPage(1); // Reset page when range changes
                    }}
                   numberOfMonths={1} // Simplified for better mobile view
                 />
               </PopoverContent>
             </Popover>
          )}

          {/* New Subscription Dialog */}
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
                    setAllSubscriptions(updatedSubscriptions); // Ensure this state update happens
                    setCurrentPage(1); // Go to first page after adding
                    // Close dialog on success - needs dialog state management if parent controls it
                  } catch (error) {
                    console.error("Error creating subscription:", error);
                  }
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Subscription List */}
      <div className="space-y-4">
        {currentSubscriptions.length > 0 ? (
          currentSubscriptions.map((subscription: Subscription) => (
            <div key={subscription.id} className="bg-white p-4 sm:p-6 rounded-lg shadow-md"> {/* Adjusted padding */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="mb-2 sm:mb-0"> {/* Added margin-bottom for small screens */}
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {subscription.name}
                  </h2>
                  <p className="text-sm text-gray-600 capitalize"> {/* Capitalized category */}
                     Category: {subscription.category}
                  </p>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto"> {/* Text alignment for small screens */}
                  <p className="font-semibold sm:font-bold text-gray-800"> {/* Adjusted font weight */}
                    ${subscription.price.toFixed(2)} {subscription.currency} {/* Added formatting */}
                  </p>
                  {subscription.renewalDate ? (
                    <p className="text-xs sm:text-sm text-gray-500"> {/* Adjusted text size */}
                      Renews on:{" "}
                      {new Date(
                        subscription.renewalDate,
                      ).toLocaleDateString()}
                    </p>
                  ) : (
                     <p className="text-xs sm:text-sm text-gray-500">One-time</p> // Indicate one-time if no renewal
                  )}
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
                className={cn("cursor-pointer", currentPage === 1 ? "pointer-events-none opacity-50" : "")}
              />
            </PaginationItem>
            {/* Dynamic Page Number Rendering with Ellipsis (Basic Example) */}
            {(() => {
               const pageNumbers = [];
               const maxPagesToShow = 5; // Adjust how many page numbers to show
               const halfMax = Math.floor(maxPagesToShow / 2);
               let startPage = Math.max(1, currentPage - halfMax);
               let endPage = Math.min(totalPages, currentPage + halfMax);

               if (currentPage - halfMax <= 1) {
                   endPage = Math.min(totalPages, maxPagesToShow);
               }
               if (currentPage + halfMax >= totalPages) {
                   startPage = Math.max(1, totalPages - maxPagesToShow + 1);
               }

               if (startPage > 1) {
                  pageNumbers.push(
                     <PaginationItem key={1}>
                       <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(1); }}>1</PaginationLink>
                     </PaginationItem>
                  );
                  if (startPage > 2) {
                     pageNumbers.push(<PaginationItem key="start-ellipsis"><PaginationEllipsis /></PaginationItem>);
                  }
               }

               for (let i = startPage; i <= endPage; i++) {
                 pageNumbers.push(
                   <PaginationItem key={i}>
                     <PaginationLink
                       href="#"
                       onClick={(e) => { e.preventDefault(); handlePageChange(i); }}
                       isActive={currentPage === i}
                       className="cursor-pointer"
                     >
                       {i}
                     </PaginationLink>
                   </PaginationItem>
                 );
               }

                if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                       pageNumbers.push(<PaginationItem key="end-ellipsis"><PaginationEllipsis /></PaginationItem>);
                    }
                    pageNumbers.push(
                       <PaginationItem key={totalPages}>
                         <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(totalPages); }}>{totalPages}</PaginationLink>
                       </PaginationItem>
                    );
                 }

               return pageNumbers;
             })()}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(Math.min(totalPages, currentPage + 1));
                }}
                 className={cn("cursor-pointer", currentPage === totalPages ? "pointer-events-none opacity-50" : "")}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
