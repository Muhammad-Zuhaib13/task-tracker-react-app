import React, { useState, useEffect } from "react";
import "./style.css";
import { Col, Row } from "antd";
import RadioBar from "../radiobar";
import ItemForm from "../itemform";
import { useDispatch } from "react-redux";
import { searchTaskDetails } from "../../feastures/userDetailSlice";

const SearchBar = () => {
  const [hideShow, setHideShow] = useState(false);
  // taking inpput values from input tag
  const [searhData, setSearchData] = useState("");
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(searchTaskDetails(searhData));
  // }, [searhData]);
  const handleToggle = () => {
    setHideShow(!hideShow);
  };
  const handleSearchData = (e) => {
    const { value } = e.target;
    setSearchData(value);
    dispatch(searchTaskDetails(value));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Row className="search-bar-container">
        <Col xl={12} lg={12} md={12} sm={12} xs={24} className="search-col">
          <div className="input-search-container">
            <input
              type="text"
              name=""
              placeholder="search"
              className="input-search-field"
              id=""
              value={searhData}
              onChange={handleSearchData}
            />
          </div>
        </Col>
        <Col xl={12} lg={12} md={12} sm={12} xs={24} className="filter-col">
          <div className="search-bar-btns-container">
            <button className="filter-btn" onClick={handleToggle}>
              <i className="fa-solid fa-filter"></i>
            </button>
            <button
              className="form-btn"
              onClick={() => {
                showModal();
              }}
            >
              <i className="fa-solid fa-file-circle-plus"></i>
            </button>
          </div>
        </Col>
      </Row>
      <Row style={{ backgroundColor: "var(--dark)" }}>
        <Col>
          <ItemForm
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
            handleOk={handleOk}
          />
        </Col>
      </Row>
      {hideShow && (
        <Row
          style={{
            backgroundColor: "var(--dark)",
            transition: "all 0.4s ease-in-out",
            border: "transparent",
          }}
          className="test"
        >
          <Col
            style={{
              backgroundColor: "var(--dark)",
              transition: "all 0.4s ease-in-out",
            }}
            span={24}
          >
            <RadioBar />
          </Col>
        </Row>
      )}
    </>
  );
};

export default SearchBar;
