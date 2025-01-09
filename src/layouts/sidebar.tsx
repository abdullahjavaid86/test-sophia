import { ProjectOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '../constants/paths';
import { Project } from '../enums/general';
import { useProjectStore } from '../store/project';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

export const SideBar: FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const navigate = useNavigate();
  const favProjects = useProjectStore().projects.filter((item) => item.isFavorite);

  const onMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key) {
      navigate(routePaths.projectsDetails.replace(':id', e.key));
    }
  };

  const menu: MenuItem[] = useMemo(
    () => [
      {
        key: routePaths.projects,
        icon: <ProjectOutlined />,
        title: 'Favorite Projects',
        onClick: onMenuClick,
        label: 'Favorite Projects',
        children: favProjects.map(({ id, name }) => ({
          key: id,
          label: name,
          title: Project.ProjectDetails,
        })),
      },
    ],
    [favProjects],
  );
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
      <div className="p-5 text-lg text-center text-dark">LOGO</div>
      <Menu theme="light" mode="inline" defaultSelectedKeys={[routePaths.projects]} items={menu} openKeys={[routePaths.projects]}/>
    </Sider>
  );
};
