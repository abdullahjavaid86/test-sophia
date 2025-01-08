import { TUser } from './user';

export type TProjectStore = {
  isLoading: boolean;
  projects: IProject[];
  updateProject: (project: IProject) => void;
  addProject: (project: IProject) => void;
};

export interface IProject {
  id: number | string;
  name: string;
  start_date?: string;
  end_date?: string;
  project_manager: TUser;
  isFavorite?: boolean;
  description?: string;
}
