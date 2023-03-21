import React from 'react';

/* UI Library Components */
import { DatePicker } from 'antd';

/* Utilities */
import moment from 'moment';

/* UI Library Sub-components */
const { RangePicker } = DatePicker;

const YearsRangeFilter = ({ filters, setYears }) => {
  const onChange = (moment, years) => {
    setYears({ start_year: years[0], end_year: years[1] });
  };

  function disabledDate(current) {
    return (
      current < moment(filters.start_year, 'YYYY') ||
      current > moment(filters.end_year, 'YYYY')
    );
  }

  return (
    <>
      <RangePicker
        picker="year"
        showTime
        allowClear={true}
        allowEmpty
        format="YYYY"
        size="large"
        placeholder={['Desde', 'Hasta']}
        onChange={onChange}
        disabledDate={disabledDate}
      />
    </>
  );
};

export default YearsRangeFilter;
