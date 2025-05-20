import * as motion from "motion/react-client";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { H1, H2, Paragraph } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto py-12">
            <div className="max-w-3xl mx-auto">
                <H1 className="text-3xl font-bold text-center mb-8">Pricing Plans</H1>
                <Paragraph className="text-lg text-gray-600 text-center mb-12">
                    Choose the plan that best fits your needs.
                </Paragraph>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Basic Plan */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Basic</CardTitle>
                            <CardDescription className="text-gray-600">$9.99/month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li>
                                    <span className="font-medium">Number of Subscriptions:</span> 5
                                </li>
                                <li>
                                    <span className="font-medium">Alerts & Notifications:</span> Yes
                                </li>
                                <li>
                                    <span className="font-medium">Reporting & Analytics:</span> Basic
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                        <Button>Get Started</Button>
                        </CardFooter>
                    </Card>
                    {/* Pro Plan */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Pro</CardTitle>
                            <CardDescription className="text-gray-600">$29.99/month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li>
                                    <span className="font-medium">Number of Subscriptions:</span> 20
                                </li>
                                <li>
                                    <span className="font-medium">Alerts & Notifications:</span> Yes
                                </li>
                                <li>
                                    <span className="font-medium">Reporting & Analytics:</span> Advanced
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button>Get Started</Button>
                        </CardFooter>
                    </Card>
                    {/* Premium Plan */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Premium</CardTitle>
                            <CardDescription className="text-gray-600">$49.99/month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li><span className="font-medium">Number of Subscriptions:</span> Unlimited</li>
                                <li><span className="font-medium">Alerts & Notifications:</span> Yes</li>
                                <li><span className="font-medium">Reporting & Analytics:</span> Full</li>
                            </ul>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button>Get Started</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </motion.main>
    );
}  