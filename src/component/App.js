import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Cookie from "js-cookie";

import { loginByToken } from "../modules/actions";
import { Context } from "../context";

import "../App.css";
import config from "../config";
import Header from "./Header";
import Page from "./Page";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function App() {
  const [refreshToken, setRefreshToken] = useState(Cookie.get("refreshToken"));
  const {
    state: { isLoggedIn },
    dispatch,
  } = useContext(Context);

  config();

  useEffect(() => {
    if (refreshToken) {
      loginByToken(dispatch);
    }
  }, []);

  if (refreshToken && !isLoggedIn) {
    console.log("로그인 중");
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Router>
        <Header />
        <Page />
        <Sidebar />
        <Footer />
      </Router>
    </div>
  );
}

export default React.memo(App);

{
  /* <Router>
<AuthDispatch>
   <Headers>
     <Menu/>
   </Headers>

   <Content />

   <Sidebar>
     <Login> <Auth/> </Login> : <DashBoard/>
   </Sidebar>

   <Footer/>
 </AuthDispatch>
</Router> */
}
