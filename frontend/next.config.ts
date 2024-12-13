/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false 
    };
    
    config.externals = [...(config.externals || []), 'plotly.js-dist'];
    
    return config;
  },
  // Ensure client-side only rendering for Plotly
  transpilePackages: ['react-plotly.js'],
};

export default nextConfig;