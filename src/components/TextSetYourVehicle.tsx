import React from "react";
import { Space, Typography } from "antd";

const { Text } = Typography;

const TextSetYourVehicle: React.FC = () => (
  <>
    <Space.Compact direction="vertical" size="small">
      <Text style={{ fontWeight: "bold" }}>SET YOUR VEHICLE</Text>
      <Text>Get an exact fit for</Text>
      <Text>your vehicle.</Text>
    </Space.Compact>
  </>
);

export default TextSetYourVehicle;
