import { projects } from '../data/projects';
import { useProjectStore } from '../store/project';
import { IProject } from '../types/projects';
import { api } from './api';

/**
 * !! try catch are just for mock responses, otherwise we don't need them
 *
 */

export const getAllProjects = async (): Promise<IProject[]> => {
  try {
    await api.get('/projects');
    // TODO: replace with res.data from api
    return projects; // mock response
  } catch (_err) {
    return projects;
  }
};

export const getSingleProjects = async (id: string): Promise<IProject> => {
  try {
    await api.get(`/projects/${id}`);
    // TODO: replace with res.data from api
    return useProjectStore.getState().projects.find((project) => project.id === id)!; // mock response
  } catch (_) {
    return useProjectStore.getState().projects.find((project) => project.id === id)!;
  }
};

export const updateProject = async (id: string, data: IProject): Promise<IProject> => {
  try {
    await api.put(`/projects/${id}`, data);
    // TODO: replace with res.data from api
    return useProjectStore.getState().projects.find((project) => project.id === id)!; // mock response
  } catch (_err) {
    return useProjectStore.getState().projects.find((project) => project.id === id)!;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    const res = await api.delete(`/projects/${id}`);
    return res.data; // mock response
  } catch (_err) {
    return true;
  }
};

export const markAsFavorite = async (id: string): Promise<IProject> => {
  try {
    await api.patch(`/projects/mark-as-favorite/${id}`);
    // TODO: replace with res.data from api
    return useProjectStore.getState().projects.find((p) => p.id === id)!;
  } catch (_err) {
    return useProjectStore.getState().projects.find((p) => p.id === id)!;
  }
};
