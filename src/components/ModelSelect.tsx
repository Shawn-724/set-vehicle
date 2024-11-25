import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";
import "../styles/Select.css";

const { Option } = Select;

interface ModelSelectProps {
  make: string | undefined;
  onModelChange: (model: string | undefined) => void;
}

const ModelSelect: React.FC<ModelSelectProps> = ({ make, onModelChange }) => {
  const [modelList, setmodelList] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!make) {
      setmodelList([]);
      setSelectedModel(undefined);
      return;
    }

    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`;

    axios
      .get(url)
      .then((response) => {
        const modelNames = [
          ...new Set(
            response.data.Results.map(
              (item: { Model_Name: string }) => item.Model_Name
            )
          ),
        ] as string[];
        setmodelList(modelNames);
        setSelectedModel(undefined);
      })
      .catch((error) => {
        console.error("Error fetching models:", error);
        setmodelList([]);
      });
  }, [make]);

  return (
    <Select
      className="select"
      showSearch
      placeholder="3 | Model"
      onSelect={(value) => setSelectedModel(value)}
      value={selectedModel}
      onChange={onModelChange}
      disabled={!make}
    >
      {modelList.map((item) => (
        <Option key={item} value={item}>
          {item}
        </Option>
      ))}
    </Select>
  );
};

export default ModelSelect;
