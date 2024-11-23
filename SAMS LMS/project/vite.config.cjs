const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const path = require('path');

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        sourcemap: true,
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three'],
          'three-fiber': ['@react-three/fiber'],
          'three-drei': ['@react-three/drei'],
          'state-vendor': ['zustand', 'react-query']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5176,
    host: true,
    fs: {
      strict: false
    }
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'three', 
      '@react-three/fiber', 
      '@react-three/drei',
      'zustand',
      'react-query',
      'react-router-dom'
    ]
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    target: 'es2020',
    sourcemap: true
  }
});
