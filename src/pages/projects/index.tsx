import { Col, Row, Table } from 'antd';
import uniqueId from 'lodash.uniqueid';
import { IProject } from '../../types/projects';
import { ColumnsType } from 'antd/es/table';
import { Link, useNavigate } from 'react-router-dom';
import { routePaths } from '../../constants/paths';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '../../services/projects';
import { useProjectStore } from '../../store/project';
import { StyledAntDButton } from '../../components/styled/styled-button';
import styled from 'styled-components';
import { EditOutlined, StarFilled } from '@ant-design/icons';

const StyledAction = styled.div({
  display: 'flex',
  gap: 10,
});

export const Projects = () => {
  const { isLoading } = useQuery({ queryKey: ['projects', 'list'], queryFn: getAllProjects });
  const { projects } = useProjectStore();
  const navigate = useNavigate();

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
        <StyledAction>
          <StarFilled
            style={{
              fontSize: 24,
              color: record.isFavorite ? '#e40098' : '',
            }}
            onClick={(e) => {
              e.stopPropagation();
              useProjectStore.getState().updateProject({ id: record.id, isFavorite: !record.isFavorite });
            }}
          />
          <Link
            onClick={(e) => {
              e.stopPropagation();
            }}
            to={routePaths.projectsEdit.replace(':id', record.id as string)}
            className="p-2 text-white bg-blue rounded-md px-4"
          >
            <EditOutlined className="mr-1" /> Edit
          </Link>
        </StyledAction>
      ),
    },
  ];

  return (
    <Row>
      <Col
        span={2}
        offset={22}
        style={{
          marginBottom: 16,
        }}
      >
        <Link to={routePaths.createProjects}>
          <StyledAntDButton type="default">Create Project</StyledAntDButton>
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
          onRow={(record) => {
            return {
              onClick: () => {
                navigate(routePaths.projectsDetails.replace(':id', record.id.toString()));
              },
            };
          }}
        />
      </Col>
    </Row>
  );
};
