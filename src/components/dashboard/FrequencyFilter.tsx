"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FrequencyFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFrequency = searchParams.get("frequency") ?? "";

  const handleFrequencyChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "all") {
      params.set("frequency", value);
    } else {
      params.delete("frequency");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleFrequencyChange} value={currentFrequency}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter Frequency" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>All Frequencies</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
          <SelectItem value="one-time">One-time</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FrequencyFilter;