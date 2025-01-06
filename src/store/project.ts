import { devtools } from 'zustand/middleware';

import { create } from 'zustand';
import { projects } from '../data/projects';
import type { TProjectStore } from '../types/projects';

export const useProjectStore = create<TProjectStore>()(
  devtools(
    (set, get) => ({
      isLoading: true,
      projects,
      updateProject(project) {
        set((state) => ({
          projects: state.projects.map((item) => {
            if (item.id === project.id) {
              return project;
            }
            return item;
          }),
        }));
      },
      favoriteProjects: () => {
        return get().projects.filter((item) => item.isFavorited);
      },
    }),
    { name: 'projects' },
  ),
);
