import React, { useContext } from "react";
import Cookie from "js-cookie";
import { Context } from "../../context";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    state: { payload },
  } = useContext(Context);

  const removeCookie = () => {
    Cookie.remove("refreshToken");
    window.location = "/";
  };
  return (
    <div>
      <p>유저: {payload.name}</p>
      <button onClick={removeCookie}>로그아웃</button>
      <Link to="/library">My Library</Link>
    </div>
  );
};

export default Dashboard;
