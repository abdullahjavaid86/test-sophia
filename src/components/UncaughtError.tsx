import React from 'react';
import { Button, Result } from 'antd';
import { routePaths } from '../constants/paths';

export const UncaughtError: React.FC = () => (
  <Result
    status="warning"
    title="There are some problems with your operation."
    subTitle="Please try again or try refreshing the page"
    extra={
      <Button type="primary" key="console" href={routePaths.projects}>
        Goto Projects
      </Button>
    }
  />
);