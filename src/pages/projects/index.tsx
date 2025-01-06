import { Table } from 'antd';
import { useProjectStore } from '../../store/project';
import uniqueId from 'lodash.uniqueid';
import { IProject } from '../../types/projects';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { routePaths } from '../../constants/paths';

const columns: ColumnsType<IProject> = [
  {
    title: 'Project ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Project Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Start Date',
    dataIndex: 'start_date',
    key: uniqueId(),
  },
  {
    title: 'End Date',
    dataIndex: 'end_data',
    key: uniqueId(),
  },
  {
    title: 'Project Manager',
    dataIndex: 'project_manager.name',
    key: uniqueId(),
    render: (_, record) => record.project_manager?.name,
  },
  {
    title: 'Actions',
    key: uniqueId(),
    render: (_, record) => (
      <Link to={routePaths.projectsDetails.replace(':id', record.id as string)} className="bg-blue text-white p-2">
        Edit
      </Link>
    ),
  },
];

export const Projects = () => {
  const { projects } = useProjectStore();

  return <Table dataSource={projects} columns={columns} />;
};
