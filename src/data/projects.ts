import uniqueId from 'lodash.uniqueid';
import { IProjects } from '../types/projects';

export const projects: IProjects[] = [
  {
    id: uniqueId(),
    name: 'Project 1',
    start_date: '2022-01-01',
    end_date: '2022-12-31',
    isFavorited: true,
    project_manager: {
      id: 123,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  },
  {
    id: uniqueId(),
    name: 'Project 2',
    start_date: '2022-01-01',
    end_date: '2022-12-31',
    project_manager: {
      id: uniqueId(),
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  },
  {
    id: uniqueId(),
    name: 'Project 3',
    start_date: '2022-01-01',
    end_date: '2022-12-31',
    project_manager: {
      id: 123,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  },
  {
    id: uniqueId(),
    name: 'Project 4',
    start_date: '2022-01-01',
    end_date: '2022-12-31',
    isFavorited: true,
    project_manager: {
      id: 123,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  },
];
