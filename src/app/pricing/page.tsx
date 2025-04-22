import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { H1, H2, Paragraph } from "@/components/ui/typography";

export default function PricingPage() {
    return (
        <div className="container mx-auto py-12">
            <H1 className="text-3xl font-bold text-center mb-8">Pricing Plans</H1>
            <Paragraph className="text-lg text-gray-600 text-center mb-12">
                Choose the plan that best fits your needs.
            </Paragraph>

            <Table>
                <TableCaption>Our subscription plans and features.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Feature</TableHead>
                        <TableHead>Basic</TableHead>
                        <TableHead>Pro</TableHead>
                        <TableHead>Premium</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Number of Subscriptions</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>20</TableCell>
                        <TableCell>Unlimited</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Alerts & Notifications</TableCell>
                        <TableCell>Yes</TableCell>
                        <TableCell>Yes</TableCell>
                        <TableCell>Yes</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Reporting & Analytics</TableCell>
                        <TableCell>Basic</TableCell>
                        <TableCell>Advanced</TableCell>
                        <TableCell>Full</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Price</TableCell>
                        <TableCell>$9.99/month</TableCell>
                        <TableCell>$29.99/month</TableCell>
                        <TableCell>$49.99/month</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}  