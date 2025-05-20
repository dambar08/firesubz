'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

const CurrencyFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const currentCurrency = ALL_CURRENCIES.includes(searchParams.get('currency') ?? '') ? searchParams.get('currency') : '';
  const currentCurrency = searchParams.get('currency') ?? '';

  const handleCurrencyChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "all") {
      params.set('currency', value);
    } else {
      params.delete('currency');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleCurrencyChange} value={currentCurrency}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>All Currencies</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="EUR">EUR</SelectItem>
          <SelectItem value="GBP">GBP</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CurrencyFilter;