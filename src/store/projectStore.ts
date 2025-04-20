import { create } from 'zustand';

type ProjectCategory = 'all' | 'web' | 'mobile' | 'design';

interface ProjectState {
  selectedCategory: ProjectCategory;
  setCategory: (category: ProjectCategory) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  selectedCategory: 'all',
  setCategory: (category) => set({ selectedCategory: category }),
})); 