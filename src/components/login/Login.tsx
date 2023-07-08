import * as React from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import { MdEmail } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";

import {
  account,
  id,
  database,
  database_id,
  user_collection,
} from "@/appwrite/appwriteConfig";

const Login = () => {
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = React.useState<boolean>(true);
  const onFinish = async (values: any) => {
    if (isLogin) {
      const { email, password } = values;
      const loginAccount = await account.createEmailSession(email, password);
      console.log(loginAccount);
    } else {
      const { name, email, password, age, strengthTraining } = values;

      const createAccount = await account.create(id, email, password, name);
      const userId = createAccount.$id;
      const data = {
        userId: userId,
        name: name,
        age: age,
        email: email,
        strengthTraining: strengthTraining,
      };

      const createInfo = await database.createDocument(
        database_id,
        user_collection,
        id,
        {
          name: name,
          age: age,
          email: email,
          strengthTraining: strengthTraining,
          userId: userId,
        }
      );
      console.log(createInfo);
    }
    // const options = [
    //   { label: "Football", value: "Football" },
    //   { label: "BasketBall", value: "BasketBall" },
    //   { label: "Hand Ball", value: "Hand Ball" },
    // ];
  };
  return (
    <div>
      <Row>
        <Col
          className="text-center"
          xs={{ span: 16, offset: 4 }}
          md={{ span: 8, offset: 8 }}
        >
          <Typography.Text className="text-color2 text-5xl font-semibold mb-3">
            {isLogin ? "Login" : "Sign Up"}
          </Typography.Text>
          <Form
            form={form}
            name="signUp"
            scrollToFirstError
            className="mt-4"
            onFinish={onFinish}
          >
            {!isLogin && (
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input
                  placeholder="Name"
                  prefix={<FaUserAlt />}
                  className="h-12 rounded-xl border-2 border-color2 border-solid "
                />
              </Form.Item>
            )}
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                placeholder="E-mail"
                prefix={<MdEmail />}
                className="h-12 rounded-xl border-2 border-color2 border-solid "
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Password"
                prefix={<GiPadlock />}
                className=" h-12 rounded-xl border-2 border-color2 border-solid "
              />
            </Form.Item>
            {!isLogin && (
              <>
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm Password"
                    prefix={<GiPadlock />}
                    className=" h-12 rounded-xl border-2 border-color2 border-solid "
                  />
                </Form.Item>
                <Form.Item
                  name="age"
                  rules={[
                    {
                      required: true,
                      message: "Please input your age",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Age"
                    className=" h-12 rounded-xl border-2 border-color2 border-solid w-full"
                  />
                </Form.Item>
                <Form.Item
                  name="strengthTraining"
                  rules={[
                    {
                      required: true,
                      message: "Please input your prefered strength training",
                    },
                  ]}
                >
                  <Select
                    className="  rounded-xl border-2 border-color2 border-solid "
                    options={[
                      { value: "calisthenics", label: "Calisthenics" },
                      { value: "bodybuilding", label: "Body Building" },
                      { value: "weightloss", label: "Weight Loss" },
                      { value: "dietPlanning", label: "Diet Plannig" },
                      { value: "weightgain", label: "Weight Gain" },
                    ]}
                    placeholder="Strength Training"
                  />
                </Form.Item>
                {/* <Form.Item name="sports">
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="select one country"
                    optionLabelProp="label"
                    options={options}
                  ></Select>
                </Form.Item> */}
              </>
            )}
            <Form.Item shouldUpdate>
              <Button
                shape="round"
                size="large"
                className="bg-color2"
                htmlType="submit"
              >
                {isLogin ? "Log In" : "Sign Up"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col
          className="text-center mt-6"
          xs={{ span: 16, offset: 4 }}
          md={{ span: 8, offset: 8 }}
        >
          {!isLogin && (
            <p className="text-color2">
              Already have an account?
              <a onClick={(_) => setIsLogin(true)}> Log in</a>
            </p>
          )}
          {isLogin && (
            <p className="text-color2">
              Click here to create to signUp?
              <a onClick={(_) => setIsLogin(false)}> Sign up</a>
            </p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Login;
