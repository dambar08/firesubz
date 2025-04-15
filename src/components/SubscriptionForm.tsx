// src/components/SubscriptionForm.tsx
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

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
  const { register, handleSubmit, formState: { errors } } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      currency: "USD",
      status: "active",
    },
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

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong> {formError}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" {...register("name")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input type="number" id="price" {...register("price", { valueAsNumber: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
        <select id="currency" {...register("currency")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        {errors.currency && <p className="mt-2 text-sm text-red-600">{errors.currency.message}</p>}
      </div>

      <div>
        <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Frequency</label>
        <select id="frequency" {...register("frequency")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        {errors.frequency && <p className="mt-2 text-sm text-red-600">{errors.frequency.message}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select id="category" {...register("category")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          <option value="sports">Sports</option>
          <option value="news">News</option>
          <option value="entertainment">Entertainment</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="technology">Technology</option>
          <option value="finance">Finance</option>
          <option value="politics">Politics</option>
          <option value="other">Other</option>
        </select>
        {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
        <input type="text" id="paymentMethod" {...register("paymentMethod")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        {errors.paymentMethod && <p className="mt-2 text-sm text-red-600">{errors.paymentMethod.message}</p>}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select id="status" {...register("status")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          <option value="active">Active</option>
          <option value="cancelled">Cancelled</option>
          <option value="expired">Expired</option>
        </select>
        {errors.status && <p className="mt-2 text-sm text-red-600">{errors.status.message}</p>}
      </div>

      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
        <input type="date" id="startDate" {...register("startDate", { valueAsDate: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        {errors.startDate && <p className="mt-2 text-sm text-red-600">{errors.startDate.message}</p>}
      </div>

      <div>
        <label htmlFor="renewalDate" className="block text-sm font-medium text-gray-700">Renewal Date (Optional)</label>
        <input type="date" id="renewalDate" {...register("renewalDate", { valueAsDate: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        {errors.renewalDate && <p className="mt-2 text-sm text-red-600">{errors.renewalDate.message}</p>}
      </div>

      <Button type="submit">Add Subscription</Button>
    </form>
  );
};

export default SubscriptionForm;