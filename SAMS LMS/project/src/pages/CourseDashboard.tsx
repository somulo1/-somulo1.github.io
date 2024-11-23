import React from 'react';

const CourseDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Course Dashboard</h1>
      
      {/* Course Search and Filters */}
      <div className="mb-8">
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search courses..."
            className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Categories</option>
            <option value="programming">Programming</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
            <option value="marketing">Marketing</option>
          </select>
          <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((course) => (
          <div key={course} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                <span className="text-white font-semibold">Course {course}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Introduction to Programming</h3>
              <p className="text-gray-600 text-sm mb-4">Learn the basics of programming with this comprehensive course.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">12 weeks • 36 lessons</span>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  View Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
        </nav>
      </div>
    </div>
  );
};

export default CourseDashboard;
