// src/app/dashboard/settings/page.tsx
'use server';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateName(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  // Update logic here, e.g., interacting with a database
  console.log('Updating name to:', { firstName, lastName });
  // Update the user's name in the database
  revalidatePath('/dashboard/settings');
  redirect('/dashboard/settings');
}

export async function deleteAccount() {
  // Add your account deletion logic here
  console.log('Requesting account deletion');
  // revalidatePath('/dashboard/settings');
  redirect('/dashboard'); // Redirect to home page or login page after deletion
}

export default async function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Update Name Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Update Name</h2>
          <form action={updateName}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  className="mt-1 w-full"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  className="mt-1 w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Update Name
              </Button>
            </div>
          </form>
        </div>

        {/* Delete Account Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
          <form>
              <p className="mb-4 text-gray-600">
                Permanently delete your account and all associated data.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button" variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Account Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to permanently delete your account?
                      This action cannot be undone. Type "delete" to confirm.
                    </DialogDescription>
                  </DialogHeader>
                  <form action={deleteAccount}>
                  <div className="py-4">
                    <Input type="text" placeholder="Type delete to confirm" />
                  </div>
                  <DialogFooter>
                  
                      <Button type="submit"  variant="destructive" className="w-full" >
                          Delete Account
                      </Button>
                   
                  </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            
          </form>
        </div>
      </div>
    </div>
  );
}