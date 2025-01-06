import uniqueId from 'lodash.uniqueid';
import { IProject } from '../types/projects';
import { UserData } from './user';

export const projects: IProject[] = [
  {
    id: uniqueId(),
    name: 'Project 1',
    start_date: '2022-01-01',
    end_date: '2022-12-31',
    isFavorite: true,
    project_manager: UserData[Math.floor(Math.random() * UserData.length)],
  },
  {
    id: uniqueId(),
    name: 'Project 2',
    start_date: '2022-01-01',
    end_date: '2022-12-31',
    project_manager: UserData[Math.floor(Math.random() * UserData.length)],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis, mauris eget laoreet commodo, felis neque commodo turpis, in tempor nunc felis nec felis. Aliquam erat volutpat. Sed at enim at velit tincidunt tempor. Duis non urna eu nunc scelerisque congue. Nulla facilisi. Nulla facilisi.',
  },
  {
    id: uniqueId(),
    name: 'Project 3',
    start_date: '2022-01-01',
    end_date: '2022-12-31',
    project_manager: UserData[Math.floor(Math.random() * UserData.length)],
  },
  {
    id: uniqueId(),
    name: 'Project 4',
    start_date: '2022-01-01',
    end_date: '2022-12-31',
    isFavorite: true,
    project_manager: UserData[Math.floor(Math.random() * UserData.length)],
  },
];
