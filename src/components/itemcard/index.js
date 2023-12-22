import React, { useState } from "react";
import "./style.css";
import { Card } from "antd";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../feastures/userDetailSlice";
import UpdateItemForm from "../updateitemform";
const ItemCard = (props) => {
  const dispatch = useDispatch();
  const { cardData } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [copyData, setCopyData] = useState("");
  const [copyTextMsg, setCopyTextMsg] = useState(false);
  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    setCopyData(value);
  };
  const {
    id,
    task_value,
    description_value,
    status_value,
    priority_value,
    assing_value,
  } = cardData;
  const handleBgColorPriority = (value) => {
    let result = [];
    switch (value.toLowerCase()) {
      case "low":
        result = ["var(--blue-text)", "var(--blue-light-bg)"];
        return result;
      case "medium":
        result = ["var(--orange-text)", "var(--orange-light-bg)"];
        return result;
      case "high":
        result = ["var(--red-text)", "var(--red-light-bg)"];
        return result;
      default:
        return result;
    }
  };
  const handleBgColorAssing = (value) => {
    switch (value.toLowerCase()) {
      case "asad":
        return "#232D3F";
      case "hamza":
        return "#008170";
      case "noman":
        return "#232D3F";
      default:
        return "#0F0F0F";
    }
  };
  const handleTextColor = (value) => {
    switch (value.toLowerCase()) {
      case "to do":
        return "#1BA354";
      case "in progress":
        return "#FF9209";
      case "completed":
        return "#B61608";
      default:
        return "#1BA354";
    }
  };
  const handleCopyMsg = () => {
    setCopyTextMsg(true);
    setTimeout(() => {
      setCopyTextMsg(false);
    }, 1000);
  };

  return (
    <>
      <Card
        bordered={false}
        style={{
          maxWidth: 300,
          width:"100%",
          height: 250,
          margin: "1rem 0",
          backgroundColor: "var(--gray-dark-bg)",
        }}
        className="task-assing-card"
      >
        <div className="card-wrapper">
          <div className="card-header">
            <p>
              <button
                className="copy-btn"
                onClick={() => {
                  handleCopy(task_value);
                  handleCopyMsg();
                }}
                title={copyTextMsg ? "text copy" : "copy text"}
              >
                <i className="fa-solid fa-copy"></i>
              </button>
              <span>{task_value}</span>
            </p>
          </div>
          <div className="card-body">
            <h3>Description</h3>
            <p className="des-para">{description_value}</p>
            <div className="task-status-person">
              <p
                className="status-label"
                style={{ color: `${handleTextColor(status_value)}` }}
              >
                {status_value}
              </p>
              <p
                className="person-label"
                style={{
                  backgroundColor: `${handleBgColorAssing(assing_value)}`,
                }}
              >
                <span>{assing_value.toString().slice(0, 3)}</span>
              </p>
            </div>
          </div>
          <div className="card-footer">
            <p
              className="priority-label"
              style={{
                backgroundColor: `${handleBgColorPriority(priority_value)[1]}`,
                color: `${handleBgColorPriority(status_value)[0]}`,
              }}
            >
              {priority_value}
            </p>
            <div className="edit-delt-btns">
              <button
                className="edit-btn"
                onClick={() => {
                  showModal();
                }}
              >
                <i className="fa-solid fa-square-pen"></i>
              </button>
              <button
                className="delt-btn"
                onClick={() => {
                  dispatch(deleteUser(id));
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </Card>
      <UpdateItemForm
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        id={id}
      />
    </>
  );
};

export default ItemCard;
