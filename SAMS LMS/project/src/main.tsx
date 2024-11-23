import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import './index.css';

// Error Fallback Component
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-600">
      <div className="text-white text-center p-8 max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <pre className="text-sm bg-red-900/50 p-4 rounded-lg overflow-auto">
          {error.message}
        </pre>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => window.location.reload()}
        >
          Reload Application
        </button>
      </div>
    </div>
  );
}

// Handle any unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Create a function to render the app after styles are loaded
const renderApp = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Root element not found! Please check your index.html file.');
  }

  ReactDOM.render(
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
    rootElement
  );
};

// Wait for stylesheets and other resources to load
if (document.readyState === 'complete') {
  renderApp();
} else {
  window.addEventListener('load', renderApp);
}

// Enable HMR (Hot Module Replacement) in development
if (import.meta.hot) {
  import.meta.hot.accept();
}
