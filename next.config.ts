import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Enable image domains for placeholder images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  
  // Transpile @react-three packages
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
  ],
  
  // Enable webpack 5 features
  webpack: (config) => {
    // Add support for importing GLSL files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });
    
    return config;
  },
};

export default nextConfig;
