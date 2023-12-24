import React from "react";
import { Col, Form, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      const response = await RegisterUser(values);
      console.log(response);
      dispatch(HideLoading())
      if(response.success){
        message.success(response.message);
        navigate("/login");
      } else{
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message);
    }

  };

  return (
    <div className="m-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Payment System</h1>

        <h1 className="text-sm underline" onClick={() => navigate("/login")}>
          Already a member, Log In!
        </h1>
      </div>
      <hr />
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="First Name" name="firstName">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Last Name" name="lastName">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Email" name="email">
              <input type="email" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Mobile" name="phoneNumber">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Identificaton Type" name="identificationType">
              <select>
                <option>Select</option>
                <option value="ADHAAR CARD">Aadhar Card</option>
                <option value="PAN CARD">Pan Card</option>
                <option value="VOTER ID">Voter ID</option>
                <option value="DRIVING LICENSE">Driving License</option>
                <option value="PASSPORT">Passport</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Identification Number" name="identificationNumber">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Address" name="address">
              <textarea type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Password" name="password">
              <input type="password" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Confirm Password" name="confirmPassword">
              <input type="password" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end">
          <button className="primary-contained-btn" type="submit">
            Register
          </button>
        </div>
      </Form>
    </div>
  );
}
export default Register;