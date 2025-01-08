import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd';
import { UserData } from '../../data/user';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useForm } from 'antd/es/form/Form';
import uniqueId from 'lodash.uniqueid';
import { useToggle } from '../../hooks/useToggle';
import { useProjectStore } from '../../store/project';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '../../constants/paths';
import { LoadingOutlined, StarFilled } from '@ant-design/icons';
import { useState } from 'react';

dayjs.extend(customParseFormat);

const { TextArea } = Input;

export const ProjectCreate = () => {
  const { status: isSubmitting, on, off } = useToggle();
  const [form] = useForm();
  const { addProject } = useProjectStore();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const onSubmit = async (values: any) => {
    if (isSubmitting) return;
    try {
      on();
      const val = { ...values };

      const user = UserData.find((item) => item.id === val.manager_id);
      delete val.manager_id;
      const payload = {
        ...val,
        id: uniqueId(),
        start_date: val?.start_date ? dayjs(val.start_date).format('YYYY-MM-DD') : '',
        end_date: val?.end_date ? dayjs(val.end_date).format('YYYY-MM-DD') : '',
        project_manager: user,
        isFavorite,
      };
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      });
      // TODO: implement api
      // await createProject(id, payload);
      addProject(payload);
      navigate(routePaths.projects);
    } catch (_) {
      // TODO: handle errors
    } finally {
      off();
    }
  };

  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" form={form} onFinish={onSubmit}>
      <StarFilled
        style={{
          color: isFavorite ? '#e40098' : '',
          fontSize: 24,
          float: 'right',
        }}
        onClick={() => {
          setIsFavorite((prev) => {
            form.setFieldValue('isFavorite', !prev);
            return !prev;
          });
        }}
      />
      <Form.Item label="Project Name" name="name" required rules={[{ required: true, min: 3, max: 150 }]}>
        <Input required />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="DatePicker" name="start_date">
        <DatePicker />
      </Form.Item>
      <Form.Item label="DatePicker" name="end_date">
        <DatePicker minDate={dayjs(form.getFieldValue('start_date'), 'YYYY-MM-DD')} />
      </Form.Item>
      <Form.Item label="Select" required name="manager_id" rules={[{ required: true }]}>
        <Select>
          {UserData.map((item) => (
            <Select.Option value={item.id} key={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Button htmlType="submit" className="text-white bg-blue" disabled={isSubmitting}>
        Submit {isSubmitting ? <LoadingOutlined /> : null}
      </Button>
    </Form>
  );
};
