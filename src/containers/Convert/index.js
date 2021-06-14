import React, { useContext, useEffect } from "react";

import { Context } from "../../context";
import ConvertView from "../../components/Convert";

const Convert = () => {
  const {
    state: { isLoggedIn },
  } = useContext(Context);

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
