import { ExceptionOutlined } from '@ant-design/icons';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { StyledAntDButton } from '../styled/styled-button';
import { routePaths } from '../../constants/paths';

export const ProjectNotFoundError = () => {
  return (
    <Result
      title="Project not found"
      icon={<ExceptionOutlined />}
      extra={
        <Link to={routePaths.projects}>
          <StyledAntDButton>Goto Projects</StyledAntDButton>
        </Link>
      }
    />
  );
};
