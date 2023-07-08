import React, { useState } from "react";
import {
  Typography,
  Descriptions,
  Button,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import { GrAdd } from "react-icons/gr";
import Workout from "./Workout";
import {
  database_id,
  database,
  workout_Collection,
  id,
} from "@/appwrite/appwriteConfig";
import { useSelector } from "react-redux";
import { SelectUser } from "@/contexts/user.slice";

const Workouts = () => {
  const { currentUser } = useSelector(SelectUser);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values: any) => {
    const newWorkout = await database.createDocument(
      database_id,
      workout_Collection,
      id,
      {
        name: values.name,
        day: values.day,
        userId: currentUser?.userId as unknown as string,
      }
    );
    handleCancel();
  };
  return (
    <div className="mt-6">
      <Typography.Text className="text-center text-color2 text-4xl">
        Workouts
      </Typography.Text>

      <div className="flex items-center justify-center mt-3">
        <Button
          className="bg-color2 text-color3"
          icon={<GrAdd />}
          onClick={showModal}
        >
          Create Workout
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            name="createWorkout"
            scrollToFirstError
            className="mt-4"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input workout name!",
                },
              ]}
            >
              <Input
                placeholder="Workout Name"
                className="h-12 rounded-xl border-2 border-color2 border-solid "
              />
            </Form.Item>

            <Form.Item
              name="day"
              rules={[
                {
                  required: true,
                  message: "Please input workout day!",
                },
              ]}
            >
              <Select
                placeholder="Workout Day"
                className="h-12 rounded-xl border-2 border-color2 border-solid "
                options={[
                  { value: "mon", label: "Monday" },
                  { value: "tue", label: "Tuesday" },
                  { value: "wed", label: "Wednesday" },
                  { value: "thur", label: "Thurday" },
                  { value: "fri", label: "Friday" },
                  { value: "sat", label: "Saturday" },
                  { value: "sun", label: "Sunday" },
                ]}
              />
            </Form.Item>
            <Form.Item shouldUpdate>
              <Button
                shape="round"
                size="large"
                className="bg-color2"
                htmlType="submit"
              >
                Create Workout
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
export default Workouts;
