import { Col, Row } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useGetSingleProjectQuery } from '../../hooks/queries/useGetSingleProjectQuery';
import { Loader } from '../../components/shared/loader';
import { ProjectNotFoundError } from '../../components/projects/not-found';
import { routePaths } from '../../constants/paths';
import { StyledAntDButton } from '../../components/styled/styled-button';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';

export const ProjectDetails = () => {
  const {} = useParams() as { id: string };

  const { isLoading, data } = useGetSingleProjectQuery();

  if (!isLoading) {
    <Loader />;
  }

  if (!data) {
    return <ProjectNotFoundError />;
  }

  return (
    <div className="px-3 py-12 flex flex-col gap-8">
      <Row>
        <Col span={6} offset={2}>
          Project ID
        </Col>
        <Col span={6}>{data.id}</Col>
      </Row>
      <Row>
        <Col span={6} offset={2}>
          Project Name
        </Col>
        <Col span={6}>{data.name}</Col>
      </Row>
      <Row>
        <Col span={6} offset={2}>
          Project Description
        </Col>
        <Col span={6} className="max-h-52 overflow-auto">
          {data.description}
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={2}>
          Start Date
        </Col>
        <Col span={6}>{data?.start_date ?? 'N/A'}</Col>
      </Row>
      <Row>
        <Col span={6} offset={2}>
          End Date
        </Col>
        <Col span={6}>{data?.end_date ?? 'N/A'}</Col>
      </Row>
      <Row>
        <Col span={6} offset={2}>
          Project Manager
        </Col>
        <Col span={6}>{data.project_manager.name}</Col>
      </Row>
      <Row className="mt-14">
        <Col span={2} offset={2}>
          <Link to={routePaths.projects}>
            <StyledAntDButton icon={<ArrowLeftOutlined />}>Back</StyledAntDButton>
          </Link>
        </Col>
        <Col span={2}>
          <Link to={routePaths.projectsEdit.replace(':id', data.id.toString())}>
            <StyledAntDButton icon={<EditOutlined />}>Edit</StyledAntDButton>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
