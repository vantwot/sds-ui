import React from "react";

/* UI Library Components */
import { Select } from "antd";

/* UI Library Sub-components */
const { Option } = Select;

const SortProduction = ({ tools }) => {
  const handleChange = (value) => {
    tools.setSort(value);
  };

  return (
    <Select
      size="small"
      style={{ width: 125, marginLeft: "20px" }}
      defaultValue={tools.sort}
      onChange={handleChange}
    >
      <Option value="citations">Más citado</Option>
      <Option value="year">Más reciente</Option>
    </Select>
  );
};

export default SortProduction;
