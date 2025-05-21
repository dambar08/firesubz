import { z } from "zod";

export const subscriptionSchema = z.object({
    name: z.string().max(100, "Name must be 100 characters or less").min(1, "Name is required"),
    price: z.number({ required_error: "Price is required", invalid_type_error: "Price must be a number" }),
    currency: z.enum(["USD", "EUR", "GBP"], { required_error: "Currency is required" }).default("USD"),
    frequency: z.enum(["daily", "weekly", "monthly", "yearly", "one-time"], { required_error: "Frequency is required" }),
    category: z.enum(["sports", "news", "entertainment", "lifestyle", "technology", "finance", "politics", "other"], { required_error: "Category is required" }),
    paymentMethod: z.string({ required_error: "Payment method is required" }).min(1, "Payment method is required"),
    status: z.enum(["active", "cancelled", "expired"], { required_error: "Status is required" }).default("active"),
    startDate: z.date({ required_error: "Start date is required", invalid_type_error: "Start date must be a valid date" }),
    renewalDate: z.date({ invalid_type_error: "Renewal date must be a valid date" }).optional(),
});