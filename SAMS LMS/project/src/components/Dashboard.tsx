import React from 'react';
import { ArrowRight, Book, Clock, Star, Users } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Introduction to Computer Science',
    instructor: 'Dr. Sarah Johnson',
    progress: 75,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    title: 'Advanced Mathematics',
    instructor: 'Prof. Michael Chen',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 3,
    title: 'Business Analytics',
    instructor: 'Dr. Emily Brown',
    progress: 90,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

const stats = [
  { name: 'Active Courses', stat: '12', icon: Book },
  { name: 'Hours Spent', stat: '48.5', icon: Clock },
  { name: 'Assignments', stat: '24', icon: Star },
  { name: 'Study Groups', stat: '4', icon: Users },
];

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <main className="flex-1 relative pb-8">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.name}
                  className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg overflow-hidden shadow"
                >
                  <dt>
                    <div className="absolute bg-blue-500 rounded-md p-3">
                      <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </p>
                  </dt>
                  <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {item.stat}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-8 text-lg leading-6 font-medium text-gray-900">
              Active Courses
            </h2>

            <div className="mt-4 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="h-48 w-full relative">
                    <img
                      className="w-full h-full object-cover"
                      src={course.image}
                      alt={course.title}
                    />
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{course.instructor}</p>
                    <div className="mt-4">
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                          <div
                            style={{ width: `${course.progress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          ></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            Progress: {course.progress}%
                          </span>
                          <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                            Continue <ArrowRight className="ml-1 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}