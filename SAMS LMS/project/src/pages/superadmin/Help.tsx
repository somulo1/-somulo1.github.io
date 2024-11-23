import React from 'react';
import { HelpCircle, Book, MessageCircle, Video, FileText } from 'lucide-react';

const Help: React.FC = () => {
  const helpResources = [
    {
      title: 'Documentation',
      description: 'Comprehensive guides and API references',
      icon: <Book className="h-6 w-6" />,
      link: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for common tasks',
      icon: <Video className="h-6 w-6" />,
      link: '#'
    },
    {
      title: 'FAQs',
      description: 'Frequently asked questions and answers',
      icon: <HelpCircle className="h-6 w-6" />,
      link: '#'
    },
    {
      title: 'Support',
      description: 'Contact our support team',
      icon: <MessageCircle className="h-6 w-6" />,
      link: '#'
    }
  ];

  const articles = [
    {
      title: 'Getting Started Guide',
      category: 'Basics',
      readTime: '5 min'
    },
    {
      title: 'User Management Best Practices',
      category: 'Administration',
      readTime: '8 min'
    },
    {
      title: 'System Configuration Guide',
      category: 'Settings',
      readTime: '10 min'
    },
    {
      title: 'Security Best Practices',
      category: 'Security',
      readTime: '12 min'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Help Center</h1>
        <p className="text-gray-600">Find help and resources for managing your SAMS LMS platform</p>
      </div>

      {/* Help Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {helpResources.map((resource, index) => (
          <a
            key={index}
            href={resource.link}
            className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-indigo-600 mb-4">{resource.icon}</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{resource.title}</h3>
            <p className="text-gray-600">{resource.description}</p>
          </a>
        ))}
      </div>

      {/* Popular Articles */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <FileText className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Popular Articles</h2>
        </div>
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-indigo-600">{article.category}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{article.readTime} read</span>
                </div>
              </div>
              <div className="text-gray-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-8 bg-indigo-50 rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Still need help?
          </h2>
          <p className="text-gray-600 mb-4">
            Our support team is available 24/7 to assist you
          </p>
          <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <MessageCircle className="h-5 w-5 mr-2" />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;
