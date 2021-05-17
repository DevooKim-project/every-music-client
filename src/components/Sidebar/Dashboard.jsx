import React, { useContext, useState } from "react";
import Cookie from "js-cookie";
import { Context } from "../../context";
import { Link } from "react-router-dom";
import Modal from "../Common/Modal";
import { signOut } from "../../modules/actions";

const Dashboard = () => {
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const {
    state: { payload },
  } = useContext(Context);

  const logoutHandler = () => {
    Cookie.remove("refreshToken");
    window.location = "/";
  };

  const signOutModalHandler = () => {
    setOpenSignOutModal((prev) => {
      return !prev;
    });
  };

  const signOutHandler = () => {
    signOut().then(() => {
      signOutModalHandler();
      window.location = "/";
    });
  };

  return (
    <div>
      <p>유저: {payload.name}</p>
      <button onClick={logoutHandler}>로그아웃</button>
      <button onClick={signOutModalHandler}>회원탈퇴</button>
      <Link to="/library">My Library</Link>
      <Modal
        open={openSignOutModal}
        successHandler={signOutHandler}
        successText={"회원탈퇴"}
        close={signOutModalHandler}
        header={"회원탈퇴"}
      >
        모든 정보(회원정보, 업로드한 플레이리스트)를 복구할 수 없습니다.
      </Modal>
    </div>
  );
};

export default Dashboard;
