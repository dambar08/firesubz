// src/app/dashboard/reports/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from "@/components/ui/label";


export default function ReportsPage() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Reports</h1>
      <Card>
         <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
         <CardContent>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="reportType">Report Type</Label>
              <Select >
                <SelectTrigger id="reportType" className="w-[180px]">
                <SelectValue placeholder="Select a report type" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="summary">Subscription Summary</SelectItem>
              </SelectContent>
               </Select>
           </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
               <Label htmlFor="reportFormat">Report Format</Label>
              <Select>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select format' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='pdf'>PDF</SelectItem>
                  <SelectItem value='word'>Word</SelectItem>
                  <SelectItem value='html'>HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>
               {/* Dummy Report Preview */}
            <div className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Report Preview</h3>
              <div className="bg-gray-100 p-3 rounded-md">
                <h4 className="font-medium">Subscription Summary</h4>
                <p className="text-sm text-gray-600">
                  This is a dummy preview of the subscription summary report. It
                  will include details such as subscription names, categories,
                  prices, and renewal dates.
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Data will be dynamically generated upon report generation.
                </p>
              </div>
            </div>
            <Button>Generate Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}