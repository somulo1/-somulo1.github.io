var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// vite.config.ts
var react = __require("@vitejs/plugin-react");
var { defineConfig } = __require("vite");
module.exports = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  },
  css: {
    modules: {
      localsConvention: "camelCase"
    },
    preprocessorOptions: {
      postcss: {
        plugins: [
          __require("tailwindcss"),
          __require("autoprefixer")
        ]
      }
    }
  }
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IHJlYWN0ID0gcmVxdWlyZSgnQHZpdGVqcy9wbHVnaW4tcmVhY3QnKTtcbmNvbnN0IHsgZGVmaW5lQ29uZmlnIH0gPSByZXF1aXJlKCd2aXRlJyk7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjUwMDAnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGNzczoge1xuICAgIG1vZHVsZXM6IHtcbiAgICAgIGxvY2Fsc0NvbnZlbnRpb246ICdjYW1lbENhc2UnLFxuICAgIH0sXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgcG9zdGNzczoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgcmVxdWlyZSgndGFpbHdpbmRjc3MnKSxcbiAgICAgICAgICByZXF1aXJlKCdhdXRvcHJlZml4ZXInKSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7O0FBQUEsSUFBTSxRQUFRLFVBQVE7QUFDdEIsSUFBTSxFQUFFLGlCQUFpQixVQUFRO0FBR2pDLE9BQU8sVUFBVSxhQUFhO0FBQUEsRUFDNUIsU0FBUyxDQUFDO0FBQUEsRUFDVixRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJcEIsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1Asa0JBQWtCO0FBQUE7QUFBQSxJQUVwQixxQkFBcUI7QUFBQSxNQUNuQixTQUFTO0FBQUEsUUFDUCxTQUFTO0FBQUEsVUFDUCxVQUFRO0FBQUEsVUFDUixVQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K
