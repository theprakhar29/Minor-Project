import React, { useEffect } from "react";
import { getUserDetails } from "../apicalls/users";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/userSlice";
import DefaultLayout from "./DefaultLayout";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";

function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading())
      const response = await getUserDetails();
      dispatch(HideLoading())
      if (response.success) {
        message.success(response.message);
        dispatch(SetUser(response.data));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading())
      navigate('/login')
      // message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (!user) {
        getData();
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div>
        <DefaultLayout> {props.children}</DefaultLayout>
      </div>
    )
  );
}

export default ProtectedRoute;
