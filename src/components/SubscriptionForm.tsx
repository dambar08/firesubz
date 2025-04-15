// src/components/SubscriptionForm.tsx`
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const subscriptionSchema = z.object({
  name: z.string().max(100, "Name must be 100 characters or less").min(1, "Name is required"),
  price: z.number({ required_error: "Price is required", invalid_type_error: "Price must be a number" }).positive("Price must be positive"),
  currency: z.enum(["USD", "EUR", "GBP"], { required_error: "Currency is required" }).default("USD"),
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"], { required_error: "Frequency is required" }),
  category: z.enum(["sports", "news", "entertainment", "lifestyle", "technology", "finance", "politics", "other"], { required_error: "Category is required" }),
  paymentMethod: z.string({ required_error: "Payment method is required" }).min(1, "Payment method is required"),
  status: z.enum(["active", "cancelled", "expired"], { required_error: "Status is required" }).default("active"),
  startDate: z.date({ required_error: "Start date is required", invalid_type_error: "Start date must be a valid date" }),
  renewalDate: z.date({ invalid_type_error: "Renewal date must be a valid date" }).optional(),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

interface SubscriptionFormProps {
  onSubmit: (data: SubscriptionFormValues) => void;
}


const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onSubmit }) => {
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      price: 0,
      currency: "USD",
      frequency: "daily",
      category: "sports",
      paymentMethod: "",
      status: "active",
      startDate: new Date(),
    }
  });

  const handleFormSubmit = async (data: SubscriptionFormValues) => {
    setFormError(null);
    try {
      onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError("An error occurred during submission. Please try again.");
    }
  };

  const { handleSubmit } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong> {formError}
          </div>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" id="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" id="price" {...field} onChange={(e) => {
                  const value = e.target.value === "" ? 0 : Number(e.target.value);
                  onChange(value);
                }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField

          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="politics">Politics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <Input type="text" id="paymentMethod" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Subscription</Button>
      </form>
    </Form>
  )
};

export default SubscriptionForm;