import React, { useState } from "react";
import YearSelect from "./YearSelect";
import MakeSelect from "./MakeSelect";
import ModelSelect from "./ModelSelect";
import TextSetYourVehicle from "./TextSetYourVehicle";
import { Select, Space } from "antd";
import "../styles/App.css";
import "../styles/Select.css";

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    undefined
  );
  const [selectedMake, setSelectedMake] = useState<string | undefined>(
    undefined
  );
  const [selectedModel, setSelectedModel] = useState<string | undefined>(
    undefined
  );

  const handleYearChange = (year: number | undefined): void => {
    setSelectedYear(year);
    setSelectedMake(undefined);
    setSelectedModel(undefined);
  };

  const handleMakeChange = (make: string | undefined): void => {
    setSelectedMake(make);
    setSelectedModel(undefined);
  };

  const handleModelChange = (model: string | undefined): void => {
    setSelectedModel(model);
  };

  return (
    <div className="App">
      <Space size={15}>
        <TextSetYourVehicle />

        <YearSelect onYearChange={handleYearChange} />
        <MakeSelect year={selectedYear} onMakeChange={handleMakeChange} />
        <ModelSelect make={selectedMake} onModelChange={handleModelChange} />
        <Select className="select" placeholder="4 | Engine" disabled />
      </Space>

      {selectedYear && selectedMake && selectedModel && (
        <p style={{ fontSize: "20px" }}>
          You've selected {selectedYear} {selectedMake} {selectedModel}.
        </p>
      )}
    </div>
  );
};

export default App;
