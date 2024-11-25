import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";
import "../styles/Select.css";

const { Option } = Select;

interface MakeSelectProps {
  year: number | undefined;
  onMakeChange: (make: string | undefined) => void;
}

const MakeSelect: React.FC<MakeSelectProps> = ({ year, onMakeChange }) => {
  const [makeList, setMakeList] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!year) {
      setMakeList([]);
      setSelectedMake(undefined);
      return;
    }

    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForManufacturerAndYear/mer?year=${year}&format=json`;

    axios
      .get(url)
      .then((response) => {
        const makeNames = [
          ...new Set(
            response.data.Results.map(
              (item: { MakeName: string }) => item.MakeName
            )
          ),
        ] as string[];
        setMakeList(makeNames);
        setSelectedMake(undefined);
      })

      .catch((error) => {
        console.error("Error fetching makes:", error);
        setMakeList([]);
      });
  }, [year]);

  return (
    <Select
      className="select"
      showSearch
      placeholder="2 | Make"
      onSelect={(value) => setSelectedMake(value)}
      value={selectedMake}
      onChange={onMakeChange}
      disabled={!year}
    >
      {makeList.map((item) => (
        <Option key={item} value={item}>
          {item}
        </Option>
      ))}
    </Select>
  );
};

export default MakeSelect;
