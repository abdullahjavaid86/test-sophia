import { Home } from '../pages/home';
import { TRoute } from '../types/route';
import { routePaths } from '../constants/paths';

export const publicRoutes: TRoute[] = [
  {
    name: 'Home',
    path: routePaths.Home,
    component: Home,
    exact: true,
  },
];
