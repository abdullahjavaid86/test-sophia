import React, { ReactElement } from 'react';
import { Layout, theme } from 'antd';
import { Header } from './header';
import { useToggle } from '../hooks/useToggle';
import { SideBar } from './sidebar';
import styled from 'styled-components';

const { Content } = Layout;

const FullHeightLayout = styled(Layout)({
  height: '100vh',
});

const LayoutWithContentAndSideBar: React.FC<{ children: ReactElement }> = ({ children }) => {
  const { toggle, status } = useToggle();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <FullHeightLayout>
      <SideBar collapsed={status} />
      <Layout>
        <Header toggle={toggle} status={status} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </FullHeightLayout>
  );
};

export default LayoutWithContentAndSideBar;
