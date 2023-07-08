import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SelectUser } from "@/contexts/user.slice";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Typography,
} from "antd";
import { MdModeEdit } from "react-icons/md";
import { database, id, pr_collection } from "@/appwrite/appwriteConfig";
import { database_id, user_collection } from "@/appwrite/appwriteConfig";
import { Query } from "appwrite";
import { SelectPrs } from "@/contexts/personal-records.slice";
import { GrAdd } from "react-icons/gr";
import { data } from "autoprefixer";
import { current } from "@reduxjs/toolkit";
const profile = () => {
  const { currentUser } = useSelector(SelectUser);
  const personalRecords = useSelector(SelectPrs);
  const editWeight = async () => {
    const userInfo = await database.listDocuments(
      database_id,
      user_collection,
      [Query.equal("userId", currentUser?.userId as unknown as string)]
    );
    const userDocument = userInfo.documents[0];
    const weight = prompt("What is your weight in kg?");
    const updatatedWeight = await database.updateDocument(
      database_id,
      user_collection,
      userDocument.$id,
      {
        weight: weight,
      }
    );
  };
  const editHeight = async () => {
    const userInfo = await database.listDocuments(
      database_id,
      user_collection,
      [Query.equal("userId", currentUser?.userId as unknown as string)]
    );
    const userDocument = userInfo.documents[0];
    const height = prompt("What is your height in cm?");
    const updatatedHeight = await database.updateDocument(
      database_id,
      user_collection,
      userDocument.$id,
      {
        height: height,
      }
    );
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
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
    const createPr = await database.createDocument(
      database_id,
      pr_collection,
      id,
      {
        userId: currentUser?.userId,
        reps: values.reps,
        weight: values.weight,
        exercise: values.exercise,
      }
    );
  };
  console.log(personalRecords);
  return (
    <div className="text-center">
      <div className="flex flex-col">
        <Typography.Text className="text-center text-color2 text-4xl">
          Hello, {currentUser?.name}!
        </Typography.Text>
        {/* <Typography.Text className="text-center text-color2 text-xl">
          Harness Your Energy, Ignite Your Passion, and Embrace the Journey to a
          Stronger You.
        </Typography.Text> */}
      </div>
      <div className="flex items-center justify-center mt-6">
        <div className="grid grid-cols-2 gap-10">
          <div className="p-3 rounded-xl bg-color2 opacity-100 transition duration-300 ease-in-out hover:opacity-40 cursor-pointer">
            <div className="flex items-center gap-4">
              <Typography.Text className="text-color3 text-xl">
                Weight
              </Typography.Text>
              <MdModeEdit
                className="text-color3"
                size={25}
                onClick={editWeight}
              />
            </div>
            <Typography.Text className="text-color3 text-xl">
              {currentUser?.weight} kg
            </Typography.Text>
          </div>
          <div className="p-3 rounded-xl bg-color2 opacity-100 transition duration-300 ease-in-out hover:opacity-40 cursor-pointer">
            <div className="flex items-center gap-4">
              <Typography.Text className="text-color3 text-xl">
                Height
              </Typography.Text>
              <MdModeEdit
                className="text-color3"
                size={25}
                onClick={editHeight}
              />
            </div>
            <Typography.Text className="text-color3 text-xl">
              {currentUser?.height} cm
            </Typography.Text>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Typography.Text className="text-center text-color2 text-4xl">
          Personal Records
        </Typography.Text>

        <div className="flex items-center justify-center mt-6">
          <div className="grid grid-cols-2 gap-10">
            {personalRecords?.personalRecords.map((record) => (
              <div className="p-3 rounded-xl bg-color2 opacity-100 transition duration-300 ease-in-out hover:opacity-40 cursor-pointer">
                <Typography.Text className="text-color3 text-xl">
                  {record.exercise}
                </Typography.Text>
                <Typography.Text className="text-color3 text-xl">
                  {record.reps ? record.reps : `${record.weight} kg`}
                </Typography.Text>
              </div>
            ))}
            <div
              className="p-3 text-center w-24 rounded-xl bg-color2 opacity-100 transition duration-300 ease-in-out hover:opacity-40 cursor-pointer"
              onClick={showModal}
            >
              <Typography.Text className="text-color3 text-xl">
                Add
              </Typography.Text>
              <div className="rounded-full p-1 bg-color3">
                <GrAdd className="text-color2" />
              </div>
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
                    name="exercise"
                    rules={[
                      {
                        required: true,
                        message: "Please input exercise!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Exercise"
                      className="h-12 rounded-xl border-2 border-color2 border-solid "
                    />
                  </Form.Item>

                  <Form.Item
                    name="reps"
                    rules={[
                      {
                        message: "Please input reps !",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="reps"
                      className=" h-12 rounded-xl border-2 border-color2 border-solid w-full"
                    />
                  </Form.Item>
                  <Form.Item
                    name="weight"
                    rules={[
                      {
                        message:
                          "Please input amount of weight if the record is in weights !",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Weight"
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
                      Create Pr
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default profile;
