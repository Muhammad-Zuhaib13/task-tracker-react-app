import React, { useEffect, useState } from "react";
import { Col, Row, Radio } from "antd";
import "./style.css";
import { useDispatch } from "react-redux";
import { searchRadioValue } from "../../feastures/userDetailSlice";
const RadioBar = () => {
  const [radioValue, setRadioValue] = useState("All");
  const handleValue = (e) => {
    const { value } = e.target;
    setRadioValue(value);
    dispatch(searchRadioValue(value));
  };
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(searchRadioValue(radioValue));
  // }, [radioValue]);
  const styleRadio = {
    color: "#D8D8D8",
    fontSize: "16px",
  };
  return (
    <Col
      style={{
        backgroundColor: "var(--gray-dark-bg)",
        transition: "all 0.4s ease-in-out",
      }}
      className="wipe-animation"
    >
      <Row
        span={24}
        style={{
          backgroundColor: "var(--gray-dark-bg)",
          transition: "all 0.4s ease-in-out",
        }}
        className="filter-btns-container square-animation"
      >
        <Radio.Group
          name="radiogroup"
          defaultValue={"All"}
          value={radioValue}
          onChange={handleValue}
        >
          <Radio value={"All"}>
            <span className="filter-radio-btn-label">All</span>
          </Radio>
          <Radio value={"To do"} style={{ styleRadio }}>
            <span className="filter-radio-btn-label">To do</span>
          </Radio>
          <Radio value={"In Progress"} style={{ styleRadio }}>
            <span className="filter-radio-btn-label">In Progress</span>
          </Radio>
          <Radio value={"Completed"} style={{ styleRadio }}>
            <span className="filter-radio-btn-label">Completed</span>
          </Radio>
        </Radio.Group>
      </Row>
    </Col>
  );
};

export default RadioBar;
