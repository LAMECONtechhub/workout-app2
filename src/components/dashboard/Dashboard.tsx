import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SelectUser } from "@/contexts/user.slice";
import { Typography } from "antd";

const Dashboard = () => {
  return (
    <div>
      <Typography.Text className="text-center text-color2 text-4xl">
        Dashboard
      </Typography.Text>
    </div>
  );
};
export default Dashboard;
