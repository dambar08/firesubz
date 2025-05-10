"use client";

import * as React from "react";
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

const StatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status");

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "all") {
      params.set("status", value);
    } else {
      params.delete("status");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleStatusChange} value={currentStatus || ""}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        <SelectLabel>All Statuses</SelectLabel>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="cancelled">Cancelled</SelectItem>
        <SelectItem value="expired">Expired</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
