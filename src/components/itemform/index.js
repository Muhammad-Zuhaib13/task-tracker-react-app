import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Radio } from "antd";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import "./style.css";
import { createUser } from "../../feastures/userDetailSlice";
import emailjs from "@emailjs/browser";
const ItemForm = (props) => {
  const { isModalOpen, handleCloseModal } = props;
  const [users, setUsers] = useState({
    task_value: "",
    assing_value: "",
    status_value: "",
    priority_value: "Low",
    description_value: "",
  });

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(users));
    handleEmail(users);
    handleCloseModal();
    resetForm();
  };
  const handleEmail = async (users) => {
    const serviceId = "service_jv9yvcl";
    const templateId = "template_zhfbzd8";
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        task_value: users.task_value,
        assing_value: users.assing_value,
        status_value: users.status_value,
        priority_value: users.priority_value,
        git: users.description_value,
      });
      // alert("email successfully sent check inbox");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };
  const resetForm = () => {
    setUsers({
      task_value: "",
      assing_value: "",
      status_value: "",
      priority_value: "Low",
      description_value: "",
    });
  };
  useEffect(() => {
    emailjs.init("LgSQ_vQme5J07_ksz");
  }, []);

  return (
    <div>
      <Modal
        title="Add Task"
        visible={isModalOpen}
        onCancel={() => {
          handleCloseModal();
        }}
        footer={null}
        className="modal-form"
      >
        <form onSubmit={handleSubmit} className="item-form-container">
          <Row>
            <Col span={24}>
              <div className="form-field-container">
                <p>Task Name</p>
                <input
                  type="text"
                  name="task_value"
                  className="form-input"
                  id=""
                  value={users.task_value}
                  onChange={handleInputChange}
                  placeholder="task name ..."
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="form-field-container">
                <p>Assign to</p>
                <Select
                  defaultValue="Assign to"
                  name="assing_value"
                  style={{
                    width: 120,
                  }}
                  className="assing-select"
                  value={users.assing_value}
                  onChange={(value) =>
                    handleInputChange({
                      target: { name: "assing_value", value },
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
                  value={users.status_value}
                  onChange={(value) =>
                    handleInputChange({
                      target: { name: "status_value", value },
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
                    value={users.priority_value}
                    onChange={(e) =>
                      handleInputChange({
                        target: {
                          name: "priority_value",
                          value: e.target.value,
                        },
                      })
                    }
                  >
                    <Radio value="Low" style={{ color: "var(--orange)" }}>
                      Low
                    </Radio>
                    <Radio value="Medium" style={{ color: "var(--blue)" }}>
                      Medium
                    </Radio>
                    <Radio value="High" style={{ color: "var(--red)" }}>
                      High
                    </Radio>
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
                  value={users.description_value}
                  onChange={handleInputChange}
                  placeholder="set descripton ..."
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

export default ItemForm;
