"use client";

import { useState, useEffect } from "react";
import { useProjectStore } from "@/store/projectStore";

const ProjectFilters = ({ translations }: { translations: any }) => {
  const [mounted, setMounted] = useState(false);
  const { selectedCategory, setCategory } = useProjectStore();

  useEffect(() => {
    setMounted(true);
    
    // Filter projects based on selected category when component mounts
    filterProjects(selectedCategory);
  }, [selectedCategory]);

  const filterProjects = (category: string) => {
    if (!mounted) return;
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card) => {
      const cardElement = card as HTMLElement;
      if (category === 'all' || cardElement.dataset.category === category) {
        cardElement.style.display = 'block';
      } else {
        cardElement.style.display = 'none';
      }
    });
  };

  if (!mounted) {
    return null; // Avoid rendering on the server to prevent hydration issues
  }

  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-white dark:bg-gray-800 rounded-lg shadow p-1">
        <button
          onClick={() => setCategory('all')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {translations.projects.filter.all}
        </button>
        <button
          onClick={() => setCategory('web')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            selectedCategory === 'web'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {translations.projects.filter.web}
        </button>
        <button
          onClick={() => setCategory('mobile')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            selectedCategory === 'mobile'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {translations.projects.filter.mobile}
        </button>
        <button
          onClick={() => setCategory('design')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            selectedCategory === 'design'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {translations.projects.filter.design}
        </button>
      </div>
    </div>
  );
};

export default ProjectFilters; 