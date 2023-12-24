import React from "react";
import { Col, Form, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";

function Login() {
  //Login function checks if the user has filled right credentials or not...
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      const response = await LoginUser(values)
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
       window.location.href = "/home";
      } else {
        message.error(response.message);
      }
      
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div className="bg-primary flex itmes-center justify-center h-screen">
      <div className="card w-400 m-5 p-2">
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl">Payment System - Log In</h1>
        </div>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Row>
            <Col span={24}>
              <Form.Item label="Account Holder's Email" name="email">
                <input type="email" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Password" name="password">
                <input type="password" />
              </Form.Item>
            </Col>
          </Row>
          <button className="primary-contained-btn w-100" type="submit">
            Log In
          </button>
          <h1
            className="text-sm underline mt-2"
            onClick={() => navigate("/register")}
          >
            Not a member, Click here to Register
          </h1>
        </Form>
      </div>
    </div>
  );
}

export default Login;
