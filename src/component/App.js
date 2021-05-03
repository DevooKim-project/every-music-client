import React, { useContext, useState, useEffect } from "react";
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
  const { dispatch } = useContext(Context);

  config();

  useEffect(() => {
    if (refreshToken) {
      loginByToken(dispatch);
    }
  }, []);

  return (
    <div>
      <Header />
      <Page />
      <Sidebar />
      <Footer />
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
