import React, { useContext, useEffect } from "react";

import { Context } from "../../context";
import ConvertView from "../../components/Convert";

const Convert = () => {
  const {
    state: { isLoggedIn },
  } = useContext(Context);

  //비로그인 시 안나오도록 변경
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 필요");
      window.history.back();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <ConvertView />
    </div>
  );
};

export default Convert;
