import { Button, Col, Row, Table } from 'antd';
import uniqueId from 'lodash.uniqueid';
import { IProject } from '../../types/projects';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { routePaths } from '../../constants/paths';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '../../services/projects';
import { useProjectStore } from '../../store/project';
import { StyledAntDButton } from '../../components/styled/StyledButton';

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
    dataIndex: 'end_date',
    key: uniqueId(),
  },
  {
    title: 'Project Manager',
    dataIndex: 'project_manager.name',
    key: uniqueId(),
    render: (_, record) => record.project_manager?.name,
  },
  {
    title: '',
    key: uniqueId(),
    render: (_, record) => (
      <Link to={routePaths.projectsDetails.replace(':id', record.id as string)} className="p-2 text-white bg-blue">
        Edit
      </Link>
    ),
  },
];

export const Projects = () => {
  const { isLoading } = useQuery({ queryKey: ['projects', 'list'], queryFn: getAllProjects });
  const { projects } = useProjectStore();

  return (
    <Row>
      <Col span={2} offset={22} style={{
        marginBottom: 16
      }}>
        <Link to={routePaths.createProjects}>
          <StyledAntDButton type="default">Create</StyledAntDButton>
        </Link>
      </Col>
      <Col span={24}>
        <Table
          dataSource={projects}
          columns={columns}
          loading={isLoading}
          rowKey={'id'}
          style={{
            overflow: 'auto',
          }}
        />
      </Col>
    </Row>
  );
};
