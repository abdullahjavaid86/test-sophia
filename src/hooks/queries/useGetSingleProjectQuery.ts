import { useQuery } from '@tanstack/react-query';
import { getSingleProjects } from '../../services/projects';
import { useParams } from 'react-router-dom';

/**
 * 
 * @param {string} projectId 
 * @description if projectId is not specified then id will be fetched from params, preference is projectId over id
 * @returns 
 */
export const useGetSingleProjectQuery = (projectId?: string) => {
  const { id } = useParams() as { id: string };

  const idToUse = projectId || id;

  return useQuery({
    queryKey: ['project', idToUse],
    queryFn: () => getSingleProjects(idToUse),
  });
};
