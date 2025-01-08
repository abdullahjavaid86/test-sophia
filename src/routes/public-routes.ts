import { TRoute } from '../types/route';
import { routePaths } from '../constants/paths';
import { Projects } from '../pages/projects';
import { ProjectEdit } from '../pages/projects/edit';
import { ProjectCreate } from '../pages/projects/create';

export const publicRoutes: TRoute[] = [
  {
    name: 'Home',
    path: routePaths.home,
    component: Projects,
    exact: true,
  },
  {
    name: 'Projects',
    path: routePaths.projects,
    component: Projects,
    exact: true,
  },
  {
    name: 'Project Create',
    path: routePaths.createProjects,
    component: ProjectCreate,
    exact: true,
  },
  {
    name: 'Project Details',
    path: routePaths.projectsDetails,
    component: ProjectEdit,
    exact: true,
  },
];
