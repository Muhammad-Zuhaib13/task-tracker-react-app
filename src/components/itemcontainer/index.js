import { Row, Col } from "antd";
import React, { useEffect } from "react";
import ItemCard from "../itemcard";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { showUser } from "../../feastures/userDetailSlice";
import ImgSrc from "../../utils/assets/images/no-data-found-img.png";
const ItemContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showUser());
  }, []);

  const { users, loading, searchData, radioValue } = useSelector(
    (state) => state.app
  );
  const filteredCards = () => {
    return users.filter((ele) => {
      const searchTextMatch =
        ele.task_value.toLowerCase().includes(searchData.toLowerCase()) ||
        ele.description_value
          .toLowerCase()
          .includes(searchData.toLowerCase()) ||
        ele.status_value.toLowerCase().includes(searchData.toLowerCase()) ||
        ele.priority_value.toLowerCase().includes(searchData.toLowerCase()) ||
        ele.assing_value.toLowerCase().includes(searchData.toLowerCase());

      const radioMatch =
        radioValue === "All" ||
        ele.status_value.toLowerCase() === radioValue.toLowerCase();

      return searchTextMatch && radioMatch;
    });
  };

  if (loading) {
    return (
      <div className="data-loading-container">
        <h2>Please Wait Data is Loading ...</h2>
      </div>
    );
  }

  return (
    <Row>
      <Col span={24} className="item-container">
        <div className="card-container">
          {filteredCards().length === 0 ? (
            <div className="no-data-found-container">
              <h2>No search results found</h2>
              <div className="no-data-found-img">
                <img src={ImgSrc} alt="" />
              </div>
            </div>
          ) : (
            filteredCards().map((cardData) => (
              <ItemCard key={cardData.id} cardData={cardData} />
            ))
          )}
        </div>
      </Col>
    </Row>
  );
};

export default ItemContainer;
