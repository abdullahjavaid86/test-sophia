import { Button, Layout, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { FC } from 'react';

const { Header: Head } = Layout;

export const Header: FC<{ status: boolean; toggle: () => void }> = ({ status, toggle }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Head style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={status ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggle}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </Head>
  );
};
