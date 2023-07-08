import {
  database,
  database_id,
  exercise_Collection,
  id,
  workout_Collection,
} from "@/appwrite/appwriteConfig";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Typography,
} from "antd";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";

interface props {
  name: string;
  workoutId: string;
}

const Workout = async (props: props) => {
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
    const exerciseData = {
      name: values.name,
      sets: values.sets,
      reps: values.reps,
      workoutId: props.workoutId,
    };

    const createExercise = await database.createDocument(
      database_id,
      exercise_Collection,
      id,
      exerciseData
    );
    const getWorkout = await database.getDocument(
      database_id,
      workout_Collection,
      props.workoutId
    );
    const addExercise = await database.updateDocument(
      database_id,
      workout_Collection,
      props.workoutId,
      {
        exercises: [...getWorkout.exercises, createExercise.$id],
      }
    );
  };
  return (
    <div>
      <Typography.Text className="text-color2 text-4xl">
        {props.name}
      </Typography.Text>

      <div className="">
        <Button
          className="bg-color2 text-color3"
          icon={<GrAdd />}
          onClick={showModal}
        >
          Add Exercise
        </Button>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="createExercise"
          scrollToFirstError
          className="mt-4"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input exercise name!",
              },
            ]}
          >
            <Input
              placeholder="Exercise Name"
              className="h-12 rounded-xl border-2 border-color2 border-solid "
            />
          </Form.Item>

          <Form.Item
            name="sets"
            rules={[
              {
                required: true,
                message: "Please input number of sets",
              },
            ]}
          >
            <InputNumber
              placeholder="sets"
              className=" h-12 rounded-xl border-2 border-color2 border-solid w-full"
            />
          </Form.Item>
          <Form.Item
            name="reps"
            rules={[
              {
                required: true,
                message: "Please input number of reps",
              },
            ]}
          >
            <InputNumber
              placeholder="reps"
              className=" h-12 rounded-xl border-2 border-color2 border-solid w-full"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            <Button
              shape="round"
              size="large"
              className="bg-color2"
              htmlType="submit"
            >
              Create Exercise
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Workout;
