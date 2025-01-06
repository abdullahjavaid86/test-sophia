import { LoadingOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSingleProjects } from '../../services/projects';
import { UserData } from '../../data/user';
import { useProjectStore } from '../../store/project';
import { routePaths } from '../../constants/paths';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { TextArea } = Input;

export const ProjectEdit = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const { updateProject: updateProjectInStore } = useProjectStore();
  const { isLoading, data } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getSingleProjects(id),
  });

  if (isLoading) {
    return <LoadingOutlined />;
  }

  if (!data) {
    return <p>Project not found</p>;
  }

  const onSubmit = async (values: any) => {
    const val = { ...values };

    const user = UserData.find((item) => item.id === val.manager_id);
    delete val.manager_id;
    const payload = {
      ...data,
      ...val,
      start_date: val?.start_date ? dayjs(val.start_date).format('YYYY-MM-DD') : '',
      end_date: val?.end_date ? dayjs(val.end_date).format('YYYY-MM-DD') : '',
      project_manager: user,
    };
    // TODO: implement api
    // await updateProject(id, payload);
    updateProjectInStore(payload);
    navigate(routePaths.projects);
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      // style={{ maxWidth: 600 }{}
      initialValues={{
        id,
        name: data?.name,
        description: data?.description,
        start_date: data?.start_date ? dayjs(data.start_date, 'YYYY-MM-DD') : '',
        end_date: data?.end_date ? dayjs(data.end_date, 'YYYY-MM-DD') : '',
        manager_id: data?.project_manager?.id,
        isFavorite: data?.isFavorite,
      }}
      onFinish={onSubmit}
    >
      <Form.Item label="Project ID">
        <Input disabled value={id} />
      </Form.Item>
      <Form.Item label="Project Name" name="name" required rules={[{ required: true, min: 3 }]}>
        <Input required />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="DatePicker" name="start_date">
        <DatePicker />
      </Form.Item>
      <Form.Item label="DatePicker" name="end_date">
        <DatePicker minDate={dayjs(data?.start_date, 'YYYY-MM-DD')} />
      </Form.Item>
      <Form.Item label="Select" required name="manager_id">
        <Select>
          {UserData.map((item) => (
            <Select.Option value={item.id} key={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="isFavorite" name="isFavorite" valuePropName="checked">
        <Checkbox defaultChecked={data?.isFavorite} />
      </Form.Item>
      <Button htmlType="submit" className="text-white bg-blue">
        Submit
      </Button>
    </Form>
  );
};
