"use client";

import { useState } from "react";
import ParallaxHero from "@/components/ParallaxHero";
import AnimatedServiceCard from "@/components/AnimatedServiceCard";
import Simple3DScene from "@/components/Simple3DScene";
import AnalyticsLink from "@/components/AnalyticsLink";
import { FiCode } from "react-icons/fi";

export default function TestPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Component Test Page</h1>
      
      <div className="space-y-8">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">AnimatedServiceCard Test</h2>
          <AnimatedServiceCard
            icon={<FiCode className="w-full h-full" />}
            title="Web Development"
            description="Custom web applications built with modern technologies."
            delay={0.1}
          />
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">AnalyticsLink Test</h2>
          <AnalyticsLink
            href="/test/success"
            eventParams={{
              section: "test_page",
              action: "test_link_click"
            }}
          >
            Test Analytics Link
          </AnalyticsLink>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Simple3DScene Test</h2>
          <Simple3DScene />
        </div>
        
        <button 
          onClick={() => setIsLoaded(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Load ParallaxHero
        </button>
        
        {isLoaded && (
          <div className="p-4 border rounded">
            <h2 className="text-xl font-semibold mb-2">ParallaxHero Test</h2>
            <ParallaxHero
              title="Test Hero Title"
              subtitle="This is a test subtitle for the hero component"
              ctaText="Learn More"
              ctaLink="/test/success"
            />
          </div>
        )}
      </div>
    </div>
  );
} 