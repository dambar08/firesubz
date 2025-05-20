"use client";
import React from 'react';
import * as motion from "motion/react-client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const VerifyRequestPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"><Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
          <CardDescription className="text-center text-gray-500 dark:text-gray-400">
            A verification email has been sent to your address.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900">
            <Mail className="w-6 h-6 text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-center">
            Please check your inbox (and spam folder) and click the link provided to verify your email address.
          </p>
          <Button className='hidden' variant="outline" onClick={() => {
            // Add any action you want to perform here, e.g., redirect to the home page
            console.log("Verification email resent or other action");
          }}>
            Resend Verification Email (Not Implemented)
          </Button>
        </CardContent>
      </Card></motion.div>
  );
};

export default VerifyRequestPage;