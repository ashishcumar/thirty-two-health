import { Form, FormInstance, Input } from "antd";
import { ICard } from "./UserCard";

interface IProps {
  form: FormInstance<any> | undefined;
  cardData: ICard;
}

function UserModalForm(props: IProps) {
  const { form, cardData } = props;

  return (
    <Form
      form={form}
      layout="horizontal"
      style={{ width: "90%", margin: "24px auto" }}
      initialValues={cardData}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item label="User Id" name="id" required>
        <Input placeholder="user id" readOnly />
      </Form.Item>
      <Form.Item label="Name" name="name" required>
        <Input placeholder="Enter your username" />
      </Form.Item>
      <Form.Item label="Email" name="email" required>
        <Input placeholder="Enter your email" />
      </Form.Item>
      <Form.Item label="Phone" name="phone" required>
        <Input placeholder="Enter your phone number" />
      </Form.Item>
      <Form.Item label="Website" name="website" required>
        <Input placeholder="Enter your website" />
      </Form.Item>
    </Form>
  );
}

export default UserModalForm;
