'use client';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import ActionSearch from "@/components/ActionSearch";
import {
  List,
  X,
  LayoutDashboard,
  CreditCard,
  Settings,
  Search,
  Command,
  Bell,
} from 'lucide-react';
import { FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setOpen(!open);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      setOpen((prevOpen) => !prevOpen);
    }
  }, []);
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <aside
      className={`left-0 top-0 h-full bg-gray-100 p-4 transition-all duration-300 shadow-md ${isExpanded ? 'w-64' : 'w-16'
        }`} >
      <div className="flex justify-between items-center mb-4 hidden">
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isExpanded ? (
            <X className="h-6 w-6" />
          ) : (
            <List className="h-6 w-6" />
          )}
        </button>
      </div>
      <nav className="">

        <ul className="">
          <li className="mb-2">
            {isExpanded && (

              <div className="mb-4">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <button className="w-full px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      {isExpanded && (
                        <>
                          <span>Search</span>
                          <kbd className="ml-auto rounded-md border border-gray-300 bg-gray-100 px-1.5 font-mono text-[0.7rem] font-medium text-gray-800"> <Command className='inline-block w-3 h-3 mr-1' />K</kbd>
                        </>
                      )}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] ">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <div className="p-4 bg-white">
                      {/* Add your search input here */}
                      <input type="text" placeholder="Search..." className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                      <ActionSearch />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>)}
          </li>
          <li className="mb-2">
            <Link
              href="/dashboard"
              className={`block py-2 px-4 hover:bg-gray-200 rounded ${!isExpanded && 'text-center'
                }`}
            >
              <div className='flex items-center gap-2'>
                <LayoutDashboard className={`h-4 w-4`} style={!isExpanded ? { margin: '0 auto' } : {}} />
                {isExpanded && <span className="ml-2">Dashboard</span>}
              </div>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/dashboard/subscriptions"
              className={`block py-2 px-4 hover:bg-gray-200 rounded ${!isExpanded && 'text-center'}`}
            >
              <div className='flex items-center gap-2'>
                <CreditCard className={`h-4 w-4`} style={!isExpanded ? { margin: '0 auto' } : {}} />
                {isExpanded && <span className="ml-2">Subscriptions</span>}
              </div>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/dashboard/reports"
              className={`block py-2 px-4 hover:bg-gray-200 rounded ${!isExpanded && 'text-center'}`}
            >
              <div className='flex items-center gap-2'>
                <FileText className={`h-4 w-4`} style={!isExpanded ? { margin: '0 auto' } : {}} />
                {isExpanded && <span className="ml-2">Reports</span>}
              </div>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/dashboard/notifications"
              className={`block py-2 px-4 hover:bg-gray-200 rounded ${!isExpanded && 'text-center'}`}
            >
              <div className='flex items-center gap-2'>
                <Bell className={`h-4 w-4`} style={!isExpanded ? { margin: '0 auto' } : {}} />
                {isExpanded && <span className="ml-2">Notifications</span>}
              </div>
            </Link>
          </li>
          <li className="">
            <Link
              href="/dashboard/settings"
              className={`block py-2 px-4 hover:bg-gray-200 rounded ${!isExpanded && 'text-center'}`}
            >
              <div className='flex items-center gap-2'>
                <Settings className={`h-4 w-4`} style={!isExpanded ? { margin: '0 auto' } : {}} />
                {isExpanded && <span className="ml-2">Settings</span>
                }
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;