import React from 'react';
import { Bell, Menu, Search, Settings, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button className="p-2 rounded-md text-gray-400 lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">SAMS LMS</h1>
            </div>
            <div className="hidden lg:flex lg:ml-10">
              <div className="flex space-x-4">
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900">Dashboard</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900">Courses</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900">Calendar</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900">Messages</a>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <button className="flex-shrink-0 p-1 ml-4 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Bell className="h-6 w-6 text-gray-400" />
            </button>
            <button className="flex-shrink-0 p-1 ml-4 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Settings className="h-6 w-6 text-gray-400" />
            </button>
            <div className="ml-4 flex items-center">
              <button className="flex-shrink-0 rounded-full p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <User className="h-8 w-8 rounded-full text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}