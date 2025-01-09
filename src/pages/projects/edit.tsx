import { ArrowLeftOutlined, LoadingOutlined, SaveOutlined, StarFilled } from '@ant-design/icons';
import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserData } from '../../data/user';
import { useProjectStore } from '../../store/project';
import { routePaths } from '../../constants/paths';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useGetSingleProjectQuery } from '../../hooks/queries/useGetSingleProjectQuery';
import { StyledAntDButton } from '../../components/styled/styled-button';

dayjs.extend(customParseFormat);

const { TextArea } = Input;

export const ProjectEdit = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const { updateProject: updateProjectInStore } = useProjectStore();
  const { isLoading, data } = useGetSingleProjectQuery();
  const [isFavorite, setIsFavorite] = useState(data?.isFavorite);

  const [form] = useForm();

  useEffect(() => {
    if (!isLoading && data) {
      form.setFieldsValue({
        id,
        name: data?.name,
        description: data?.description,
        start_date: data?.start_date ? dayjs(data.start_date, 'YYYY-MM-DD') : '',
        end_date: data?.end_date ? dayjs(data.end_date, 'YYYY-MM-DD') : '',
        manager_id: data?.project_manager?.id,
        isFavorite: data?.isFavorite,
      });
      setIsFavorite(data?.isFavorite);
    }
  }, [id, isLoading, data]);

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
      isFavorite,
    };
    // TODO: implement api
    // await updateProject(id, payload);
    updateProjectInStore(payload);
    navigate(routePaths.projectsDetails.replace(':id', id));
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      form={form}
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
      <Row className="mt-14">
        <Col span={2} offset={2}>
          <Link to={routePaths.projects}>
            <StyledAntDButton htmlType="button" icon={<ArrowLeftOutlined />}>
              Cancel
            </StyledAntDButton>
          </Link>
        </Col>
        <Col span={2}>
          <StyledAntDButton htmlType="submit" icon={<SaveOutlined />}>
            Submit
          </StyledAntDButton>
        </Col>
      </Row>
    </Form>
  );
};
