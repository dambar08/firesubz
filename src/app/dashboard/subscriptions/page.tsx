// src/app/dashboard/subscriptions/page.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { subscriptions } from "@/server/db/schema";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import SubscriptionForm from "@/components/SubscriptionForm";
import { getSubscriptions } from "@/lib/subscriptions";
import { createSubscription } from "./actions";
import { DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
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
import { cn } from "@/lib/utils";

export default function SubscriptionTracker() {
  const [allSubscriptions, setAllSubscriptions] = useState<
    typeof subscriptions._.inferSelect[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(
    null,
  );
  const [selectedDateOption, setSelectedDateOption] = useState<string>("today");
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);

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

  const dateRangeMatch = (subscription: typeof subscriptions._.inferSelect) => {
    if (selectedDateOption !== "custom") {
      const { from, to } = calculateDateRange(selectedDateOption);
      if (!from || !to) return true;
      return (
        (subscription.startDate >= from && subscription.startDate <= to) ||
        (subscription.renewalDate && subscription.renewalDate >= from && subscription.renewalDate <= to)
      );
    }
    const { from, to } = dateRange;
    return (
      (startDate >= dateRange.from && startDate <= dateRange.to) ||
      (renewalDate >= dateRange.from && renewalDate <= dateRange.to)
    );
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
    <div className="container mx-auto py-10 ">
      <h1 className="text-3xl font-bold text-center mb-8">
        Subscription Tracker
      </h1>
      <div className="flex items-center mt-6 mb-4">
        <Popover open={openCategory} onOpenChange={setOpenCategory}>
          <PopoverTrigger asChild>
            <Button variant="outline">Filter by Category</Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80">
            <div className="space-y-2"> <h4 className="font-medium leading-none">Category</h4>
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
                      }}
                    />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="ml-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="p-2"><Filter /></Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">

              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Currency</h4>
                  <div className="flex flex-wrap gap-2">
                    {["USD", "EUR", "GBP"].map((currency) => (
                      <ButtonUI
                        variant={
                          selectedCurrency === currency ? "default" : "outline"
                        }
                        key={currency}
                        onClick={() =>
                          setSelectedCurrency((prev) =>
                            prev === currency ? null : currency,
                          )
                        }
                        className="w-full justify-start px-3 py-1 text-sm"
                      >
                        {currency}
                      </ButtonUI>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Frequency</h4>
                  <div className="flex flex-wrap gap-2">
                    {["daily", "weekly", "monthly", "yearly"].map((frequency) => (
                      <ButtonUI
                        variant={
                          selectedFrequency === frequency ? "default" : "outline"
                        }
                        key={frequency}
                        onClick={() =>
                          setSelectedFrequency((prev) =>
                            prev === frequency ? null : frequency,
                          )
                        }
                        className="w-full justify-start px-3 py-1 text-sm"
                      >
                        {frequency}
                      </ButtonUI>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Price Range</h4>
                  <div className="w-full">
                    <Slider defaultValue={[0, 100000]} max={100000} step={10} onValueChange={handlePriceRangeChange} />
                    <div className="text-sm mt-2">Range: {priceRange[0]} - {priceRange[1]}</div>
                  </div>
                </div>
              </div>

            </PopoverContent>
          </Popover>
        </div>
        <div className="ml-auto flex items-center mt-6 mb-4">
          <Select
            onValueChange={(value) => {
              setSelectedDateOption(value);
            }}
            defaultValue={selectedDateOption}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="lastThreeDays">Last 3 Days</SelectItem>
              <SelectItem value="lastWeek">Last Week</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>

          {selectedDateOption === "custom" && (
            <div className="space-y-2">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                initialFocus
                className={cn("rounded-md border", "sm:w-[340px]")}
              />
              {dateRange.from && dateRange.to && (
                <div className="text-sm">
                  Range:{" "}
                  {dateRange.from.toLocaleDateString()}{" "}
                  - {dateRange.to.toLocaleDateString()}
                </div>
              )}
            </div>
          )}
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
                      getSubscriptions().then(setAllSubscriptions);
                    } catch (error) {
                      console.error("Error creating subscription:", error);
                    } finally {
                      // Optionally, close the dialog here if needed
                      // For example, if you're using a state to control the dialog's open/close state
                    }
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredSubscriptions.map((subscription) => (
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
        ))}
      </div>
    </div>
  );
}
;
