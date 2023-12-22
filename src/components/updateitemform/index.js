import React, { useEffect, useState } from "react";
import "./style.css";
import { Modal, Row, Col, Radio } from "antd";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updatedUserData } from "../../feastures/userDetailSlice";
const UpdateItemForm = (props) => {
  const { isModalOpen, handleCloseModal, id } = props;
  const { users, loading } = useSelector((state) => state.app);
  console.log(id);
  const [updateData, setUpdatedData] = useState();

  useEffect(() => {
    if (id) {
      const selectedUser = users.find((user) => user.id === id);
      setUpdatedData(selectedUser);
    }
  }, []);
  const updatedData = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUpdatedData({ ...updateData, [fieldName]: fieldValue });
  };
  const dispatch = useDispatch();
  const handleUpdateSumbit = (e) => {
    e.preventDefault();
    dispatch(updatedUserData(updateData));
  };
  console.log("user", updateData);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Modal
        title="Add Task"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <form className="item-form-container" onSubmit={handleUpdateSumbit}>
          <Row>
            <Col span={24}>
              <div className="form-field-container">
                <p>Task Name</p>
                <input
                  type="text"
                  name="task_value"
                  className="form-input"
                  id=""
                  value={updateData && updateData.task_value}
                  onChange={updatedData}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="form-field-container">
                <p>Assign to</p>
                <Select
                  defaultValue={updateData && [updateData.assing_value]}
                  name="assing_value"
                  style={{
                    width: 120,
                  }}
                  className="assing-select"
                  value={updateData && [updateData.assing_value]}
                  onChange={(value) =>
                    updatedData({
                      target: { name: "assing_value", value: value },
                    })
                  }
                  options={[
                    {
                      value: "Asad",
                      label: "Asad",
                    },
                    {
                      value: "Hamza",
                      label: "Hamza",
                    },
                    {
                      value: "Noman",
                      label: "Noman",
                    },
                  ]}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="form-field-container">
                <p>Status</p>
                <Select
                  defaultValue="Status"
                  name="status_value"
                  style={{
                    width: 120,
                  }}
                  className="status-select"
                  value={updateData && [updateData.status_value]}
                  onChange={(value) =>
                    updatedData({
                      target: { name: "status_value", value: value },
                    })
                  }
                  options={[
                    {
                      value: "To do",
                      label: "To do",
                    },
                    {
                      value: "In progress",
                      label: "In progress",
                    },
                    {
                      value: "Completed",
                      label: "Completed",
                    },
                  ]}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="form-field-container">
                <p>Priority</p>
                <div className="form-priority-radio-btns">
                  <Radio.Group
                    defaultValue="Low"
                    name="priority_value"
                    value={updateData && updateData.priority_value}
                    onChange={updatedData}
                    // onChange={(e) =>
                    //   handleInputChange({
                    //     target: {
                    //       name: "priority_value",
                    //       value: e.target.value,
                    //     },
                    //   })
                    // }
                  >
                    <Radio value="Low">Low</Radio>
                    <Radio value="Medium">Medium</Radio>
                    <Radio value="High">High</Radio>
                  </Radio.Group>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="form-field-container">
                <p>Description</p>
                <input
                  type="text"
                  name="description_value"
                  className="form-input"
                  id=""
                  value={updateData && updateData.description_value}
                  onChange={updatedData}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="form-field-container">
                <button className="button-6" type="submit">
                  Submit
                </button>
              </div>
            </Col>
          </Row>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateItemForm;
